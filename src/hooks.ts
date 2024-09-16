import { useState, useRef } from 'react';

export function useBool(
  initialValueCreator: () => boolean
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValueCreator());

  const toggle = () => setValue((currentValue) => !currentValue);

  return [value, toggle, setValue];
}

let componentId = 1;
const generateNextId = () => componentId++;

export function useComponentId() {
  const componentId = useRef<string>();
  if (componentId.current === undefined) {
    componentId.current = `:jsnvw:${generateNextId()}:`;
  }
  return componentId.current;
}
