// transformNode.js

import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const TransformNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={nodeConfigs.transform} />;
};
