## 2.0.1

### Bug Fixes

- Fixes margin and padding for the expandable elements (because `div` element changed to the `ul`)

## 2.0.0

Major version upgrade.

### Breaking Changes

- Dropped support of React 16 and React 17. Please use versions 1.x.x if your project uses React 16 or React 17.
- Expanding and collapsing nodes with the "space" button changed to navigation and expanding using arrow keys. Left and Right to collapse/expand, Up and Down to move to previous/next collapsable element.

### New Features

- [Always quote objects property names with quotesForFieldNames property](https://github.com/AnyRoad/react-json-view-lite/pull/31)
- [Improved a11y support](https://github.com/AnyRoad/react-json-view-lite/pull/32)

## 1.5.0

### Bug Fixes

- [Fixed](https://github.com/AnyRoad/react-json-view-lite/issues/28): Improves empty objects and empty arrays. Also fixes too wide space between two spans having the `punctuation` class (e.g. `] ,` or `[  ]`)

## 1.4.0

### New Feature

- [Click on field name to expand node](https://github.com/AnyRoad/react-json-view-lite/pull/27)

## 1.3.1

### Bug Fixes

- [Fixed](https://github.com/AnyRoad/react-json-view-lite/issues/24) pressing the spacebar expands/collapses and "pages down" in the browser

## 1.3.0

### New Feature

- [New style parameter for not adding double quotes to rendered strings](https://github.com/AnyRoad/react-json-view-lite/issues/22)

## 1.2.1

### Bug Fixes

- [Fixed](https://github.com/AnyRoad/react-json-view-lite/issues/20) component didn't work with React 16 and React 17

## 1.2.0

### New Feature

- [Improved accessibility support](https://github.com/AnyRoad/react-json-view-lite/pull/16)

## 1.1.0

### New Feature

- [Render Date as an ISO-formatted string](https://github.com/AnyRoad/react-json-view-lite/pull/13)

## 1.0.1

### Bug Fixes

- [Fixed](https://github.com/AnyRoad/react-json-view-lite/pull/14) collapse/expand button style

## 1.0.0

### Breaking changes

1. Property `shouldInitiallyExpand` has different name `shouldExpandNode` in order to emphasize that it will be called every time properties change.
2. If you use custom styles:
   - `pointer` and `expander` are no longer used
   - component uses `collapseIcon`, `expandIcon`, `collapsedContent` styles in order to customize expand/collapse icon and collpased content placeholder which were previously hardcode to the `▸`, `▾` and `...`.
     Default style values use `::after` pseudo-classes to set the content.

## 0.9.8

### Bug Fixes

- Fixed [bug when empty object key was not rendered correctly](https://github.com/AnyRoad/react-json-view-lite/issues/9)

## 0.9.7

### New Features

- Added [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) rendering support

## 0.9.6

### Bug Fixes

- Fixed css style for comma after primitive type value

## 0.9.5

### New Features

- Added minimum a11y support
- Added React 18 to peer dependencies
- Updated dev dependencies versions
- Added storybook

## 0.9.4

### New Features

- Added ability to expand arrays and nested objects by clicking on the `...` part
- Added `allExpanded` and `collapseAllNested` exported functions which can be used for the `shouldInitiallyExpand` property
- Added new separate style for the "pointer" which applied for `▸`, `▾` and `...`
