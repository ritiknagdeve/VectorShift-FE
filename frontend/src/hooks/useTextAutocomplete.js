// useTextAutocomplete.js
// Hook for handling autocomplete in Text node with {{ trigger

import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';

export const useTextAutocomplete = (nodeId) => {
  const [text, setText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [pendingConnection, setPendingConnection] = useState(null);
  const textareaRef = useRef(null);
  
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onConnect = useStore((state) => state.onConnect);

  // Get all Input nodes that haven't been used yet
  const getInputNodes = () => {
    const currentVariables = extractVariables(text);
    return nodes.filter(node => {
      if (node.type !== 'customInput') return false;
      const inputName = node.data.inputName || 'input';
      // Exclude already used variables
      return !currentVariables.includes(inputName);
    });
  };

  // Extract variables from text ({{variable_name}})
  const extractVariables = (content) => {
    const regex = /\{\{([a-zA-Z0-9_]+)\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };

  // Effect to create pending connection after render
  useEffect(() => {
    if (pendingConnection) {
      const timer = setTimeout(() => {
        onConnect(pendingConnection);
        setPendingConnection(null);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pendingConnection, onConnect]);

  // Debounced sync edges for all variables after every text change
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentVariables = extractVariables(text);
      currentVariables.forEach(variableName => {
        // Find input node with this name
        const inputNode = nodes.find(
          node => node.type === 'customInput' && (node.data.inputName === variableName)
        );
        if (inputNode) {
          // Check if edge already exists for this handle
          const alreadyConnected = edges.some(
            edge => edge.source === inputNode.id && edge.target === nodeId && edge.targetHandle === variableName
          );
          if (!alreadyConnected) {
            // Create connection to the correct handle
            onConnect({
              source: inputNode.id,
              sourceHandle: inputNode.data.inputName, // match handle id
              target: nodeId,
              targetHandle: variableName
            });
          }
        }
      });
    }, 250); // 250ms debounce to ensure handles are rendered
    return () => clearTimeout(timer);
  }, [text, nodes, edges, nodeId, onConnect]);

  // Check if user just typed {{
  const checkForTrigger = (value, position) => {
    const beforeCursor = value.substring(0, position);
    // Check if last two characters are {{
    if (beforeCursor.endsWith('{{')) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle text change
  const handleTextChange = (e) => {
    const newValue = e.target.value;
    const newPosition = e.target.selectionStart;
    
    setText(newValue);
    setCursorPosition(newPosition);
    checkForTrigger(newValue, newPosition);
  };

  // Handle suggestion selection
  const selectSuggestion = (inputNode) => {
    const inputName = inputNode.data.inputName || 'input';
    
    // Find the position of {{ before cursor
    const beforeCursor = text.substring(0, cursorPosition);
    const lastBracePos = beforeCursor.lastIndexOf('{{');
    
    if (lastBracePos !== -1) {
      // Replace {{ with {{inputName}}
      const newText = 
        text.substring(0, lastBracePos) + 
        `{{${inputName}}}` + 
        text.substring(cursorPosition);
      
      setText(newText);
      setShowSuggestions(false);
      
      // Queue the connection to be created after render
      setPendingConnection({
        source: inputNode.id,
        sourceHandle: 'output',
        target: nodeId,
        targetHandle: inputName
      });
      
      // Set cursor position after the inserted variable
      setTimeout(() => {
        if (textareaRef.current) {
          const newPos = lastBracePos + inputName.length + 4; // 4 for {{}}
          textareaRef.current.setSelectionRange(newPos, newPos);
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  return {
    text,
    setText,
    textareaRef,
    showSuggestions,
    suggestions: showSuggestions ? getInputNodes() : [],
    handleTextChange,
    selectSuggestion,
    variables: extractVariables(text)
  };
};
