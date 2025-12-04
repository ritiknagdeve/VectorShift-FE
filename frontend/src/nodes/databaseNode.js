// databaseNode.js

import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const DatabaseNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={nodeConfigs.database} />;
};
