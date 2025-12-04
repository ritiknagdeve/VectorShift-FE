// inputNode.js

import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const InputNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={nodeConfigs.input} />;
};
