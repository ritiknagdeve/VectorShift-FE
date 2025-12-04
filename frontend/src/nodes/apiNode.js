// apiNode.js

import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const ApiNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={nodeConfigs.api} />;
};
