import { PaletteColorOptions, Theme } from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';

export declare global {
  interface DefaultTheme extends Theme {}
  interface Window {
    navigation: {
      canGoBack: boolean;
      back: () => Promise<void>;
    };
  }
  interface Object {
    /**
     * Determines whether an object has a property with the specified name.
     * @param o An object.
     * @param v A property name.
     */
    hasOwn(o: object, v: PropertyKey): boolean;
  }
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

declare module '@mui/material/styles/createPalette.d' {
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

type ValueOf<T> = T[keyof T];
