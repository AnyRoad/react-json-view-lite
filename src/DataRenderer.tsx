import * as React from 'react';
import * as DataTypeDetection from './DataTypeDetection';
import { useBool } from './hooks';

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
  noQuotesForStringValues?: boolean;
  quotesForFieldNames?: boolean;
}

interface CommonRenderProps {
  lastElement: boolean;
  /** There should only be one node with `level==0`. */
  level: number;
  style: StyleProps;
  shouldExpandNode: (level: number, value: any, field?: string) => boolean;
  clickToExpandNode: boolean;
  outerRef: React.RefObject<HTMLDivElement>;
}

export interface JsonRenderProps<T> extends CommonRenderProps {
  field?: string;
  value: T;
}

export interface ExpandableRenderProps extends CommonRenderProps {
  field: string | undefined;
  value: Array<any> | object;
  data: Array<[string | undefined, any]>;
  openBracket: string;
  closeBracket: string;
}

function quoteString(value: string, quoted = false) {
  if (!value || quoted) {
    return `"${value}"`;
  }

  return value;
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
  clickToExpandNode,
  outerRef
}: ExpandableRenderProps) {
  // follows tree example for role structure and keypress actions: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-1a/

  const shouldExpandNodeCalledRef = React.useRef(false);
  const [expanded, toggleExpanded, setExpanded] = useBool(() =>
    shouldExpandNode(level, value, field)
  );
  const expanderButtonRef = React.useRef<HTMLSpanElement>(null);

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
  const contentsId = React.useId();
  const childLevel = level + 1;
  const lastIndex = data.length - 1;

  const onKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setExpanded(e.key === 'ArrowRight');
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const direction = e.key === 'ArrowUp' ? -1 : 1;

      if (!outerRef.current) return;
      const buttonElements = outerRef.current.querySelectorAll<HTMLElement>('[role=button]');
      let currentIndex = -1;

      for (let i = 0; i < buttonElements.length; i++) {
        if (buttonElements[i].tabIndex === 0) {
          currentIndex = i;
          break;
        }
      }
      if (currentIndex < 0) {
        return;
      }

      const nextIndex = (currentIndex + direction + buttonElements.length) % buttonElements.length; // auto-wrap
      buttonElements[currentIndex].tabIndex = -1;
      buttonElements[nextIndex].tabIndex = 0;
      buttonElements[nextIndex].focus();
    }
  };

  const onClick = () => {
    toggleExpanded();

    const buttonElement = expanderButtonRef.current;
    if (!buttonElement) return;
    const prevButtonElement = outerRef.current?.querySelector<HTMLElement>(
      '[role=button][tabindex="0"]'
    );
    if (prevButtonElement) {
      prevButtonElement.tabIndex = -1;
    }
    buttonElement.tabIndex = 0;
    buttonElement.focus();
  };

  return (
    <div
      className={style.basicChildStyle}
      role='treeitem'
      aria-expanded={expanded}
      aria-selected={undefined}
    >
      <span
        className={expanderIconStyle}
        onClick={onClick}
        onKeyDown={onKeyDown}
        role='button'
        aria-label={ariaLabel}
        aria-expanded={expanded}
        aria-controls={expanded ? contentsId : undefined}
        ref={expanderButtonRef}
        // tabIndex gets changed by js. There should only be one node (top level) with level==0.
        tabIndex={level === 0 ? 0 : -1}
      />
      {(field || field === '') &&
        (clickToExpandNode ? (
          // don't apply role="button" or tabIndex even though has onClick, because has same
          // function as the +/- expander button (so just expose that button to keyboard and a11y tree)
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <span className={style.clickableLabel} onClick={onClick} onKeyDown={onKeyDown}>
            {quoteString(field, style.quotesForFieldNames)}:
          </span>
        ) : (
          <span className={style.label}>{quoteString(field, style.quotesForFieldNames)}:</span>
        ))}
      <span className={style.punctuation}>{openBracket}</span>

      {expanded ? (
        <ul id={contentsId} role='group'>
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
              outerRef={outerRef}
            />
          ))}
        </ul>
      ) : (
        // don't apply role="button" or tabIndex even though has onClick, because has same
        // function as the +/- expander button (so just expose that button to keyboard and a11y tree)
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span className={style.collapsedContent} onClick={onClick} onKeyDown={onKeyDown} />
      )}

      <span className={style.punctuation}>{closeBracket}</span>
      {!lastElement && <span className={style.punctuation}>,</span>}
    </div>
  );
}

export interface EmptyRenderProps {
  field: string | undefined;
  openBracket: string;
  closeBracket: string;
  lastElement: boolean;
  style: StyleProps;
}

function EmptyObject({ field, openBracket, closeBracket, lastElement, style }: EmptyRenderProps) {
  return (
    <div className={style.basicChildStyle} role='treeitem' aria-selected={undefined}>
      {(field || field === '') && (
        <span className={style.label}>{quoteString(field, style.quotesForFieldNames)}:</span>
      )}
      <span className={style.punctuation}>{openBracket}</span>
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
  level,
  outerRef
}: JsonRenderProps<Object>) {
  if (Object.keys(value).length === 0) {
    return EmptyObject({
      field,
      openBracket: '{',
      closeBracket: '}',
      lastElement,
      style
    });
  }

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
    data: Object.keys(value).map((key) => [key, value[key as keyof typeof value]]),
    outerRef
  });
}

function JsonArray({
  field,
  value,
  style,
  lastElement,
  level,
  shouldExpandNode,
  clickToExpandNode,
  outerRef
}: JsonRenderProps<Array<any>>) {
  if (value.length === 0) {
    return EmptyObject({
      field,
      openBracket: '[',
      closeBracket: ']',
      lastElement,
      style
    });
  }

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
    data: value.map((element) => [undefined, element]),
    outerRef
  });
}

function JsonPrimitiveValue({
  field,
  value,
  style,
  lastElement
}: JsonRenderProps<string | number | boolean | Date | null | undefined>) {
  let stringValue;
  let valueStyle = style.otherValue;

  if (value === null) {
    stringValue = 'null';
    valueStyle = style.nullValue;
  } else if (value === undefined) {
    stringValue = 'undefined';
    valueStyle = style.undefinedValue;
  } else if (DataTypeDetection.isString(value)) {
    stringValue = quoteString(value, !style.noQuotesForStringValues);
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
    stringValue = (value as any).toString();
  }

  return (
    <div className={style.basicChildStyle} role='treeitem' aria-selected={undefined}>
      {(field || field === '') && (
        <span className={style.label}>{quoteString(field, style.quotesForFieldNames)}:</span>
      )}
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
