// BaseNode.js
// Generic configurable node component

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { getNodeIcon } from './nodeIcons';
import { CustomSelect } from '../components/CustomSelect';
import { useVariableDetection } from '../hooks/useVariableDetection';
import styles from './BaseNode.module.css';

export const BaseNode = ({ id, data, config }) => {
  // Check if any field has variable detection enabled
  const variableField = config.fields?.find(field => field.detectVariables);
  const hasVariableDetection = !!variableField;
  
  // Always call hook (React Hooks rules), but only initialize if needed
  const initialText = hasVariableDetection 
    ? (data?.[variableField.name] || variableField.defaultValue || '')
    : '';
  const variableDetection = useVariableDetection(id, initialText, hasVariableDetection);

  // Initialize state based on config fields
  const [nodeState, setNodeState] = useState(() => {
    const initialState = {};
    config.fields?.forEach(field => {
      // Skip variable detection field as it's handled by the hook
      if (field.detectVariables) return;
      const defaultValue = data?.[field.name] || field.defaultValue || '';
      initialState[field.name] = defaultValue;
    });
    return initialState;
  });

  // Handle field changes
  const handleFieldChange = (fieldName, value) => {
    setNodeState(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Render different field types
  const renderField = (field) => {
    // Handle variable detection field
    if (field.detectVariables && variableDetection) {
      return (
        <div style={{ position: 'relative' }}>
          <textarea
            ref={variableDetection.textareaRef}
            value={variableDetection.text}
            onChange={(e) => variableDetection.setText(e.target.value)}
            placeholder={field.placeholder || ''}
            rows={field.rows || 3}
            className={styles.textarea}
            style={{ minHeight: '60px' }}
          />
          
          {/* Input Suggestions Dropdown */}
          {variableDetection.showSuggestions && variableDetection.suggestions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                maxHeight: '150px',
                overflowY: 'auto',
                backgroundColor: 'white',
                border: '2px solid #7c3aed',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
                zIndex: 1000,
                marginTop: '4px'
              }}
            >
              {variableDetection.suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  onClick={() => variableDetection.selectSuggestion(suggestion)}
                  style={{
                    padding: '10px 12px',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    color: '#374151',
                    fontSize: '14px',
                    transition: 'all 0.15s ease',
                    borderBottom: '1px solid #f3f4f6'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#ede9fe';
                    e.target.style.color = '#7c3aed';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = '#374151';
                  }}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}

          {/* Variable indicators */}
          {variableDetection.variables.length > 0 && (
            <div style={{ 
              fontSize: '10px', 
              color: '#7c3aed', 
              marginTop: '4px',
              fontWeight: 500 
            }}>
              Variables: {variableDetection.variables.join(', ')}
            </div>
          )}
        </div>
      );
    }

    const value = nodeState[field.name] || '';

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder || ''}
            className={styles.input}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder || ''}
            rows={field.rows || 3}
            className={styles.textarea}
          />
        );

      case 'select':
        return (
          <CustomSelect
            value={value}
            onChange={(newValue) => handleFieldChange(field.name, newValue)}
            options={field.options || []}
            placeholder={field.placeholder || 'Select...'}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder || ''}
            className={styles.input}
          />
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
            className={styles.checkbox}
          />
        );

      default:
        return null;
    }
  };

  // Get Position enum value
  const getPosition = (pos) => {
    switch (pos) {
      case 'Left': return Position.Left;
      case 'Right': return Position.Right;
      case 'Top': return Position.Top;
      case 'Bottom': return Position.Bottom;
      default: return Position.Left;
    }
  };

  const Icon = getNodeIcon(data?.nodeType);
  const width = variableDetection ? variableDetection.dimensions.width : (config.width || 200);
  const height = variableDetection ? variableDetection.dimensions.height : (config.height || 'auto');

  return (
    <motion.div
      className={styles.nodeContainer}
      style={{ width, minHeight: height !== 'auto' ? height : undefined }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        boxShadow: "0 8px 24px rgba(124, 58, 237, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)",
        borderColor: "#c4b5fd"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {/* Dynamic Variable Handles (Left side) */}
      {variableDetection && variableDetection.variables.map((variable, index) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={variable}
          style={{
            top: `${((index + 1) * 100) / (variableDetection.variables.length + 1)}%`,
          }}
          title={variable}
          isConnectable={true}
        />
      ))}

      {/* Static Handles from config, except for Input node, render dynamic handle */}
      {config.title === 'Input' && data?.inputName ? (
        <Handle
          key={`source-${data.inputName}`}
          type="source"
          position={Position.Right}
          id={data.inputName}
          isConnectable={true}
        />
      ) : (
        config.handles?.map((handle, index) => (
          <Handle
            key={`${handle.type}-${handle.id}-${index}`}
            type={handle.type}
            position={getPosition(handle.position)}
            id={handle.id}
            style={handle.style || {}}
            isConnectable={true}
          />
        ))
      )}

      {/* Header with Icon and Title */}
      <div className={styles.header}>
        <Icon className={styles.icon} />
        <div style={{ flex: 1 }}>
          <div className={styles.title}>{config.title}</div>
          {config.description && (
            <div className={styles.description}>{config.description}</div>
          )}
        </div>
      </div>

      {/* Fields */}
      {config.fields && config.fields.length > 0 && (
        <div className={styles.fieldsContainer}>
          {config.fields.map((field, index) => (
            <div key={`${field.name}-${index}`} className={styles.fieldWrapper}>
              {field.label && (
                <label className={styles.fieldLabel}>
                  {field.label}
                </label>
              )}
              {renderField(field)}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
