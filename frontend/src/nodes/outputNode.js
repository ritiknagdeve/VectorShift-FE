// outputNode.js

import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const OutputNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={nodeConfigs.output} />;
};
