import * as React from 'react';
import { JsonView, defaultStyles, allExpanded, collapseAllNested } from '.';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StyleProps } from './DataRenderer';

describe('JsonView', () => {
  it('should render object', () => {
    render(<JsonView style={defaultStyles} data={{ test: true }} />);
    expect(screen.getByText(/test/)).toBeDefined();
    expect(screen.getByText('true')).toBeDefined();
  });

  it('should render object with default styles', () => {
    render(<JsonView data={{ test: true }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should render object with incomplete style object', () => {
    render(<JsonView style={{} as StyleProps} data={{ test: true }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should render object and call shouldExpandNode only once', () => {
    let invoked = 0;
    const shouldExpandNode = () => {
      ++invoked;
      return true;
    };
    render(<JsonView data={{ test: true }} shouldExpandNode={shouldExpandNode} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
    expect(invoked).toBe(1);
  });

  it('allExpanded should always return true', () => {
    expect(allExpanded()).toBeTruthy();
  });

  it('collapseAllNested should always return true for 0', () => {
    expect(collapseAllNested(0)).toBeTruthy();
    expect(collapseAllNested(1)).toBeFalsy();
    expect(collapseAllNested(2)).toBeFalsy();
    expect(collapseAllNested(3)).toBeFalsy();
  });

  it('should go to next node on ArrowDown, prev node with ArrowUp, tabindex should change', () => {
    render(<JsonView data={{ test: [1, 2, 3], test2: [1, 2, 3] }} />);
    const buttons = screen.getAllByRole('button', { hidden: true });
    expect(buttons).toHaveLength(3);

    expect(buttons[0].tabIndex).toEqual(0);
    expect(buttons[1].tabIndex).toEqual(-1);
    expect(buttons[2].tabIndex).toEqual(-1);

    buttons[0].focus();
    expect(buttons[0]).toHaveFocus();

    fireEvent.keyDown(buttons[0], { key: 'ArrowDown', code: 'ArrowDown' });
    expect(buttons[0]).not.toHaveFocus();
    expect(buttons[1]).toHaveFocus();
    expect(buttons[2]).not.toHaveFocus();
    expect(buttons[0].tabIndex).toEqual(-1);
    expect(buttons[1].tabIndex).toEqual(0);
    expect(buttons[2].tabIndex).toEqual(-1);

    fireEvent.keyDown(buttons[1], { key: 'ArrowUp', code: 'ArrowUp' });
    expect(buttons[0]).toHaveFocus();
    expect(buttons[1]).not.toHaveFocus();
    expect(buttons[2]).not.toHaveFocus();
    expect(buttons[0].tabIndex).toEqual(0);
    expect(buttons[1].tabIndex).toEqual(-1);
    expect(buttons[2].tabIndex).toEqual(-1);
  });
});
