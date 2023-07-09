import * as DataTypeDetection from './DataTypeDetection';

const trueValue = true;
const falseValue = false;
const stringValue = 'string';
const numberValue = 42;
const floatNumberValue = 42.42;
const nullValue = null;
const undefinedValue = undefined;
const arrayValue = [numberValue];
const objectValue = { field: numberValue };
const dateValue = new Date();
const errorValue = new Error();
const regExValue = /test/;
const symbolValue = Symbol('s');
const bigintValue = BigInt(42);

describe('isBoolean', () => {
  it('should return `true` for boolean values', () => {
    expect(DataTypeDetection.isBoolean(trueValue)).toBe(true);
    expect(DataTypeDetection.isBoolean(falseValue)).toBe(true);
    expect(DataTypeDetection.isBoolean(Boolean(trueValue))).toBe(true);
    expect(DataTypeDetection.isBoolean(Boolean(falseValue))).toBe(true);
  });

  it('should return `false` for non-boolean values', () => {
    expect(DataTypeDetection.isBoolean(objectValue)).toBe(false);
    expect(DataTypeDetection.isBoolean(arrayValue)).toBe(false);
    expect(DataTypeDetection.isBoolean(stringValue)).toBe(false);
    expect(DataTypeDetection.isBoolean(numberValue)).toBe(false);
    expect(DataTypeDetection.isBoolean(nullValue)).toBe(false);
    expect(DataTypeDetection.isBoolean(undefinedValue)).toBe(false);
    expect(DataTypeDetection.isBoolean(errorValue)).toBe(false);
    expect(DataTypeDetection.isBoolean(dateValue)).toBe(false);
    expect(DataTypeDetection.isBoolean(regExValue)).toBe(false);
    expect(DataTypeDetection.isBoolean(symbolValue)).toBe(false);
    expect(DataTypeDetection.isBoolean(bigintValue)).toBe(false);
  });
});

describe('isNumber', () => {
  it('should return `true` for number values', () => {
    expect(DataTypeDetection.isNumber(numberValue)).toBe(true);
    expect(DataTypeDetection.isNumber(floatNumberValue)).toBe(true);
    expect(DataTypeDetection.isNumber(Number(numberValue))).toBe(true);
    expect(DataTypeDetection.isNumber(Number(floatNumberValue))).toBe(true);
  });

  it('should return `false` for non-number values', () => {
    expect(DataTypeDetection.isNumber(trueValue)).toBe(false);
    expect(DataTypeDetection.isNumber(falseValue)).toBe(false);
    expect(DataTypeDetection.isNumber(objectValue)).toBe(false);
    expect(DataTypeDetection.isNumber(arrayValue)).toBe(false);
    expect(DataTypeDetection.isNumber(stringValue)).toBe(false);
    expect(DataTypeDetection.isNumber(nullValue)).toBe(false);
    expect(DataTypeDetection.isNumber(undefinedValue)).toBe(false);
    expect(DataTypeDetection.isNumber(errorValue)).toBe(false);
    expect(DataTypeDetection.isNumber(dateValue)).toBe(false);
    expect(DataTypeDetection.isNumber(regExValue)).toBe(false);
    expect(DataTypeDetection.isNumber(symbolValue)).toBe(false);
    expect(DataTypeDetection.isNumber(bigintValue)).toBe(false);
  });
});

describe('isString', () => {
  it('should return `true` for string values', () => {
    expect(DataTypeDetection.isString(stringValue)).toBe(true);
    expect(DataTypeDetection.isString(String(stringValue))).toBe(true);
  });

  it('should return `false` for non-string values', () => {
    expect(DataTypeDetection.isString(numberValue)).toBe(false);
    expect(DataTypeDetection.isString(floatNumberValue)).toBe(false);
    expect(DataTypeDetection.isString(trueValue)).toBe(false);
    expect(DataTypeDetection.isString(falseValue)).toBe(false);
    expect(DataTypeDetection.isString(objectValue)).toBe(false);
    expect(DataTypeDetection.isString(arrayValue)).toBe(false);
    expect(DataTypeDetection.isString(nullValue)).toBe(false);
    expect(DataTypeDetection.isString(undefinedValue)).toBe(false);
    expect(DataTypeDetection.isString(errorValue)).toBe(false);
    expect(DataTypeDetection.isString(dateValue)).toBe(false);
    expect(DataTypeDetection.isString(regExValue)).toBe(false);
    expect(DataTypeDetection.isString(symbolValue)).toBe(false);
    expect(DataTypeDetection.isString(bigintValue)).toBe(false);
  });
});

describe('isNull', () => {
  it('should return `true` for null value', () => {
    expect(DataTypeDetection.isNull(nullValue)).toBe(true);
  });

  it('should return `false` for non-null values', () => {
    expect(DataTypeDetection.isNull(trueValue)).toBe(false);
    expect(DataTypeDetection.isNull(falseValue)).toBe(false);
    expect(DataTypeDetection.isNull(objectValue)).toBe(false);
    expect(DataTypeDetection.isNull(arrayValue)).toBe(false);
    expect(DataTypeDetection.isNull(stringValue)).toBe(false);
    expect(DataTypeDetection.isNull(numberValue)).toBe(false);
    expect(DataTypeDetection.isNull(undefinedValue)).toBe(false);
    expect(DataTypeDetection.isNull(errorValue)).toBe(false);
    expect(DataTypeDetection.isNull(dateValue)).toBe(false);
    expect(DataTypeDetection.isNull(regExValue)).toBe(false);
    expect(DataTypeDetection.isNull(symbolValue)).toBe(false);
    expect(DataTypeDetection.isNull(bigintValue)).toBe(false);
  });
});

