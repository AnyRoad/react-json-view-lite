import * as React from 'react';
import DataRender, { JsonRenderProps } from './DataRenderer';
import { allExpanded, collapseAllNested, defaultStyles } from './index';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const commonProps: Omit<JsonRenderProps<any>, 'outerRef'> = {
  lastElement: false,
  level: 0,
  style: {
    container: '',
    basicChildStyle: '',
    label: '',
    clickableLabel: defaultStyles.clickableLabel,
    nullValue: '',
    undefinedValue: '',
    numberValue: '',
    stringValue: '',
    booleanValue: '',
    otherValue: '',
    punctuation: '',
    expandIcon: defaultStyles.expandIcon,
    collapseIcon: defaultStyles.collapseIcon,
    collapsedContent: defaultStyles.collapsedContent,
    noQuotesForStringValues: false
  },
  shouldExpandNode: allExpanded,
  clickToExpandNode: false,
  value: undefined,
  field: undefined
};

const WrappedDataRenderer = (testProps: Partial<JsonRenderProps<any>>) => {
  const ref = React.useRef(null);
  return (
    <div ref={ref}>
      <DataRender outerRef={ref} {...commonProps} {...testProps} />
    </div>
  );
};

const NoRefWrappedDataRenderer = (testProps: Partial<JsonRenderProps<any>>) => {
  const ref = React.useRef(null);
  return (
    <div>
      <DataRender outerRef={ref} {...commonProps} {...testProps} />
    </div>
  );
};

const collapseAll = () => false;

const testButtonsCollapsed = () => {
  const buttons = screen.getAllByRole('button', { hidden: true });
  expect(buttons).toHaveLength(1);
  expect(buttons[0]).toHaveClass('expand-icon-light');
  expect(buttons[0]).not.toHaveClass('collapse-icon-light');
  expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
  return buttons;
};

const testButtonsExpanded = () => {
  const buttons = screen.getAllByRole('button', { hidden: true });
  expect(buttons).toHaveLength(1);
  expect(buttons[0]).toHaveClass('collapse-icon-light');
  expect(buttons[0]).not.toHaveClass('expand-icon-light');
  expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  return buttons;
};

const testButtonsIfEmpty = () => {
  expect(() => {
    screen.getAllByRole('button', { hidden: true });
  }).toThrow();
};

