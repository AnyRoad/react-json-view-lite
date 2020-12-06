# react-json-view-lite

> JSON viewer component for React focused on performance for big source data rather than provide a lot of options.

[![NPM](https://img.shields.io/npm/v/react-json-view-lite.svg)](https://www.npmjs.com/package/react-json-view-lite) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-json-view-lite
```

## Usage

```tsx
import React, { Component } from 'react';

import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const json = {
  a: 1,
  b: 2,
};

class Example extends JsonView {
  render() {
    return <JsonView data={json} shouldInitiallyExpand={(level) => true} />;
  }
}
```

## License

MIT © [AnyRoad](https://github.com/AnyRoad)
