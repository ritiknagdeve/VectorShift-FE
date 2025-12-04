// nodeIcons.js
// Icon mapping for each node type

import { 
  RiInputMethodLine,
  RiFileTextLine,
  RiRobot2Line,
  RiFileEditLine,
  RiCodeSSlashLine,
  RiFilterLine,
  RiDatabaseLine,
  RiLoopRightLine,
  RiBarChartBoxLine
} from 'react-icons/ri';

export const nodeIcons = {
  customInput: RiInputMethodLine,
  llm: RiRobot2Line,
  customOutput: RiFileTextLine,
  text: RiFileEditLine,
  api: RiCodeSSlashLine,
  filter: RiFilterLine,
  database: RiDatabaseLine,
  transform: RiLoopRightLine,
  aggregate: RiBarChartBoxLine,
};

export const getNodeIcon = (type) => {
  return nodeIcons[type] || RiFileTextLine;
};
