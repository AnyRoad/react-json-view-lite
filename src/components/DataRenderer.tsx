import * as React from 'react';
import * as DataTypeDetection from '../DataTypeDetection';
import { useBool } from '../hooks';

export interface StyleProps {
  container: string;
  basicChildStyle: string;
  expander: string;
  label: string;
  nullValue: string;
  undefinedValue: string;
  numberValue: string;
  stringValue: string;
  booleanValue: string;
  otherValue: string;
  punctuation: string;
}

export interface JsonRenderProps<T> {
  field?: string;
  value: T;
  lastElement?: boolean;
  level?: number;
  style?: StyleProps;
  shouldInitiallyExpand?: (level: number, value: any, field?: string) => boolean;
}

function JsonObject({
  field,
  value,
  style,
  lastElement,
  shouldInitiallyExpand,
  level,
}: JsonRenderProps<Object>) {
  const [expanded, toggleExpanded] = useBool(() =>
    shouldInitiallyExpand ? shouldInitiallyExpand(level || 0, value, field) : true,
  );

  const fields = Object.keys(value);
  const expandIcon = expanded ? '\u25BE' : '\u25B8';
  return (
    <div className={style?.basicChildStyle}>
      <span className={style?.expander} onClick={toggleExpanded}>
        {expandIcon}
      </span>
      {field && <span className={style?.label}>{field}:</span>}
      <span className={style?.punctuation}>{`{`}</span>

      {expanded && (
        <div>
          {fields.map((key, index) => (
            <DataRender
              key={key}
              field={key}
              value={value[key]}
              style={style}
              lastElement={index === fields.length - 1}
              level={(level || 0) + 1}
              shouldInitiallyExpand={shouldInitiallyExpand}
            />
          ))}
        </div>
      )}

      {!expanded && <span className={style?.punctuation}>...</span>}
      <span className={style?.punctuation}>{`}`}</span>
      {!lastElement && <span className={style?.punctuation}>,</span>}
    </div>
  );
}

function JsonArray({
  field,
  value,
  style,
  lastElement,
  level,
  shouldInitiallyExpand,
}: JsonRenderProps<Array<any>>) {
  const [expanded, toggleExpanded] = useBool(() =>
    shouldInitiallyExpand ? shouldInitiallyExpand(level || 0, value, field) : true,
  );

  const expandIcon = expanded ? '\u25BE' : '\u25B8';

  return (
    <div className={style?.basicChildStyle}>
      <span className={style?.expander} onClick={toggleExpanded}>
        {expandIcon}
      </span>
      {field && <span className={style?.label}>{field}:</span>}
      <span className={style?.punctuation}>[</span>
      {expanded && (
        <div>
          {value.map((element, index) => (
            <DataRender
              key={index}
              value={element}
              style={style}
              lastElement={index === value.length - 1}
              level={(level || 0) + 1}
              shouldInitiallyExpand={shouldInitiallyExpand}
            />
          ))}
        </div>
      )}
      {!expanded && <span className={style?.punctuation}>...</span>}
      <span className={style?.punctuation}>]</span>
      {!lastElement && <span className={style?.punctuation}>,</span>}
    </div>
  );
}

function JsonPrimitiveValue({
  field,
  value,
  style,
  lastElement,
}: JsonRenderProps<string | number | boolean | null | undefined>) {
  let stringValue = value;
  let valueStyle = style?.otherValue;

  if (value === null) {
    stringValue = 'null';
    valueStyle = style?.nullValue;
  } else if (value === undefined) {
    stringValue = 'undefined';
    valueStyle = style?.undefinedValue;
  } else if (DataTypeDetection.isString(value)) {
    stringValue = `"${value}"`;
    valueStyle = style?.stringValue;
  } else if (DataTypeDetection.isBoolean(value)) {
    stringValue = value ? 'true' : 'false';
    valueStyle = style?.booleanValue;
  } else if (DataTypeDetection.isNumber(value)) {
    stringValue = value.toString();
    valueStyle = style?.numberValue;
  } else {
    stringValue = value.toString();
  }

  return (
    <div className={style?.basicChildStyle}>
      {field && <span className={style?.label}>{field}:</span>}
      <span className={valueStyle}>{stringValue}</span>
      {!lastElement && <span className={style?.label}>,</span>}
    </div>
  );
}

export default function DataRender(props: JsonRenderProps<any>) {
  const value = props.value;
  if (DataTypeDetection.isArray(value)) {
    return <JsonArray {...props} />;
  }

  if (DataTypeDetection.isObject(value)) {
    return <JsonObject {...props} />;
  }

  return <JsonPrimitiveValue {...props} />;
}
