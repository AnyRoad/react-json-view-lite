import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { JsonView, defaultStyles, darkStyles, allExpanded, collapseAllNested } from '../index';

export default {
  title: 'Json View',
  component: JsonView,
  argTypes: {
    data: {
      name: 'data',
      description: 'Data to render in the control. Should be an object or array.'
    },
    shouldExpandNode: {
      name: 'shouldExpandNode',
      source: {
        type: 'code'
      },
      description:
        'Function which will be initially called for each Object and Array of the data in order to calculate should if this node be expanded. `level` startes from `0`, `field` does not have a value for the array element. Library provides two build-in implementations: `allExpanded` and `collapseAllNested`'
    },
    style: {
      name: 'style',
      defaultValue: defaultStyles,
      description:
        'Collection of CSS style to use for the component. Library provides two build-in implementations: `darkStyles`, `defaultStyles`'
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          fontSize: '14px',
          fontFamily: `ui-monospace,Menlo,Monaco,"Roboto Mono","Oxygen Mono","Ubuntu Monospace","Source Code Pro","Droid Sans Mono","Courier New",monospace`
        }}
      >
        {Story()}
      </div>
    )
  ]
} as Meta<typeof JsonView>;

const Template: StoryFn<typeof JsonView> = (args) => <JsonView {...args} />;

// @ts-expect-error toJSON does not exist
// eslint-disable-next-line no-extend-native
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const jsonData = {
  'string property': 'my string',
  '': 'empty name property',
  'bigint property': BigInt('9007199254740991'),
  'number property': 42.42,
  'date property': new Date(0),
  'boolean property': true,
  'null property': null,
  'array propery': [1, 2, 3, 4, 5],
  'nested object': {
    first: true,
    second: 'another value',
    'sub nested': {
      sub1: [true, true, true],
      longText:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra at dolor eu egestas. Mauris bibendum a sem vel euismod. Proin vitae imperdiet diam. In sed gravida nisi, in convallis felis. Fusce convallis dapibus molestie. In tristique dapibus velit et rutrum. Nam vestibulum sodales tortor. Integer gravida aliquet sollicitudin. Duis at nulla varius, congue risus sit amet, gravida ipsum. Cras placerat pellentesque ipsum, a consequat magna pretium et. Duis placerat dui nisi, eget varius dui egestas eget. Etiam leo mauris, mattis et aliquam hendrerit, dapibus eu massa. Phasellus vitae vestibulum elit. Nulla congue eleifend massa at efficitur. '
    }
  }
};

export const Basic = Template.bind({});
Basic.args = {
  data: jsonData,
  style: defaultStyles,
  shouldExpandNode: allExpanded
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  data: jsonData,
  style: darkStyles
};

export const CollapsedNestedObjects = Template.bind({});
CollapsedNestedObjects.args = {
  data: jsonData,
  style: defaultStyles,
  shouldExpandNode: collapseAllNested
};

export const CollapsedRoot = Template.bind({});
const collapseAll = () => false;

CollapsedRoot.args = {
  data: jsonData,
  style: defaultStyles,
  shouldExpandNode: collapseAll
};

export const RenderStringsWithoutObjects = Template.bind({});
RenderStringsWithoutObjects.args = {
  data: jsonData,
  style: { ...defaultStyles, noQuotesForStringValues: true }
};

export const ClickOnFieldNameToExpand = Template.bind({});
ClickOnFieldNameToExpand.args = {
  data: jsonData,
  style: { ...defaultStyles },
  clickToExpandNode: true
};
