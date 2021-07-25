import * as React from 'react';
import * as DataTypeDetection from './DataTypeDetection';
import { useBool } from './hooks';

const expandedIcon = '\u25BE';
const collapsedIcon = '\u25B8';

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

export interface ExpandableRenderProps {
  field?: string;
  value: Array<any> | object;
  data: Array<[string | undefined, any]>;
  openBracket: string;
  closeBracket: string;
  lastElement: boolean;
  level: number;
  style?: StyleProps;
  shouldInitiallyExpand?: (level: number, value: any, field?: string) => boolean;
}

function renderExpandableObject({
  field,
  value,
  data,
  lastElement,
  openBracket,
  closeBracket,
  level,
  style,
  shouldInitiallyExpand
}: ExpandableRenderProps) {
  const [expanded, toggleExpanded, setExpanded] = useBool(() =>
    shouldInitiallyExpand ? shouldInitiallyExpand(level, value, field) : true
  );

  React.useEffect(
    () => shouldInitiallyExpand && setExpanded(shouldInitiallyExpand(level, value, field)),
    [shouldInitiallyExpand]
  );

  const expandIcon = expanded ? expandedIcon : collapsedIcon;
  return (
    <div className={style?.basicChildStyle}>
      <span className={style?.expander} onClick={toggleExpanded}>
        {expandIcon}
      </span>
      {field && <span className={style?.label}>{field}:</span>}
      <span className={style?.punctuation}>{openBracket}</span>

      {expanded && (
        <div>
          {data.map((dataElement, index) => (
            <DataRender
              key={dataElement[0] || index}
              field={dataElement[0]}
              value={dataElement[1]}
              style={style}
              lastElement={index === data.length - 1}
              level={(level || 0) + 1}
              shouldInitiallyExpand={shouldInitiallyExpand}
            />
          ))}
        </div>
      )}

      {!expanded && <span className={style?.punctuation}>...</span>}
      <span className={style?.punctuation}>{closeBracket}</span>
      {!lastElement && <span className={style?.punctuation}>,</span>}
    </div>
  );
}

function JsonObject({
  field,
  value,
  style,
  lastElement,
  shouldInitiallyExpand,
  level
}: JsonRenderProps<Object>) {
  return renderExpandableObject({
    field,
    value,
    lastElement: lastElement || false,
    level: level || 0,
    openBracket: '{',
    closeBracket: '}',
    style,
    shouldInitiallyExpand,
    data: Object.keys(value).map((key) => [key, value[key]])
  });
}

function JsonArray({
  field,
  value,
  style,
  lastElement,
  level,
  shouldInitiallyExpand
}: JsonRenderProps<Array<any>>) {
  return renderExpandableObject({
    field,
    value,
    lastElement: lastElement || false,
    level: level || 0,
    openBracket: '[',
    closeBracket: ']',
    style,
    shouldInitiallyExpand,
    data: value.map((element) => [undefined, element])
  });
}

function JsonPrimitiveValue({
  field,
  value,
  style,
  lastElement
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
