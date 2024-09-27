import * as React from 'react';
import { useBool } from './hooks';

import { render } from '@testing-library/react';

describe('useBool', () => {
  it('should use initial value creator function', async () => {
    let value: boolean;
    const HookComponent: React.FunctionComponent<{ initialValue: boolean }> = ({
      initialValue
    }) => {
      [value] = useBool(() => initialValue);
      return <div />;
    };

    render(<HookComponent initialValue={true} />);
    expect(value!).toBe(true);

    render(<HookComponent initialValue={false} />);
    expect(value!).toBe(false);
  });

  it('change value when calling toggle()', () => {
    let value: boolean;
    let toggle: () => void = () => {};

    const HookComponent = () => {
      [value, toggle] = useBool(() => true);
      return <div />;
    };

    render(<HookComponent />);
    React.act(() => {
      toggle();
    });

    expect(value!).toBe(false);

    React.act(() => {
      toggle();
    });
    expect(value!).toBe(true);
  });

  it('change value when calling setValue()', () => {
    let value: boolean;
    let setValue: (value: boolean) => void = () => {};

    const HookComponent = () => {
      [value, , setValue] = useBool(() => true);
      return <div />;
    };

    render(<HookComponent />);
    React.act(() => {
      setValue(false);
    });

    expect(value!).toBe(false);

    React.act(() => {
      setValue(true);
    });
    expect(value!).toBe(true);
  });
});
