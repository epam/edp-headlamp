export declare global {
    var pluginLib = any;
}

declare module '*.json' {
    const dataValue: any;
    export default dataValue;
}

type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
