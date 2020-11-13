import * as React from 'react';
import json from './example.json';

import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const App = () => {
  return <JsonView data={json} shouldInitiallyExpand={(level) => level < 2} />;
};

export default App;
