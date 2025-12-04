// aggregateNode.js

import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const AggregateNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={nodeConfigs.aggregate} />;
};
