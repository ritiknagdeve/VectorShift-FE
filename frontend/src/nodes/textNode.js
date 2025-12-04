// textNode.js

import React from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { motion } from 'framer-motion';
import { getNodeIcon } from './nodeIcons';
import { useTextAutocomplete } from '../hooks/useTextAutocomplete';
import { CustomSelect } from '../components/CustomSelect';
import styles from './BaseNode.module.css';

export const TextNode = ({ id, data }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const {
    text,
    textareaRef,
    showSuggestions,
    suggestions,
    handleTextChange,
    selectSuggestion,
    variables
  } = useTextAutocomplete(id);

  const Icon = getNodeIcon('text');
  const config = {
    title: 'Text',
    width: 250,
    height: 120
  };

  // Calculate equidistant positioning for handles
  const calculateHandlePosition = (index, total) => {
    if (total === 1) return '50%';
    const spacing = 100 / (total + 1);
    return `${spacing * (index + 1)}%`;
  };

  // Update node internals when variables change
  React.useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  return (
    <motion.div
      className={styles.nodeContainer}
      style={{ width: config.width }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Dynamic left handles for each detected variable, order matches textarea */}
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={variable}
          style={{ top: calculateHandlePosition(index, variables.length) }}
          className={styles.handle}
        />
      ))}

      {/* Right handle for output - only show if there are variables */}
      {variables.length > 0 && (
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          style={{ top: '50%' }}
          className={styles.handle}
        />
      )}

      <div className={styles.header}>
        <Icon className={styles.headerIcon} />
        <span className={styles.title}>{config.title}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.field}>
          <label className={styles.label}>TEXT</label>
          <div style={{ position: 'relative' }}>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              placeholder="Enter text..."
              rows={3}
              className={styles.textarea}
              style={{ minHeight: '60px' }}
            />
            {/* Autocomplete Dropdown using CustomSelect - always open when showSuggestions is true */}
            {showSuggestions && suggestions.length > 0 && (
              <CustomSelect
                value={null}
                onChange={val => {
                  const selected = suggestions.find(s => s.data.inputName === val);
                  if (selected) selectSuggestion(selected);
                }}
                options={suggestions.map(inputNode => ({
                  label: inputNode.data.inputName,
                  value: inputNode.data.inputName
                }))}
                placeholder="Please select input variable"
                isOpen={true}
              />
            )}

            {/* Variable indicators */}
            {variables.length > 0 && (
              <div style={{ 
                fontSize: '10px', 
                color: '#7c3aed', 
                marginTop: '4px',
                fontWeight: 500 
              }}>
                Variables: {variables.join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
