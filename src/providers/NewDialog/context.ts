import React from 'react';

interface DialogEntry<Props = {}> {
  Component: React.ComponentType<DialogProps<Props>>;
  props: Props;
}

export type DialogProviderState = {
  [key: string]: DialogEntry;
};

export interface DialogProps<Props> {
  props: Props;
  state: {
    open: boolean;
    closeDialog: () => void;
    openDialog: () => void;
  };
}

export const DialogContext = React.createContext<{
  dialogs: DialogProviderState;
  setDialog: <Props extends {}>(
    component: React.ComponentType<DialogProps<Props>>,
    props: Props
  ) => void;
  closeDialog: (key: string) => void;
}>({
  dialogs: {},
  setDialog: () => {},
  closeDialog: () => {},
});
