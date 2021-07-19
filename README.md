<div align="center">
  <a href="https://npmjs.org/package/react-json-view-lite">
    <img alt="npm" src="https://img.shields.io/npm/v/react-json-view-lite.svg" />
  </a>
  <a href="https://npmjs.org/package/react-json-view-lite">
    <img alt="no dependencies" src="https://badgen.net/bundlephobia/dependency-count/react-json-view-lite" />
  </a>
  <a href="https://npmjs.org/package/react-json-view-lite">
    <img alt="size" src="https://badgen.net/bundlephobia/minzip/react-json-view-lite" />
  </a>
  <a href="https://travis-ci.com/github/AnyRoad/react-json-view-lite">
    <img alt="build" src="https://travis-ci.com/AnyRoad/react-json-view-lite.svg?branch=release" />
  </a>
  <a href="https://codecov.io/gh/anyroad/react-json-view-lite">
    <img alt="coverage" src="https://codecov.io/gh/AnyRoad/react-json-view-lite/branch/release/graph/badge.svg" />
  </a>
  <a href="https://bundlephobia.com/result?p=react-json-view-lite">
    <img alt="tree-shakeable" src="https://badgen.net/bundlephobia/tree-shaking/react-json-view-lite" />
  </a>
  <a href="https://npmjs.org/package/react-json-view-lite">
    <img alt="types included" src="https://badgen.net/npm/types/react-json-view-lite" />
  </a>
</div>

<div>
  <strong>react-json-view-lite</strong> is a tiny component for React allowing to render JSON as a tree. It focused more on the performance for large JSON inputs rather than customization and rich features. It is written in TypeScript and has no dependencies.
</div>

## Install

```bash
npm install --save react-json-view-lite
```

## Usage

```tsx
import * as React from 'react';

import { JsonView, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const json = {
  a: 1,
  b: 'example',
};

const App = () => {
  return (
    <React.Fragment>
      <JsonView
        data={json}
        shouldInitiallyExpand={(level) => true}
        style={defaultStyles}
      />
      <JsonView data={json} shouldInitiallyExpand={(level) => true} style={darkStyles} />
    </React.Fragment>
  );
};

export default App;
```

### Props

| Name                  | Type                                                     | Default Value | Description                                                                                                                                   |
| --------------------- | -------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| data                  | `Object` \| `Array<any>`                                 |               | Data which should be rendered                                                                                                                 |
| style                 | StyleProps                                               | defaultStyles | CSS classes for rendering. Library provides two build-in implementations: darkStyles, defaultStyles                                           |
| shouldInitiallyExpand | `(level: number, value: any, field?: string) => boolean` | undefined     | Optional. Function which will be initially called for each Object and Array of the data in order to calculate should if this node be expanded |

### StyleProps

| Name            | Type   | Description                                                                                                       |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| container       | string | CSS class name for rendering parent block                                                                         |
| basicChildStyle | string | CSS class name for property block containing property name and value                                              |
| expander        | string | CSS class name for rendering button expanding/collapsing Object and Array nodes                                   |
| label           | string | CSS class name for rendering property names                                                                       |
| nullValue       | string | CSS class name for rendering null values                                                                          |
| undefinedValue  | string | CSS class name for rendering undefined values                                                                     |
| numberValue     | string | CSS class name for rendering numeric values                                                                       |
| stringValue     | string | CSS class name for rendering string values                                                                        |
| booleanValue    | string | CSS class name for rendering boolean values                                                                       |
| otherValue      | string | CSS class name for rendering all other values except Object, Arrray, null, undefined, numeric, boolean and string |
| punctuation     | string | CSS class name for rendering `,`, `[`, `]`, `{`, `}`                                                              |

## Comparison with other libraries

Here is the size benchmark (using [bundlephobia.com](https://bundlephobia.com)) against similar React libraries (found by https://www.npmjs.com/search?q=react%20json&ranking=popularity):

| Name                     | Bundle size                                                                                                                                  | Bundle size (gzip)                                                                                                                              | Dependencies                                                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **react-json-view-lite** | [![](https://badgen.net/bundlephobia/min/react-json-view-lite?color=6ead0a&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  | [![](https://badgen.net/bundlephobia/minzip/react-json-view-lite?color=6ead0a&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view-lite?color=6ead0a&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  |
| react-json-pretty        | [![](https://badgen.net/bundlephobia/min/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)           | [![](https://badgen.net/bundlephobia/minzip/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)           | [![](https://badgen.net/bundlephobia/dependency-count/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)           |
| react-json-inspector     | [![](https://badgen.net/bundlephobia/min/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector)     | [![](https://badgen.net/bundlephobia/minzip/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector)     | [![](https://badgen.net/bundlephobia/dependency-count/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector)     |
| react-json-tree          | [![](https://badgen.net/bundlephobia/min/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)               | [![](https://badgen.net/bundlephobia/minzip/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)               | [![](https://badgen.net/bundlephobia/dependency-count/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)               |
| react-json-view          | [![](https://badgen.net/bundlephobia/min/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view)               | [![](https://badgen.net/bundlephobia/minzip/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view)               | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view)               |
| react-json-tree-viewer   | [![](https://badgen.net/bundlephobia/min/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer) | [![](https://badgen.net/bundlephobia/minzip/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer) |

## License

MIT © [AnyRoad](https://github.com/AnyRoad)
