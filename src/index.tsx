import * as React from 'react';
import DataRender, { StyleProps } from './DataRenderer';
import styles from './styles.module.css';

export interface Props {
  data: Object | Array<any>;
  style?: StyleProps;
  shouldExpandNode?: (level: number, value: any, field?: string) => boolean;
}

export const defaultStyles: StyleProps = {
  container: styles['container-light'],
  basicChildStyle: styles['basic-element-style'],
  label: styles['label-light'],
  nullValue: styles['value-null-light'],
  undefinedValue: styles['value-undefined-light'],
  stringValue: styles['value-string-light'],
  booleanValue: styles['value-boolean-light'],
  numberValue: styles['value-number-light'],
  otherValue: styles['value-other-light'],
  punctuation: styles['punctuation-light'],
  collapseIcon: styles['collapse-icon-light'],
  expandIcon: styles['expand-icon-light'],
  collapsedContent: styles['collapsed-content-light']
};

export const darkStyles: StyleProps = {
  container: styles['container-dark'],
  basicChildStyle: styles['basic-element-style'],
  label: styles['label-dark'],
  nullValue: styles['value-null-dark'],
  undefinedValue: styles['value-undefined-dark'],
  stringValue: styles['value-string-dark'],
  booleanValue: styles['value-boolean-dark'],
  numberValue: styles['value-number-dark'],
  otherValue: styles['value-other-dark'],
  punctuation: styles['punctuation-dark'],
  collapseIcon: styles['collapse-icon-dark'],
  expandIcon: styles['expand-icon-dark'],
  collapsedContent: styles['collapsed-content-dark']
};

export const allExpanded = () => true;
export const collapseAllNested = (level: number) => level < 1;

export const JsonView = ({
  data,
  style = defaultStyles,
  shouldExpandNode = allExpanded
}: Props) => {
  return (
    <div className={style.container}>
      <DataRender
        value={data}
        style={style}
        lastElement
        level={0}
        shouldExpandNode={shouldExpandNode}
      />
    </div>
  );
};
