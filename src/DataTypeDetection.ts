export const isBoolean = (data: any) => {
  return typeof data === 'boolean' || data instanceof Boolean;
};

export const isNumber = (data: any) => {
  return typeof data === 'number' || data instanceof Number;
};

export const isBigInt = (data: any) => {
  return typeof data === 'bigint' || data instanceof BigInt;
};

export const isString = (data: any) => {
  return typeof data === 'string' || data instanceof String;
};

export const isArray = (data: any) => {
  return Array.isArray(data);
};

export const isObject = (data: any) => {
  return data instanceof Object && data !== null;
};

export const isNull = (data: any) => {
  return data === null;
};

export const isUndefined = (data: any) => {
  return data === undefined;
};
