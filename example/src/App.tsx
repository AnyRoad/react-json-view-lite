import * as React from 'react';
import json from './hugeJson.json';

import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const App = () => {
  return (
    <React.Fragment>
      <JsonView
        data={json}
        shouldInitiallyExpand={(level) => level < 2}
        style={defaultStyles}
      />
    </React.Fragment>
  );
};

export default App;
