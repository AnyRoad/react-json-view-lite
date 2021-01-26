/// <reference types="react-scripts" />

declare module '@anyroad/react-component-benchmark' {
    export const BenchmarkType: { [key: string]: string };
    const Benchmark: React.ComponentClass<any, any>
    export default Benchmark;
};

declare module 'react-json-inspector';

