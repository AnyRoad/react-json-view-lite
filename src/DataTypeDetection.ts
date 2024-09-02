export const isBoolean = (data: any): data is boolean => {
  return typeof data === 'boolean' || data instanceof Boolean;
};

export const isNumber = (data: any): data is number => {
  return typeof data === 'number' || data instanceof Number;
};

export const isBigInt = (data: any): data is BigInt => {
  return typeof data === 'bigint' || data instanceof BigInt;
};

export const isDate = (data: unknown): data is Date => {
  return !!data && data instanceof Date;
};

export const isString = (data: any): data is string => {
  return typeof data === 'string' || data instanceof String;
};

export const isArray = (data: any): data is Array<any> => {
  return Array.isArray(data);
};

export const isObject = (data: any): data is object => {
  return data instanceof Object && data !== null;
};

export const isNull = (data: any): data is null => {
  return data === null;
};

export const isUndefined = (data: any): data is undefined => {
  return data === undefined;
};
