// store.js

import { createWithEqualityFn } from "zustand/traditional";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = createWithEqualityFn((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    inputCounter: 0,
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        let updatedNode = node;
        
        // Auto-increment input name for Input nodes
        if (node.type === 'customInput') {
            const counter = get().inputCounter;
            const inputName = `input_${counter}`;
            updatedNode = {
                ...node,
                data: {
                    ...node.data,
                    inputName
                },
                // Set handle id to inputName
                handles: [
                  {
                    type: 'source',
                    position: 'Right',
                    id: inputName
                  }
                ]
            };
            set({ inputCounter: counter + 1 });
        }
        
        set({
            nodes: [...get().nodes, updatedNode]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' }
        }, get().edges),
      });
    },
  }));
