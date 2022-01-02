import * as React from 'react';
import DataRender from './DataRenderer';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const commonProps = {
  lastElement: false,
  level: 0,
  style: {},
  shouldInitiallyExpand: () => true
};

describe('DataRender', () => {
  it('should render booleans: true', () => {
    render(<DataRender {...commonProps} value={{ test: true }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should render booleans: false', () => {
    render(<DataRender {...commonProps} value={{ test: false }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('should render strings', () => {
    render(<DataRender {...commonProps} value={{ test: 'string' }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText(`"string"`)).toBeInTheDocument();
  });

  it('should render numbers', () => {
    render(<DataRender {...commonProps} value={{ test: 42 }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should render nulls', () => {
    render(<DataRender {...commonProps} value={{ test: null }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('null')).toBeInTheDocument();
  });

  it('should render undefineds', () => {
    render(<DataRender {...commonProps} value={{ test: undefined }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('undefined')).toBeInTheDocument();
  });

  it('should render unknown types', () => {
    render(<DataRender {...commonProps} value={{ test: Symbol('2020') }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText(/2020/)).toBeInTheDocument();
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
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('should render nested objects collapsed', () => {
    render(
      <DataRender
        {...commonProps}
        value={{ obj: { test: 123 } }}
        shouldInitiallyExpand={(level) => level === 0}
      />
    );
    expect(screen.getByText(/obj/)).toBeInTheDocument();
    expect(screen.queryByText(/test/)).not.toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });

  it('should render nested objects collapsed and expand it once property changed', () => {
    const { rerender } = render(
      <DataRender
        {...commonProps}
        value={{ obj: { test: 123 } }}
        shouldInitiallyExpand={(level) => level === 0}
      />
    );
    expect(screen.getByText(/obj/)).toBeInTheDocument();
    expect(screen.queryByText(/test/)).not.toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();

    rerender(
      <DataRender
        {...commonProps}
        value={{ obj: { test: 123 } }}
        shouldInitiallyExpand={() => true}
      />
    );
    expect(screen.getByText(/obj/)).toBeInTheDocument();
    expect(screen.queryByText(/test/)).toBeInTheDocument();
    expect(screen.queryByText('123')).toBeInTheDocument();
  });

  it('should render nested arrays collapsed', () => {
    render(
      <DataRender
        {...commonProps}
        value={{ test: [123] }}
        shouldInitiallyExpand={(level) => level === 0}
      />
    );
    expect(screen.queryByText(/test/)).toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });

  it('should render nested arrays collapsed and expand it once property changed', () => {
    const { rerender } = render(
      <DataRender
        {...commonProps}
        value={{ test: [123] }}
        shouldInitiallyExpand={(level) => level === 0}
      />
    );
    expect(screen.queryByText(/test/)).toBeInTheDocument();
    expect(screen.queryByText('123')).not.toBeInTheDocument();

    rerender(
      <DataRender {...commonProps} value={{ test: [123] }} shouldInitiallyExpand={() => true} />
    );
    expect(screen.queryByText(/test/)).toBeInTheDocument();
    expect(screen.queryByText('123')).toBeInTheDocument();
  });

  it('should render top arrays collapsed', () => {
    render(<DataRender {...commonProps} value={[123]} shouldInitiallyExpand={() => false} />);
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });

  it('should collapse ojbects', () => {
    render(<DataRender {...commonProps} value={{ test: true }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('\u25BE'));
    expect(screen.queryByText(/test/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('\u25B8'));
    expect(screen.getByText(/test/)).toBeInTheDocument();
  });

  it('should collapse arrays', () => {
    render(<DataRender {...commonProps} value={[1, 2, 3]} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('\u25BE'));
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('\u25B8'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should expand objects by clicking on', () => {
    render(
      <DataRender {...commonProps} value={{ test: true }} shouldInitiallyExpand={() => false} />
    );
    expect(screen.getByText(/.../)).toBeInTheDocument();
    expect(screen.queryByText(/test/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('...'));
    expect(screen.getByText(/test/)).toBeInTheDocument();
  });

  it('should expand arrays by clicking on', () => {
    render(
      <DataRender {...commonProps} value={['test', 'array']} shouldInitiallyExpand={() => false} />
    );
    expect(screen.getByText(/.../)).toBeInTheDocument();
    expect(screen.queryByText(/test/)).not.toBeInTheDocument();
    expect(screen.queryByText(/array/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('...'));
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText(/array/)).toBeInTheDocument();
  });
});
