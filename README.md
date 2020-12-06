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

## License

MIT © [AnyRoad](https://github.com/AnyRoad)
