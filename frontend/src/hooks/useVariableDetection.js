// useVariableDetection.js
// Custom hook for detecting {{variable}} patterns and generating dynamic handles

import { useState, useEffect, useRef } from 'react';
import { useReactFlow } from 'reactflow';

export const useVariableDetection = (id, initialText = '', enabled = true) => {
  const [text, setText] = useState(initialText);
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 250, height: 120 });
  const textareaRef = useRef(null);
  const { setNodes } = useReactFlow();

  // Extract variables from text using regex for valid JavaScript identifiers
  const extractVariables = (textContent) => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(textContent)) !== null) {
      const varName = match[1].trim();
      if (varName && !matches.includes(varName)) {
        matches.push(varName);
      }
    }
    
    return matches;
  };

  // Update variables when text changes (only if enabled)
  useEffect(() => {
    if (!enabled) return;
    const detectedVars = extractVariables(text);
    setVariables(detectedVars);
  }, [text, enabled]);

  // Update node dimensions based on textarea content (only if enabled)
  useEffect(() => {
    if (!enabled || !textareaRef.current) return;
    
    const textarea = textareaRef.current;
    
    // Calculate dimensions based on content
    const scrollHeight = textarea.scrollHeight;
    const longestLine = Math.max(...text.split('\n').map(line => line.length));
    
    // Calculate new dimensions with constraints
    const newWidth = Math.min(Math.max(250, longestLine * 8 + 40), 500);
    const newHeight = Math.min(Math.max(120, scrollHeight + 80), 400);
    
    if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
      setDimensions({ width: newWidth, height: newHeight });
      
      // Update node dimensions in ReactFlow
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              style: {
                ...node.style,
                width: newWidth,
                height: newHeight,
              },
            };
          }
          return node;
        })
      );
    }
  }, [text, id, setNodes, dimensions.width, dimensions.height, enabled]);

  return {
    text,
    setText,
    variables,
    dimensions,
    textareaRef,
  };
};
