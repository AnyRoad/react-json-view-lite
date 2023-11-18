import * as React from 'react';
import { useBool, useComponentId } from './hooks';

import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

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
    act(() => {
      toggle();
    });

    expect(value!).toBe(false);

    act(() => {
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
    act(() => {
      setValue(false);
    });

    expect(value!).toBe(false);

    act(() => {
      setValue(true);
    });
    expect(value!).toBe(true);
  });
});

describe('useComponentId', () => {
  let id1 = '';
  let id1AfterFirstRender = '';

  let id2 = '';
  let id2AfterFirstRender = '';

  const HookComponent1 = ({ text }: { text: string }) => {
    id1 = useComponentId();
    return <div>{text}</div>;
  };

  const HookComponent2 = ({ text }: { text: string }) => {
    id2 = useComponentId();
    return <div>{text}</div>;
  };

  const { rerender: rerender1 } = render(<HookComponent1 text={'component1'} />);
  id1AfterFirstRender = id1;
  rerender1(<HookComponent1 text={'component1 second render'} />);

  const { rerender: rerender2 } = render(<HookComponent2 text={'component2'} />);
  id2AfterFirstRender = id2;
  rerender2(<HookComponent2 text={'component2 second render'} />);

  expect(id1).toBe(id1AfterFirstRender);
  expect(id2).toBe(id2AfterFirstRender);
  expect(id1).not.toBe(id2);
});
