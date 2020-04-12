import * as React from 'react';
import DataRender, { StyleProps } from './components/DataRenderer';
import styles from './styles.module.css';

interface Props {
  data: any;
  style: StyleProps;
}

export const defaultStyles: StyleProps = {
  basicChildStyle: styles['basic-element-style'],
  label: styles['label-light'],
  nullValue: styles['value-null-light'],
  undefinedValue: styles['value-undefined-light'],
  stringValue: styles['value-string-light'],
  booleanValue: styles['value-boolean-light'],
  numberValue: styles['value-number-light'],
  otherValue: styles['value-other-light'],
};

export const JsonView = ({ data, style = defaultStyles }: Props) => {
  return (
    <div className={styles.test}>
      <DataRender data={data} style={style} isLastElement />
    </div>
  );
};
