import * as React from 'react';
import * as DataTypeDetection from './DataTypeDetection';
import { useBool, useComponentId } from './hooks';

export interface StyleProps {
  container: string;
  basicChildStyle: string;
  label: string;
  clickableLabel: string;
  nullValue: string;
  undefinedValue: string;
  numberValue: string;
  stringValue: string;
  booleanValue: string;
  otherValue: string;
  punctuation: string;
  expandIcon: string;
  collapseIcon: string;
  collapsedContent: string;
  noQuotesForStringValues: boolean;
}

export interface JsonRenderProps<T> {
  field?: string;
  value: T;
  lastElement: boolean;
  level: number;
  style: StyleProps;
  shouldExpandNode: (level: number, value: any, field?: string) => boolean;
  clickToExpandNode: boolean;
}

export interface ExpandableRenderProps {
  field?: string;
  value: Array<any> | object;
  data: Array<[string | undefined, any]>;
  openBracket: string;
  closeBracket: string;
  lastElement: boolean;
  level: number;
  style: StyleProps;
  shouldExpandNode: (level: number, value: any, field?: string) => boolean;
  clickToExpandNode: boolean;
}

function ExpandableObject({
  field,
  value,
  data,
  lastElement,
  openBracket,
  closeBracket,
  level,
  style,
  shouldExpandNode,
  clickToExpandNode
}: ExpandableRenderProps) {
  const shouldExpandNodeCalledRef = React.useRef(false);
  const [expanded, toggleExpanded, setExpanded] = useBool(() =>
    shouldExpandNode(level, value, field)
  );

  React.useEffect(() => {
    if (!shouldExpandNodeCalledRef.current) {
      shouldExpandNodeCalledRef.current = true;
    } else {
      setExpanded(shouldExpandNode(level, value, field));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldExpandNode]);

  const expanderIconStyle = expanded ? style.collapseIcon : style.expandIcon;
  const ariaLabel = expanded ? 'collapse JSON' : 'expand JSON';
  const contentsId = useComponentId();
  const childLevel = level + 1;
  const lastIndex = data.length - 1;

  const onKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <div className={style.basicChildStyle} role='list'>
      <span
        className={expanderIconStyle}
        onClick={toggleExpanded}
        onKeyDown={onKeyDown}
        role='button'
        tabIndex={0}
        aria-label={ariaLabel}
        aria-expanded={expanded}
        aria-controls={expanded ? contentsId : undefined}
      />
      {field &&
        (clickToExpandNode ? (
          <span
            className={style.clickableLabel}
            onClick={toggleExpanded}
            onKeyDown={onKeyDown}
            role='button'
            tabIndex={-1}
          >
            {field}:
          </span>
        ) : (
          <span className={style.label}>{field}:</span>
        ))}
      <span className={style.punctuation}>{openBracket}</span>

      {expanded ? (
        <div id={contentsId}>
          {data.map((dataElement, index) => (
            <DataRender
              key={dataElement[0] || index}
              field={dataElement[0]}
              value={dataElement[1]}
              style={style}
              lastElement={index === lastIndex}
              level={childLevel}
              shouldExpandNode={shouldExpandNode}
              clickToExpandNode={clickToExpandNode}
            />
          ))}
        </div>
      ) : (
        <span
          className={style.collapsedContent}
          onClick={toggleExpanded}
          onKeyDown={onKeyDown}
          role='button'
          tabIndex={-1} // No need to be able to tab to this button, can just use the other button
          aria-hidden={true} // No need for screen readers to see this button, they can just use the other button
          aria-label={ariaLabel}
          aria-expanded={expanded}
        />
      )}

      <span className={style.punctuation}>{closeBracket}</span>
      {!lastElement && <span className={style.punctuation}>,</span>}
    </div>
  );
}

function JsonObject({
  field,
  value,
  style,
  lastElement,
  shouldExpandNode,
  clickToExpandNode,
  level
}: JsonRenderProps<Object>) {
  return ExpandableObject({
    field,
    value,
    lastElement: lastElement || false,
    level,
    openBracket: '{',
    closeBracket: '}',
    style,
    shouldExpandNode,
    clickToExpandNode,
    data: Object.keys(value).map((key) => [key, value[key as keyof typeof value]])
  });
}

function JsonArray({
  field,
  value,
  style,
  lastElement,
  level,
  shouldExpandNode,
  clickToExpandNode
}: JsonRenderProps<Array<any>>) {
  return ExpandableObject({
    field,
    value,
    lastElement: lastElement || false,
    level,
    openBracket: '[',
    closeBracket: ']',
    style,
    shouldExpandNode,
    clickToExpandNode,
    data: value.map((element) => [undefined, element])
  });
}

function JsonPrimitiveValue({
  field,
  value,
  style,
  lastElement
}: JsonRenderProps<string | number | boolean | Date | null | undefined>) {
  let stringValue = value;
  let valueStyle = style.otherValue;

  if (value === null) {
    stringValue = 'null';
    valueStyle = style.nullValue;
  } else if (value === undefined) {
    stringValue = 'undefined';
    valueStyle = style.undefinedValue;
  } else if (DataTypeDetection.isString(value)) {
    stringValue = style.noQuotesForStringValues ? (value as string) : `"${value}"`;
    valueStyle = style.stringValue;
  } else if (DataTypeDetection.isBoolean(value)) {
    stringValue = value ? 'true' : 'false';
    valueStyle = style.booleanValue;
  } else if (DataTypeDetection.isNumber(value)) {
    stringValue = value.toString();
    valueStyle = style.numberValue;
  } else if (DataTypeDetection.isBigInt(value)) {
    stringValue = `${value.toString()}n`;
    valueStyle = style.numberValue;
  } else if (DataTypeDetection.isDate(value)) {
    stringValue = value.toISOString();
  } else {
    stringValue = value.toString();
  }

  if (field === '') {
    field = '""';
  }

  return (
    <div className={style.basicChildStyle} role='listitem'>
      {field && <span className={style.label}>{field}:</span>}
      <span className={valueStyle}>{stringValue}</span>
      {!lastElement && <span className={style.punctuation}>,</span>}
    </div>
  );
}

export default function DataRender(props: JsonRenderProps<any>) {
  const value = props.value;
  if (DataTypeDetection.isArray(value)) {
    return <JsonArray {...props} />;
  }

  if (DataTypeDetection.isObject(value) && !DataTypeDetection.isDate(value)) {
    return <JsonObject {...props} />;
  }

  return <JsonPrimitiveValue {...props} />;
}
