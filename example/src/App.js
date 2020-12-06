import * as React from 'react';
import json from './example.json';

import { JsonView, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const App = () => {
  return (
    <React.Fragment>
      <JsonView data={json} shouldInitiallyExpand={(level) => true} />
      <JsonView data={json} shouldInitiallyExpand={(level) => true} style={darkStyles} />
    </React.Fragment>
  );
};

export default App;
