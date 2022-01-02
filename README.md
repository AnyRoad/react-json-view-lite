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

  <a href="https://npmjs.org/package/react-json-view-lite">
    <img alt="downloads per month" src="https://img.shields.io/npm/dm/react-json-view-lite" />
  </a>
  
</div>

<div>
  <strong>react-json-view-lite</strong> is a tiny component for React allowing to render JSON as a tree. It focused on the balance between performance for large JSON inputs and functionality. It might not have all the rich features (suce as customization, copy, json editinng) but still provides more than just rendering json with highlighting - e.g. ability to collapse/expand nested objects and override css. It is written in TypeScript and has no dependencies.
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
  b: 'example'
};

const App = () => {
  return (
    <React.Fragment>
      <JsonView data={json} shouldInitiallyExpand={(level) => true} style={defaultStyles} />
      <JsonView data={json} shouldInitiallyExpand={(level) => true} style={darkStyles} />
    </React.Fragment>
  );
};

export default App;
```

### Demo

https://codesandbox.io/s/react-json-view-lite-example-wvdjl

(thanks to @idindrakusuma)

### Props

| Name                  | Type                                                     | Default Value | Description                                                                                                                                                                                                                                                                                                                    |
| --------------------- | -------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data                  | `Object` \| `Array<any>`                                 |               | Data which should be rendered                                                                                                                                                                                                                                                                                                  |
| style                 | StyleProps                                               | defaultStyles | Optional. CSS classes for rendering. Library provides two build-in implementations: `darkStyles`, `defaultStyles` (see below)                                                                                                                                                                                                  |
| shouldInitiallyExpand | `(level: number, value: any, field?: string) => boolean` | allExpanded   | Optional. Function which will be initially called for each Object and Array of the data in order to calculate should if this node be expanded. `level` startes from `0`, `field` does not have a value for the array element. Library provides two build-in implementations: `allExpanded` and `collapseAllNested` (see below) |

### Extra exported

| Name              | Type                         | Description                                         |
| ----------------- | ---------------------------- | --------------------------------------------------- |
| defaultStyles     | StyleProps                   | Default styles for light background                 |
| darkStyles        | StyleProps                   | Default styles for dark background                  |
| allExpanded       | `() => boolean`              | Always returns `true`                               |
| collapseAllNested | `(level: number) => boolean` | Returns `true` only for the first level (`level=0`) |

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
| punctuation     | string | CSS class name for rendering `,`, `[`, `]`, `{`, `}`, `...`                                                       |
| pointer         | string | extra CSS class name for parts which are used for expanding/collapsing: `▸`, `▾` and `...`                        |

## Comparison with other libraries

### Size and dependencies

Here is the size benchmark (using [bundlephobia.com](https://bundlephobia.com)) against similar React libraries (found by https://www.npmjs.com/search?q=react%20json&ranking=popularity):

| Library                  | Bundle size                                                                                                                                  | Bundle size (gzip)                                                                                                                              | Dependencies                                                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **react-json-view-lite** | [![](https://badgen.net/bundlephobia/min/react-json-view-lite?color=6ead0a&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  | [![](https://badgen.net/bundlephobia/minzip/react-json-view-lite?color=6ead0a&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view-lite?color=6ead0a&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  |
| react-json-pretty        | [![](https://badgen.net/bundlephobia/min/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)           | [![](https://badgen.net/bundlephobia/minzip/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)           | [![](https://badgen.net/bundlephobia/dependency-count/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)           |
| react-json-inspector     | [![](https://badgen.net/bundlephobia/min/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector)     | [![](https://badgen.net/bundlephobia/minzip/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector)     | [![](https://badgen.net/bundlephobia/dependency-count/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector)     |
| react-json-tree          | [![](https://badgen.net/bundlephobia/min/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)               | [![](https://badgen.net/bundlephobia/minzip/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)               | [![](https://badgen.net/bundlephobia/dependency-count/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)               |
| react-json-view          | [![](https://badgen.net/bundlephobia/min/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view)               | [![](https://badgen.net/bundlephobia/minzip/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view)               | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view)               |
| react-json-tree-viewer   | [![](https://badgen.net/bundlephobia/min/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer) | [![](https://badgen.net/bundlephobia/minzip/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer) |

### Performance

Performance was mesaures using the [react-component-benchmark](https://github.com/paularmstrong/react-component-benchmark) library. Every component was rendered 50 times using the [300Kb json file](https://github.com/AnyRoad/react-json-view-lite/blob/release/example/src/hugeJson.json) as data source. All numbers are in milliseconds. Tests were performed on Macbook Air M1 16Gb RAM usging Chrome v96.0.4664.110(official build, arm64). Every component was tested 2 times but there was no significant differences in the results.

| Library                  | Min   | Max   | Average | Median | P90   |
| ------------------------ | ----- | ----- | ------- | ------ | ----- |
| **react-json-view-lite** | 81    | 604   | 195     | 82     | 582   |
| react-json-pretty        | 22    | 59    | 32      | 24     | 56    |
| react-json-inspector     | 682   | 1 109 | 758     | 711    | 905   |
| react-json-tree          | 565   | 1 217 | 658     | 620    | 741   |
| react-json-view          | 1 403 | 1 722 | 1529    | 1 540  | 1 631 |
| react-json-tree-viewer   | 266   | 663   | 320     | 278    | 455   |

As you can see `react-json-pretty` renders faster than other libraries but it does not have ability to collapse/expand nested objects so it might be good choice if you need just json syntax highlighting.

## License

MIT © [AnyRoad](https://github.com/AnyRoad)
