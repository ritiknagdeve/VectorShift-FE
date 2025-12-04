// draggableNode.js

import { motion } from 'framer-motion';
import { getNodeIcon } from './nodes/nodeIcons';
import styles from './draggableNode.module.css';

export const DraggableNode = ({ type, label }) => {
    const Icon = getNodeIcon(type);
    
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <motion.div
        className={styles.nodeCard}
        onDragStart={(event) => onDragStart(event, type)}
        draggable
        whileHover={{
          y: -6,
          boxShadow: "0 12px 24px rgba(124, 58, 237, 0.2)",
          borderColor: "#c4b5fd"
        }}
        whileTap={{ 
          scale: 0.98 
        }}
        transition={{ 
          duration: 0.2,
          ease: "easeOut"
        }}
      >
        <Icon className={styles.icon} />
        <span className={styles.label}>{label}</span>
      </motion.div>
    );
  };
  