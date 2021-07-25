import { useState } from 'react';

export function useBool(
  initialValueCreator: () => boolean
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValueCreator());

  const tooggle = () => setValue((currentValue) => !currentValue);

  return [value, tooggle, setValue];
}
