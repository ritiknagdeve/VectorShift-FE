// CustomSelect.js
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDownSLine } from 'react-icons/ri';
import styles from './CustomSelect.module.css';

export const CustomSelect = ({ value, onChange, options, placeholder = 'Select...', isOpen: isOpenProp }) => {
  const [isOpen, setIsOpen] = useState(!!isOpenProp);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof isOpenProp === 'boolean') {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectContainer} ref={dropdownRef}>
      <div 
        className={styles.selectTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.selectedValue}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0,
            marginLeft: '8px'
          }}
        >
          <RiArrowDownSLine className={styles.arrowIcon} style={{ margin: 0 }} />
        </motion.span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdownMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
