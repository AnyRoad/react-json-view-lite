import * as React from 'react';
import DataRender, { JsonRenderProps } from './DataRenderer';
import { allExpanded, collapseAllNested, defaultStyles } from './index';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const commonProps: JsonRenderProps<any> = {
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

const collapseAll = () => false;

const testButtonsCollapsed = () => {
  const buttons = screen.getAllByRole('button', { hidden: true });
  expect(buttons.length).toBe(2);
  expect(buttons[0]).toHaveClass('expand-icon-light');
  expect(buttons[1]).toHaveClass('collapsed-content-light');
  return buttons;
};

const testButtonsExpanded = () => {
  const buttons = screen.getAllByRole('button', { hidden: true });
  expect(buttons.length).toBe(1);
  expect(buttons[0]).toHaveClass('collapse-icon-light');
  return buttons;
};

const testButtonsIfEmpty = () => {
  expect(() => {
    screen.getAllByRole('button', { hidden: true });
  }).toThrow();
};

const testClickableNodeCollapsed = () => {
  const buttons = screen.getAllByRole('button', { hidden: true });
  expect(buttons.length).toBe(4);
  expect(buttons[0]).toHaveClass('collapse-icon-light');
  expect(buttons[1]).toHaveClass('expand-icon-light');
  expect(buttons[2]).toHaveClass('clickable-label-light');
  expect(buttons[3]).toHaveClass('collapsed-content-light');
  return buttons;
};

describe('DataRender', () => {
  it('should render booleans: true', () => {
    render(<DataRender {...commonProps} value={{ test: true }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should render booleans: false', () => {
    render(<DataRender {...commonProps} value={{ test: false }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('should render strings', () => {
    render(<DataRender {...commonProps} value={{ test: 'string' }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText(`"string"`)).toBeInTheDocument();
  });

  it('should render strings without quotes', () => {
    render(
      <DataRender
        {...commonProps}
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
      <DataRender
        {...commonProps}
        style={{ ...defaultStyles, noQuotesForStringValues: undefined }}
        value={{ test: 'string' }}
      />
    );
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText(`"string"`)).toBeInTheDocument();
  });

  it('should render field names without quotes if quotesForFieldNames is undefined', () => {
    render(
      <DataRender
        {...commonProps}
        style={{ ...defaultStyles, quotesForFieldNames: undefined }}
        value={{ test: 'string' }}
      />
    );
    expect(screen.getByText(/test:/)).toBeInTheDocument();
  });

  it('should render field names with quotes if quotesForFieldNames is true', () => {
    render(
      <DataRender
        {...commonProps}
        style={{ ...defaultStyles, quotesForFieldNames: true }}
        value={{ test: 'string' }}
      />
    );
    expect(screen.getByText(/"test":/)).toBeInTheDocument();
  });

  it('should render numbers', () => {
    render(<DataRender {...commonProps} value={{ test: 42 }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should render bigints', () => {
    render(<DataRender {...commonProps} value={{ test: BigInt(42) }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('42n')).toBeInTheDocument();
  });

  it('should render dates', () => {
    render(<DataRender {...commonProps} value={{ test: new Date(0) }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('1970-01-01T00:00:00.000Z')).toBeInTheDocument();
  });

  it('should render nulls', () => {
    render(<DataRender {...commonProps} value={{ test: null }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('null')).toBeInTheDocument();
  });

  it('should render undefineds', () => {
    render(<DataRender {...commonProps} value={{ test: undefined }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('undefined')).toBeInTheDocument();
  });

  it('should render unknown types', () => {
    render(<DataRender {...commonProps} value={{ test: Symbol('2020') }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText(/2020/)).toBeInTheDocument();
  });

  it('should render object with empty key string', () => {
    render(<DataRender {...commonProps} value={{ '': 'empty key' }} />);
    expect(screen.getByText(/"":/)).toBeInTheDocument();
    expect(screen.getByText(/empty key/)).toBeInTheDocument();
  });

  it('should render empty objects', () => {
    render(<DataRender {...commonProps} value={{}} />);
    expect(screen.getByText('{')).toBeInTheDocument();
    expect(screen.getByText('}')).toBeInTheDocument();
  });

  it('should render nested empty objects', () => {
    render(<DataRender {...commonProps} value={{ nested: [] }} />);
    expect(screen.getByText('nested:')).toBeInTheDocument();
    expect(screen.getByText('{')).toBeInTheDocument();
    expect(screen.getByText('}')).toBeInTheDocument();
  });

  it('should not expand empty objects', () => {
    render(<DataRender {...commonProps} value={{}} shouldExpandNode={allExpanded} />);
    testButtonsIfEmpty();
  });

  it('should not collapse empty objects', () => {
    render(<DataRender {...commonProps} value={{}} shouldExpandNode={collapseAll} />);
    testButtonsIfEmpty();
  });

  it('should render empty arrays', () => {
    render(<DataRender {...commonProps} value={[]} />);
    expect(screen.getByText('[')).toBeInTheDocument();
    expect(screen.getByText(']')).toBeInTheDocument();
  });

  it('should render nested empty arrays', () => {
    render(<DataRender {...commonProps} value={{ nested: [] }} />);
    expect(screen.getByText('nested:')).toBeInTheDocument();
    expect(screen.getByText('[')).toBeInTheDocument();
    expect(screen.getByText(']')).toBeInTheDocument();
  });

  it('should not expand empty arrays', () => {
    render(<DataRender {...commonProps} value={[]} shouldExpandNode={allExpanded} />);
    testButtonsIfEmpty();
  });

  it('should not collapse empty arrays', () => {
    render(<DataRender {...commonProps} value={[]} shouldExpandNode={collapseAll} />);
    testButtonsIfEmpty();
  });

  it('should render arrays', () => {
    render(<DataRender {...commonProps} value={[1, 2, 3]} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render arrays with key', () => {
    render(<DataRender {...commonProps} value={{ array: [1, 2, 3] }} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render nested objects', () => {
    render(<DataRender {...commonProps} value={{ obj: { test: 123 } }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('should render nested objects collapsed', () => {
    render(
      <DataRender
        {...commonProps}
        value={{ obj: { test: 123 } }}
        shouldExpandNode={collapseAllNested}
      />
    );
    expect(screen.getByText(/obj/)).toBeInTheDocument();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });

  it('should render nested objects collapsed and expand it once property changed', () => {
    const { rerender } = render(
      <DataRender
        {...commonProps}
        value={{ obj: { test: 123 } }}
        shouldExpandNode={collapseAllNested}
      />
    );
    expect(screen.getByText(/obj/)).toBeInTheDocument();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();

    rerender(
      <DataRender {...commonProps} value={{ obj: { test: 123 } }} shouldExpandNode={allExpanded} />
    );
    expect(screen.getByText(/obj/)).toBeInTheDocument();
    expect(screen.queryByText(/test:/)).toBeInTheDocument();
    expect(screen.queryByText('123')).toBeInTheDocument();
  });

  it('should render nested arrays collapsed', () => {
    render(
      <DataRender {...commonProps} value={{ test: [123] }} shouldExpandNode={collapseAllNested} />
    );
    expect(screen.queryByText(/test:/)).toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });

  it('should render nested arrays collapsed and expand it once property changed', () => {
    const { rerender } = render(
      <DataRender {...commonProps} value={{ test: [123] }} shouldExpandNode={collapseAllNested} />
    );
    expect(screen.queryByText(/test:/)).toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();

    rerender(
      <DataRender {...commonProps} value={{ test: [123] }} shouldExpandNode={allExpanded} />
    );
    expect(screen.queryByText(/test:/)).toBeInTheDocument();
    expect(screen.queryByText('123')).toBeInTheDocument();
  });

  it('should render top arrays collapsed', () => {
    render(<DataRender {...commonProps} value={[123]} shouldExpandNode={collapseAll} />);
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });

  it('should collapse and expand objects by clicking on icon', () => {
    render(<DataRender {...commonProps} value={{ test: true }} />);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    let buttons = testButtonsExpanded();
    fireEvent.click(buttons[0]);
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    buttons = testButtonsCollapsed();
    fireEvent.click(buttons[0]);
    expect(screen.getByText(/test:/)).toBeInTheDocument();
  });

  it('should collapse and expand objects by clicking on node', () => {
    render(
      <DataRender
        {...{ ...commonProps, clickToExpandNode: true }}
        value={{ test: { child: true } }}
        shouldExpandNode={collapseAll}
      />
    );

    // open the 'test' node by clicking the icon
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/child/)).not.toBeInTheDocument();
    const buttons = testButtonsCollapsed();
    fireEvent.click(buttons[0]);
    testClickableNodeCollapsed();
    expect(screen.getByText(/test:/)).toBeInTheDocument();
    expect(screen.queryByText(/child/)).not.toBeInTheDocument();
    fireEvent.click(buttons[0]);
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/child/)).not.toBeInTheDocument();
  });

  it('should expand objects by clicking on collapsed content', () => {
    render(<DataRender {...commonProps} value={{ test: true }} shouldExpandNode={collapseAll} />);
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    const buttons = testButtonsCollapsed();
    fireEvent.click(buttons[1]);
    testButtonsExpanded();
    expect(screen.getByText(/test:/)).toBeInTheDocument();
  });

  it('should collapse and expand arrays by clicking on icon', () => {
    render(<DataRender {...commonProps} value={[1, 2, 3]} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    let buttons = testButtonsExpanded();
    fireEvent.click(buttons[0]);
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    buttons = testButtonsCollapsed();
    fireEvent.click(buttons[0]);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should expand arrays by clicking on collapsed content', () => {
    render(<DataRender {...commonProps} value={[1, 2, 3]} shouldExpandNode={collapseAll} />);
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    const buttons = testButtonsCollapsed();
    fireEvent.click(buttons[1]);
    testButtonsExpanded();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should expand objects by pressing Spacebar on icon', () => {
    render(<DataRender {...commonProps} value={{ test: true }} shouldExpandNode={collapseAll} />);
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    const buttons = testButtonsCollapsed();
    fireEvent.keyDown(buttons[0], { key: ' ', code: 'Space' });
    testButtonsExpanded();
    expect(screen.getByText(/test:/)).toBeInTheDocument();
  });

  it('should not expand objects by pressing other keys on icon', () => {
    render(<DataRender {...commonProps} value={{ test: true }} shouldExpandNode={collapseAll} />);
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    const buttons = testButtonsCollapsed();
    fireEvent.keyDown(buttons[0], { key: 'Enter', code: 'Enter' });
    testButtonsCollapsed();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
  });

  it('should expand arrays by pressing Spacebar on icon', () => {
    render(
      <DataRender {...commonProps} value={['test', 'array']} shouldExpandNode={collapseAll} />
    );
    const buttons = testButtonsCollapsed();
    expect(screen.queryByText(/test/)).not.toBeInTheDocument();
    expect(screen.queryByText(/array/)).not.toBeInTheDocument();
    fireEvent.keyDown(buttons[0], { key: ' ', code: 'Space' });
    testButtonsExpanded();
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText(/array/)).toBeInTheDocument();
  });

  it('should not expand arrays by pressing other keys on icon', () => {
    render(
      <DataRender {...commonProps} value={['test', 'array']} shouldExpandNode={collapseAll} />
    );
    const buttons = testButtonsCollapsed();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/array/)).not.toBeInTheDocument();
    fireEvent.keyDown(buttons[0], { key: 'Enter', code: 'Enter' });
    testButtonsCollapsed();
    expect(screen.queryByText(/test:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/array/)).not.toBeInTheDocument();
  });
});