describe('DataRender', () => {
  it('should render booleans: true', () => {
    render(<WrappedDataRenderer value={{ test: true }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should render booleans: false', () => {
    render(<WrappedDataRenderer value={{ test: false }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('should render strings', () => {
    render(<WrappedDataRenderer value={{ test: 'string' }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText(`"string"`)).toBeInTheDocument();
  });

  it('should render strings without quotes', () => {
    render(
      <WrappedDataRenderer
        style={{ ...defaultStyles, noQuotesForStringValues: true }}
        value={{ test: 'string' }}
      />
    );
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText(`string`)).toBeInTheDocument();
    expect(screen.queryByText(`"string"`)).not.toBeInTheDocument();
  });

  it('should render strings with quotes if noQuotesForStringValues is undefined', () => {
    render(
      <WrappedDataRenderer
        style={{ ...defaultStyles, noQuotesForStringValues: undefined }}
        value={{ test: 'string' }}
      />
    );
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText(`"string"`)).toBeInTheDocument();
  });

  it('should render field names without quotes if quotesForFieldNames is undefined', () => {
    render(
      <WrappedDataRenderer
        style={{ ...defaultStyles, quotesForFieldNames: undefined }}
        value={{ test: 'string' }}
      />
    );
    expect(screen.getByText(/test:/)).toBeInTheDocument();
  });

  it('should render field names with quotes if quotesForFieldNames is true', () => {
    render(
      <WrappedDataRenderer
        style={{ ...defaultStyles, quotesForFieldNames: true }}
        value={{ test: 'string' }}
      />
    );
    expect(screen.getByText(/"test":/)).toBeInTheDocument();
  });

  it('should render numbers', () => {
    render(<WrappedDataRenderer value={{ test: 42 }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should render bigints', () => {
    render(<WrappedDataRenderer value={{ test: BigInt(42) }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('42n')).toBeInTheDocument();
  });

  it('should render dates', () => {
    render(<WrappedDataRenderer value={{ test: new Date(0) }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('1970-01-01T00:00:00.000Z')).toBeInTheDocument();
  });

  it('should render nulls', () => {
    render(<WrappedDataRenderer value={{ test: null }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('null')).toBeInTheDocument();
  });

  it('should render undefineds', () => {
    render(<WrappedDataRenderer value={{ test: undefined }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('undefined')).toBeInTheDocument();
  });

  it('should render unknown types', () => {
    render(<WrappedDataRenderer value={{ test: Symbol('2020') }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText(/2020/)).toBeInTheDocument();
  });

  it('should render object with empty key string', () => {
    render(<WrappedDataRenderer value={{ '': 'empty key' }} />);
    expect(screen.getByText(/"":/)).toBeInTheDocument();
    expect(screen.getByText(/empty key/)).toBeInTheDocument();
  });

  it('should render empty objects', () => {
    render(<WrappedDataRenderer value={{}} />);
    expect(screen.getByText('{')).toBeInTheDocument();
    expect(screen.getByText('}')).toBeInTheDocument();
  });

  it('should render nested empty objects', () => {
    render(<WrappedDataRenderer value={{ nested: [] }} />);
    expect(screen.getByText('nested:')).toBeInTheDocument();
    expect(screen.getByText('{')).toBeInTheDocument();
    expect(screen.getByText('}')).toBeInTheDocument();
  });

  it('should not expand empty objects', () => {
    render(<WrappedDataRenderer value={{}} shouldExpandNode={allExpanded} />);
    testButtonsIfEmpty();
  });

  it('should not collapse empty objects', () => {
    render(<WrappedDataRenderer value={{}} shouldExpandNode={collapseAll} />);
    testButtonsIfEmpty();
  });

  it('should render empty arrays', () => {
    render(<WrappedDataRenderer value={[]} />);
    expect(screen.getByText('[')).toBeInTheDocument();
    expect(screen.getByText(']')).toBeInTheDocument();
  });

  it('should render nested empty arrays', () => {
    render(<WrappedDataRenderer value={{ nested: [] }} />);
    expect(screen.getByText('nested:')).toBeInTheDocument();
    expect(screen.getByText('[')).toBeInTheDocument();
    expect(screen.getByText(']')).toBeInTheDocument();
  });

  it('should not expand empty arrays', () => {
    render(<WrappedDataRenderer value={[]} shouldExpandNode={allExpanded} />);
    testButtonsIfEmpty();
  });

  it('should not collapse empty arrays', () => {
    render(<WrappedDataRenderer value={[]} shouldExpandNode={collapseAll} />);
    testButtonsIfEmpty();
  });

  it('should render arrays', () => {
    render(<WrappedDataRenderer value={[1, 2, 3]} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render arrays with key', () => {
    render(<WrappedDataRenderer value={{ array: [1, 2, 3] }} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render nested objects', () => {
    render(<WrappedDataRenderer value={{ obj: { test: 123 } }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('should render nested objects collapsed', () => {
    render(
      <WrappedDataRenderer value={{ obj: { test: 123 } }} shouldExpandNode={collapseAllNested} />
    );
    expect(screen.getByText(/obj/)).toBeInTheDocument();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });

  it('should render nested objects collapsed and expand it once property changed', () => {
    const { rerender } = render(
      <WrappedDataRenderer value={{ obj: { test: 123 } }} shouldExpandNode={collapseAllNested} />
    );
    expect(screen.getByText(/obj/)).toBeInTheDocument();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();

    rerender(<WrappedDataRenderer value={{ obj: { test: 123 } }} shouldExpandNode={allExpanded} />);
    expect(screen.getByText(/obj/)).toBeInTheDocument();
    expect(screen.queryByText(/test:/)).toBeInTheDocument();
    expect(screen.queryByText('123')).toBeInTheDocument();
  });

  it('should render nested arrays collapsed', () => {
    render(<WrappedDataRenderer value={{ test: [123] }} shouldExpandNode={collapseAllNested} />);
    expect(screen.queryByText(/test:/)).toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });

  it('should render nested arrays collapsed and expand it once property changed', () => {
    const { rerender } = render(
      <WrappedDataRenderer value={{ test: [123] }} shouldExpandNode={collapseAllNested} />
    );
    expect(screen.queryByText(/test:/)).toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();

    rerender(<WrappedDataRenderer value={{ test: [123] }} shouldExpandNode={allExpanded} />);
    expect(screen.queryByText(/test:/)).toBeInTheDocument();
    expect(screen.queryByText('123')).toBeInTheDocument();
  });

  it('should render top arrays collapsed', () => {
    render(<WrappedDataRenderer value={[123]} shouldExpandNode={collapseAll} />);
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });

  it('should collapse and expand objects by clicking on icon', () => {
    render(<WrappedDataRenderer value={{ test: true }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    let buttons = testButtonsExpanded();
    fireEvent.click(buttons[0]);
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    buttons = testButtonsCollapsed();
    fireEvent.click(buttons[0]);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
  });

  it('should collapse and expand objects by clicking on node', () => {
    const { container } = render(
      <WrappedDataRenderer
        clickToExpandNode={true}
        value={{ test: { child: true } }}
        shouldExpandNode={collapseAll}
      />
    );

    // open the 'test' node by clicking the icon
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/child/)).not.toBeInTheDocument();
    let buttons = testButtonsCollapsed();
    fireEvent.click(buttons[0]);

    buttons = screen.getAllByRole('button', { hidden: true });
    expect(buttons.length).toBe(2);
    expect(buttons[0]).toHaveClass('collapse-icon-light');
    expect(buttons[1]).toHaveClass('expand-icon-light');
    expect(buttons[0].tabIndex).toEqual(0);
    expect(buttons[1].tabIndex).toEqual(-1);
    expect(container.getElementsByClassName('clickable-label-light')).toHaveLength(1);
    expect(container.getElementsByClassName('collapsed-content-light')).toHaveLength(1);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.queryByText(/child/)).not.toBeInTheDocument();
    fireEvent.click(buttons[0]);
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/child/)).not.toBeInTheDocument();
  });

  it('should expand objects by clicking on collapsed content', () => {
    const { container } = render(
      <WrappedDataRenderer value={{ test: true }} shouldExpandNode={collapseAll} />
    );
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    testButtonsCollapsed();
    const collapsedContent = container.getElementsByClassName(commonProps.style.collapsedContent);
    fireEvent.click(collapsedContent[0]);
    testButtonsExpanded();
    expect(screen.getByText(/test:/)).toBeInTheDocument();
  });

  it('should collapse and expand arrays by clicking on icon', () => {
    render(<WrappedDataRenderer value={[1, 2, 3]} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    let buttons = testButtonsExpanded();
    fireEvent.click(buttons[0]);
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    buttons = testButtonsCollapsed();
    fireEvent.click(buttons[0]);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should expand arrays by clicking on collapsed content', () => {
    const { container } = render(
      <WrappedDataRenderer value={[1, 2, 3]} shouldExpandNode={collapseAll} />
    );
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    testButtonsCollapsed();
    const collapsedContent = container.getElementsByClassName(commonProps.style.collapsedContent);
    fireEvent.click(collapsedContent[0]);
    testButtonsExpanded();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should handle node click event without outerRef value', () => {
    const { container } = render(
      <NoRefWrappedDataRenderer value={[1, 2, 3]} shouldExpandNode={collapseAll} />
    );
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    testButtonsCollapsed();
    const collapsedContent = container.getElementsByClassName(commonProps.style.collapsedContent);
    fireEvent.click(collapsedContent[0]);
    testButtonsExpanded();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should handle node click without current tabIndex=0 element', () => {
    const { container } = render(
      <WrappedDataRenderer value={[1, 2, 3]} shouldExpandNode={collapseAll} level={1} />
    );
    expect(container.querySelectorAll('[role=button][tabindex="0"]')).toHaveLength(0);
    const collapsedContent = container.getElementsByClassName(commonProps.style.collapsedContent);
    fireEvent.click(collapsedContent[0]);
    testButtonsExpanded();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should expand objects by pressing ArrowRight on icon, collapse objects by pressing ArrowLeft on icon', () => {
    render(<WrappedDataRenderer value={{ test: true }} shouldExpandNode={collapseAll} />);

    const buttons = testButtonsCollapsed();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();

    fireEvent.keyDown(buttons[0], { key: 'ArrowRight', code: 'ArrowRight' });
    testButtonsExpanded();
    expect(screen.getByText(/test:/)).toBeInTheDocument();

    fireEvent.keyDown(buttons[0], { key: 'ArrowLeft', code: 'ArrowLeft' });
    testButtonsCollapsed();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
  });

  it('should not expand objects by pressing other keys on icon', () => {
    render(<WrappedDataRenderer value={{ test: true }} shouldExpandNode={collapseAll} />);
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    const buttons = testButtonsCollapsed();
    fireEvent.keyDown(buttons[0], { key: 'Enter', code: 'Enter' });
    fireEvent.keyDown(buttons[0], { key: ' ', code: 'Space' });
    testButtonsCollapsed();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
  });

  it('should expand arrays by pressing ArrowRight on icon, collapse arrays by pressing ArrowLeft on icon', () => {
    render(<WrappedDataRenderer value={['test', 'array']} shouldExpandNode={collapseAll} />);

    const buttons = testButtonsCollapsed();
    expect(screen.queryByText(/test/)).not.toBeInTheDocument();
    expect(screen.queryByText(/array/)).not.toBeInTheDocument();

    fireEvent.keyDown(buttons[0], { key: 'ArrowRight', code: 'ArrowRight' });
    testButtonsExpanded();
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText(/array/)).toBeInTheDocument();

    fireEvent.keyDown(buttons[0], { key: 'ArrowLeft', code: 'ArrowLeft' });
    testButtonsCollapsed();
    expect(screen.queryByText(/test/)).not.toBeInTheDocument();
    expect(screen.queryByText(/array/)).not.toBeInTheDocument();
  });

  it('should not expand arrays by pressing other keys on icon', () => {
    render(<WrappedDataRenderer value={['test', 'array']} shouldExpandNode={collapseAll} />);
    const buttons = testButtonsCollapsed();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/array/)).not.toBeInTheDocument();
    fireEvent.keyDown(buttons[0], { key: 'Enter', code: 'Enter' });
    fireEvent.keyDown(buttons[0], { key: ' ', code: 'Space' });
    testButtonsCollapsed();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/array/)).not.toBeInTheDocument();
  });

  it('only one item with tabindex=0 if level=0, none if level>0', () => {
    const data = { test: [1, 2, 3], test2: [1, 2, 3], test3: { a: 'b', c: { d: '1', a: 2 } } };

    const { container, rerender } = render(<WrappedDataRenderer value={data} level={0} />);
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);

    rerender(<WrappedDataRenderer value={data} level={1} />);
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(0);
  });

  it('maintain only one item with tabindex=0 after pressing up and down arrow keys', () => {
    const data = { test: [1, 2, 3], test2: [1, 2, 3], test3: { a: 'b', c: { d: '1', a: 2 } } };

    const { container } = render(<WrappedDataRenderer value={data} level={0} />);
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);

    const buttons = screen.getAllByRole('button', { hidden: true });
    fireEvent.keyDown(buttons[0], { key: 'ArrowDown', code: 'ArrowDown' });
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    fireEvent.keyDown(buttons[1], { key: 'ArrowDown', code: 'ArrowDown' });
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);

    fireEvent.keyDown(buttons[1], { key: 'ArrowUp', code: 'ArrowUp' });
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    fireEvent.keyDown(buttons[0], { key: 'ArrowUp', code: 'ArrowUp' });
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
  });

  it('maintain only one item with tabindex=0 after pressing up and down arrow keys without current element', () => {
    const data = { test: [1, 2, 3], test2: [1, 2, 3], test3: { a: 'b', c: { d: '1', a: 2 } } };

    const { container } = render(<WrappedDataRenderer value={data} level={1} />);

    const buttons = screen.getAllByRole('button', { hidden: true });
    fireEvent.keyDown(buttons[0], { key: 'ArrowDown', code: 'ArrowDown' });
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(0);
  });

  it('handle pressing up and down arrow keys without outer ref', () => {
    const data = { test: [1, 2, 3], test2: [1, 2, 3], test3: { a: 'b', c: { d: '1', a: 2 } } };

    const { container } = render(<NoRefWrappedDataRenderer value={data} level={0} />);
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);

    const buttons = screen.getAllByRole('button', { hidden: true });
    fireEvent.keyDown(buttons[0], { key: 'ArrowDown', code: 'ArrowDown' });
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    fireEvent.keyDown(buttons[1], { key: 'ArrowDown', code: 'ArrowDown' });
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);

    fireEvent.keyDown(buttons[1], { key: 'ArrowUp', code: 'ArrowUp' });
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    fireEvent.keyDown(buttons[0], { key: 'ArrowUp', code: 'ArrowUp' });
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
  });
});