describe('isUndefined', () => {
  it('should return `true` for null value', () => {
    expect(DataTypeDetection.isUndefined(undefinedValue)).toBe(true);
  });

  it('should return `false` for non-null values', () => {
    expect(DataTypeDetection.isUndefined(trueValue)).toBe(false);
    expect(DataTypeDetection.isUndefined(falseValue)).toBe(false);
    expect(DataTypeDetection.isUndefined(objectValue)).toBe(false);
    expect(DataTypeDetection.isUndefined(arrayValue)).toBe(false);
    expect(DataTypeDetection.isUndefined(stringValue)).toBe(false);
    expect(DataTypeDetection.isUndefined(numberValue)).toBe(false);
    expect(DataTypeDetection.isUndefined(nullValue)).toBe(false);
    expect(DataTypeDetection.isUndefined(errorValue)).toBe(false);
    expect(DataTypeDetection.isUndefined(dateValue)).toBe(false);
    expect(DataTypeDetection.isUndefined(regExValue)).toBe(false);
    expect(DataTypeDetection.isUndefined(symbolValue)).toBe(false);
    expect(DataTypeDetection.isUndefined(bigintValue)).toBe(false);
  });
});

describe('isArray', () => {
  it('should return `true` for array value', () => {
    expect(DataTypeDetection.isArray(arrayValue)).toBe(true);
  });

  it('should return `false` for non-array values', () => {
    expect(DataTypeDetection.isArray(trueValue)).toBe(false);
    expect(DataTypeDetection.isArray(falseValue)).toBe(false);
    expect(DataTypeDetection.isArray(objectValue)).toBe(false);
    expect(DataTypeDetection.isArray(stringValue)).toBe(false);
    expect(DataTypeDetection.isArray(numberValue)).toBe(false);
    expect(DataTypeDetection.isArray(nullValue)).toBe(false);
    expect(DataTypeDetection.isArray(undefinedValue)).toBe(false);
    expect(DataTypeDetection.isArray(errorValue)).toBe(false);
    expect(DataTypeDetection.isArray(dateValue)).toBe(false);
    expect(DataTypeDetection.isArray(regExValue)).toBe(false);
    expect(DataTypeDetection.isArray(symbolValue)).toBe(false);
    expect(DataTypeDetection.isArray(bigintValue)).toBe(false);
  });
});

describe('isObject', () => {
  it('should return `true` for array value', () => {
    expect(DataTypeDetection.isObject(objectValue)).toBe(true);
    expect(DataTypeDetection.isObject(errorValue)).toBe(true);
    expect(DataTypeDetection.isObject(dateValue)).toBe(true);
    expect(DataTypeDetection.isObject(regExValue)).toBe(true);
  });

  it('should return `false` for non-array values', () => {
    expect(DataTypeDetection.isObject(trueValue)).toBe(false);
    expect(DataTypeDetection.isObject(falseValue)).toBe(false);
    expect(DataTypeDetection.isObject(arrayValue)).toBe(true);
    expect(DataTypeDetection.isObject(stringValue)).toBe(false);
    expect(DataTypeDetection.isObject(numberValue)).toBe(false);
    expect(DataTypeDetection.isObject(nullValue)).toBe(false);
    expect(DataTypeDetection.isObject(undefinedValue)).toBe(false);
    expect(DataTypeDetection.isObject(symbolValue)).toBe(false);
    expect(DataTypeDetection.isObject(bigintValue)).toBe(false);
  });
});

describe('isBigInt', () => {
  it('should return `true` for bigint value', () => {
    expect(DataTypeDetection.isBigInt(bigintValue)).toBe(true);
  });

  it('should return `false` for non-array values', () => {
    expect(DataTypeDetection.isBigInt(objectValue)).toBe(false);
    expect(DataTypeDetection.isBigInt(errorValue)).toBe(false);
    expect(DataTypeDetection.isBigInt(dateValue)).toBe(false);
    expect(DataTypeDetection.isBigInt(regExValue)).toBe(false);
    expect(DataTypeDetection.isBigInt(trueValue)).toBe(false);
    expect(DataTypeDetection.isBigInt(falseValue)).toBe(false);
    expect(DataTypeDetection.isBigInt(arrayValue)).toBe(false);
    expect(DataTypeDetection.isBigInt(stringValue)).toBe(false);
    expect(DataTypeDetection.isBigInt(numberValue)).toBe(false);
    expect(DataTypeDetection.isBigInt(nullValue)).toBe(false);
    expect(DataTypeDetection.isBigInt(undefinedValue)).toBe(false);
    expect(DataTypeDetection.isBigInt(symbolValue)).toBe(false);
  });
});
