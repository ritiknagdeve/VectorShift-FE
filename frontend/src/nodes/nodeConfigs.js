// nodeConfigs.js
// Configuration objects for all node types

export const nodeConfigs = {
  // Existing nodes
  input: {
    title: 'Input',
    width: 200,
    height: 80,
    fields: [
      {
        type: 'text',
        name: 'inputName',
        label: 'Name',
        defaultValue: 'input',
        placeholder: 'Enter input name'
      },
      {
        type: 'select',
        name: 'inputType',
        label: 'Type',
        defaultValue: 'Text',
        options: [
          { label: 'Text', value: 'Text' },
          { label: 'File', value: 'File' }
        ]
      }
    ],
    handles: []
  },

  output: {
    title: 'Output',
    width: 200,
    height: 80,
    fields: [
      {
        type: 'text',
        name: 'outputName',
        label: 'Name',
        defaultValue: 'output',
        placeholder: 'Enter output name'
      },
      {
        type: 'select',
        name: 'outputType',
        label: 'Type',
        defaultValue: 'Text',
        options: [
          { label: 'Text', value: 'Text' },
          { label: 'Image', value: 'Image' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: 'Left',
        id: 'value'
      }
    ]
  },

  llm: {
    title: 'LLM',
    description: 'Large Language Model',
    width: 220,
    height: 140,
    fields: [
      {
        type: 'select',
        name: 'model',
        label: 'Model',
        defaultValue: 'gpt-4',
        options: [
          { label: 'GPT-4', value: 'gpt-4' },
          { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
          { label: 'Claude 3', value: 'claude-3' },
          { label: 'Gemini Pro', value: 'gemini-pro' },
          { label: 'Llama 2', value: 'llama-2' }
        ]
      },
      {
        type: 'textarea',
        name: 'systemPrompt',
        label: 'System Prompt',
        defaultValue: 'You are a helpful assistant.',
        placeholder: 'Enter system prompt...',
        rows: 2
      },
      {
        type: 'number',
        name: 'temperature',
        label: 'Temperature',
        defaultValue: '0.7',
        placeholder: '0.0 - 1.0'
      }
    ],
    handles: [
      {
        type: 'target',
        position: 'Left',
        id: 'prompt',
        style: { top: '50%' }
      },
      {
        type: 'source',
        position: 'Right',
        id: 'response'
      }
    ]
  },

  text: {
    title: 'Text',
    width: 250,
    height: 120,
    fields: [
      {
        type: 'textarea',
        name: 'text',
        label: 'Text',
        defaultValue: '',
        placeholder: 'Enter text...',
        rows: 3
      }
    ],
    handles: []
  },

  // New Node 1: API Node
  api: {
    title: 'API',
    description: 'Make HTTP requests',
    width: 220,
    height: 120,
    fields: [
      {
        type: 'text',
        name: 'url',
        label: 'URL',
        defaultValue: 'https://api.example.com',
        placeholder: 'Enter API URL'
      },
      {
        type: 'select',
        name: 'method',
        label: 'Method',
        defaultValue: 'GET',
        options: [
          { label: 'GET', value: 'GET' },
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
          { label: 'DELETE', value: 'DELETE' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: 'Left',
        id: 'body',
        style: { top: '33%' }
      },
      {
        type: 'target',
        position: 'Left',
        id: 'headers',
        style: { top: '66%' }
      },
      {
        type: 'source',
        position: 'Right',
        id: 'response'
      }
    ]
  },

  // New Node 2: Filter Node
  filter: {
    title: 'Filter',
    description: 'Filter data conditionally',
    width: 200,
    height: 100,
    fields: [
      {
        type: 'text',
        name: 'condition',
        label: 'Condition',
        defaultValue: 'value',
        placeholder: 'Enter condition'
      },
      {
        type: 'select',
        name: 'operator',
        label: 'Operator',
        defaultValue: '==',
        options: [
          { label: 'Equals (==)', value: '==' },
          { label: 'Not Equals (!=)', value: '!=' },
          { label: 'Greater Than (>)', value: '>' },
          { label: 'Less Than (<)', value: '<' },
          { label: 'Contains', value: 'contains' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: 'Left',
        id: 'input'
      },
      {
        type: 'source',
        position: 'Right',
        id: 'true',
        style: { top: '33%' }
      },
      {
        type: 'source',
        position: 'Right',
        id: 'false',
        style: { top: '66%' }
      }
    ]
  },

  // New Node 3: Database Node
  database: {
    title: 'Database',
    description: 'Execute database queries',
    width: 220,
    height: 120,
    fields: [
      {
        type: 'select',
        name: 'dbType',
        label: 'Database',
        defaultValue: 'PostgreSQL',
        options: [
          { label: 'PostgreSQL', value: 'PostgreSQL' },
          { label: 'MySQL', value: 'MySQL' },
          { label: 'MongoDB', value: 'MongoDB' },
          { label: 'Redis', value: 'Redis' }
        ]
      },
      {
        type: 'textarea',
        name: 'query',
        label: 'Query',
        defaultValue: 'SELECT * FROM table',
        placeholder: 'Enter SQL query',
        rows: 2
      }
    ],
    handles: [
      {
        type: 'target',
        position: 'Left',
        id: 'params'
      },
      {
        type: 'source',
        position: 'Right',
        id: 'result'
      }
    ]
  },

  // New Node 4: Transform Node
  transform: {
    title: 'Transform',
    description: 'Transform data',
    width: 200,
    height: 90,
    fields: [
      {
        type: 'select',
        name: 'operation',
        label: 'Operation',
        defaultValue: 'uppercase',
        options: [
          { label: 'Uppercase', value: 'uppercase' },
          { label: 'Lowercase', value: 'lowercase' },
          { label: 'Trim', value: 'trim' },
          { label: 'Split', value: 'split' },
          { label: 'Join', value: 'join' },
          { label: 'Replace', value: 'replace' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: 'Left',
        id: 'input'
      },
      {
        type: 'source',
        position: 'Right',
        id: 'output'
      }
    ]
  },

  // New Node 5: Aggregate Node
  aggregate: {
    title: 'Aggregate',
    description: 'Aggregate data operations',
    width: 200,
    height: 100,
    fields: [
      {
        type: 'select',
        name: 'function',
        label: 'Function',
        defaultValue: 'sum',
        options: [
          { label: 'Sum', value: 'sum' },
          { label: 'Average', value: 'avg' },
          { label: 'Count', value: 'count' },
          { label: 'Max', value: 'max' },
          { label: 'Min', value: 'min' },
          { label: 'Median', value: 'median' }
        ]
      },
      {
        type: 'text',
        name: 'field',
        label: 'Field',
        defaultValue: 'value',
        placeholder: 'Field to aggregate'
      }
    ],
    handles: [
      {
        type: 'target',
        position: 'Left',
        id: 'data'
      },
      {
        type: 'source',
        position: 'Right',
        id: 'result'
      }
    ]
  }
};
