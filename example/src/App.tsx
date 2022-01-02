import * as React from 'react';
import json from './hugeJson.json';

import { JsonView, allExpanded, collapseAllNested } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const App = () => {
  const [first, setFirst] = React.useState(true);

  return (
    <React.Fragment>
      <button onClick={() => setFirst(!first)}>Expand!!!</button>
      <JsonView data={json} shouldInitiallyExpand={first ? collapseAllNested : allExpanded} />
    </React.Fragment>
  );
};

export default App;
