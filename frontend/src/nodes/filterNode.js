// filterNode.js

import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const FilterNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={nodeConfigs.filter} />;
};
