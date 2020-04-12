import * as React from 'react';
import * as DataTypeDetection from './DataTypeDetection';

interface ObjectProps {
  field?: string;
  value: object;
  isLastElement?: boolean;
  style?: StyleProps;
}

export interface StyleProps {
  basicChildStyle: string;
  label: string;
  nullValue: string;
  undefinedValue: string;
  numberValue: string;
  stringValue: string;
  booleanValue: string;
  otherValue: string;
}

function JsonObject({ field, value, style, isLastElement }: ObjectProps) {
  const fields = Object.keys(value);
  return (
    <div className={style?.basicChildStyle}>
      {field && <span className={style?.label}>{field}:</span>}
      {`{`}
      <div>
        {fields.map((key, index) => (
          <DataRender
            key={key}
            field={key}
            data={value[key]}
            style={style}
            isLastElement={index === fields.length - 1}
          />
        ))}
      </div>
      {`}`}
      {!isLastElement && ','}
    </div>
  );
}

interface ArrayProps {
  field?: string;
  values: Array<any>;
  isLastElement?: boolean;
  style?: StyleProps;
}

function JsonArray({ field, values, style, isLastElement }: ArrayProps) {
  return (
    <div className={style?.basicChildStyle}>
      {field && <span className={style?.label}>{field}:</span>}
      {`[`}
      <div>
        {values.map((value, index) => (
          <DataRender
            key={index}
            data={value}
            style={style}
            isLastElement={index === values.length - 1}
          />
        ))}
      </div>
      {`]`}
      {!isLastElement && ','}
    </div>
  );
}

interface PrimitiveValueProps {
  field?: string;
  value: string | number | boolean | null | undefined;
  isLastElement?: boolean;
  style?: StyleProps;
}

function JsonPrimitiveValue({ field, value, style, isLastElement }: PrimitiveValueProps) {
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
      {!isLastElement && ','}
    </div>
  );
}

export interface JsonRenderProps {
  field?: string;
  data: any;
  isLastElement?: boolean;
  style?: StyleProps;
}

export default function DataRender({
  field,
  data,
  style,
  isLastElement,
}: JsonRenderProps) {
  if (DataTypeDetection.isArray(data)) {
    return (
      <JsonArray
        field={field}
        values={data}
        style={style}
        isLastElement={isLastElement}
      />
    );
  }

  if (DataTypeDetection.isObject(data)) {
    return (
      <JsonObject
        field={field}
        value={data}
        style={style}
        isLastElement={isLastElement}
      />
    );
  }

  return (
    <JsonPrimitiveValue
      field={field}
      value={data}
      style={style}
      isLastElement={isLastElement}
    />
  );
}
