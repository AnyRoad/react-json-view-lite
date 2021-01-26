import * as React from 'react';
import Benchmark, { BenchmarkType } from '@anyroad/react-component-benchmark';
import json from './hugeArray.json';

import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import Inspector from 'react-json-inspector';
import 'react-json-inspector/json-inspector.css';
import JSONTree from 'react-json-tree';
import ReactJson from 'react-json-view';
import Rjv from 'react-json-tree-viewer';

const propertiesByComponent = new Map<string, { component: any; props: Object }>();
propertiesByComponent.set('JsonView', {
  component: JsonView,
  props: { data: json }
});
propertiesByComponent.set('JSONPretty', {
  component: JSONPretty,
  props: { data: json }
});
propertiesByComponent.set('Inspector', {
  component: Inspector,
  props: { data: json, isExpanded: () => true }
});
propertiesByComponent.set('JSONTree', {
  component: JSONTree,
  props: { data: json, shouldExpandNode: () => true, collectionLimit: 20_000 }
});
propertiesByComponent.set('ReactJsonView', {
  component: ReactJson,
  props: {
    src: json,
    enableClipboard: false,
    displayObjectSize: false,
    displayDataTypes: false,
    groupArraysAfterLength: 20_000
  }
});
propertiesByComponent.set('ReactJsonTreeViewer', {
  component: Rjv,
  props: { data: json }
});

const componentNames = Array.from(propertiesByComponent.keys());

interface Props {}

interface State {
  benchmarkType: string;
  results: string;
  component: string;
}
// { [key: string]: string }
export default class Perf extends React.Component<Props, State> {
  state = {
    benchmarkType: BenchmarkType.MOUNT,
    results: '',
    component: 'JsonView'
  };

  _benchmarkRef: any;

  render() {
    const { benchmarkType } = this.state;
    const properties = propertiesByComponent.get(this.state.component) || {
      component: JsonView,
      props: { data: json }
    };

    return (
      <div>
        <button onClick={this._handleStart}>Run</button>
        <button onClick={() => this.setState({ results: '' })}>Reset</button>
        <select onChange={this._handleChangeType}>
          {Object.values(BenchmarkType).map((benchType) => (
            <option key={benchType} value={benchType}>
              {benchType}
            </option>
          ))}
        </select>
        <select onChange={this._handleChangeComponent} value={this.state.component}>
          {componentNames.map((component) => (
            <option key={component} value={component}>
              {component}
            </option>
          ))}
        </select>
        <Benchmark
          component={properties.component}
          componentProps={properties.props}
          onComplete={this._handleComplete}
          ref={this._setBenchRef}
          samples={5}
          timeout={100000}
          type={benchmarkType}
        />
        <pre>{this.state.results}</pre>
      </div>
    );
  }

  _handleStart = () => {
    this._benchmarkRef.start();
  };

  _handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ benchmarkType: event.target.value });
  };

  _handleChangeComponent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ component: event.target.value });
  };

  _handleComplete = (results: any) => {
    delete results.samples;
    this.setState({
      results:
        this.state.results + '\n\n' + this.state.component + '\n' + JSON.stringify(results, null, 2)
    });
  };

  _setBenchRef = (ref: any) => {
    this._benchmarkRef = ref;
  };
}
