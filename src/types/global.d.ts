import { SnackbarProvider as SnackbarProviderBase } from 'notistack';

export declare global {
    var pluginLib = any;
}

declare module '*.json' {
    const dataValue: any;
    export default dataValue;
}

declare module 'notistack' {
    export interface SnackbarProvider extends SnackbarProviderBase {
        render: any;
        context: any;
        setState: any;
        forceUpdate: any;
        props: any;
        state: any;
        refs: any;
    }
}

type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
