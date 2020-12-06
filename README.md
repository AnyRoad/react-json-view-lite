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
  <a href="https://github.com/anyroad/react-json-view-lite/actions">
    <img alt="build" src="https://img.shields.io/github/workflow/status/anyroad/react-json-view-lite/Node.js%20CI/release.svg" />
  </a>
  <a href="https://codecov.io/gh/anyroad/react-json-view-lite">
    <img alt="coverage" src="https://img.shields.io/codecov/c/github/anyroad/react-json-view-lite.svg" />
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
import React, { Component } from 'react';

import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const json = {
  a: 1,
  b: 2,
};

class Example extends JsonView {
  render() {
    return (
      <JsonView
        data={json}
        style={defaultStyles}
        shouldInitiallyExpand={(level) => true}
      />
    );
  }
}
```

## Comparison with other libraries

Here is the size benchmark (using [bundlephobia.com](https://bundlephobia.com)) against similar React libraries:

| Name                     | Bundle size                                                                                                                                  | Bundle size (gzip)                                                                                                                              | Dependencies                                                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **react-json-view-lite** | [![](https://badgen.net/bundlephobia/min/react-json-view-lite?color=6ead0a&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  | [![](https://badgen.net/bundlephobia/minzip/react-json-view-lite?color=6ead0a&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view-lite?color=6ead0a&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  |
| react-json-pretty        | [![](https://badgen.net/bundlephobia/min/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)           | [![](https://badgen.net/bundlephobia/minzip/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)           | [![](https://badgen.net/bundlephobia/dependency-count/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)           |
| react-json-tree          | [![](https://badgen.net/bundlephobia/min/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)               | [![](https://badgen.net/bundlephobia/minzip/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)               | [![](https://badgen.net/bundlephobia/dependency-count/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)               |
| react-json-view          | [![](https://badgen.net/bundlephobia/min/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view)               | [![](https://badgen.net/bundlephobia/minzip/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view)               | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view)               |
| react-json-tree-viewer   | [![](https://badgen.net/bundlephobia/min/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer) | [![](https://badgen.net/bundlephobia/minzip/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer) |

## License

MIT © [AnyRoad](https://github.com/AnyRoad)
