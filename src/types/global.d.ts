import { PaletteColorOptions, Theme } from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';

export declare global {
    interface DefaultTheme extends Theme {}
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

declare module '@material-ui/core/styles/createPalette.d' {
    interface Palette {
        success: PaletteColor;
        sidebarLink: {
            [propName: string]: string;
        };
        [propName: string]: any;
    }
    interface PaletteOptions {
        success?: PaletteColorOptions;
        sidebarLink: {
            [propName: string]: string;
        };
        [propName: string]: any;
    }
}
