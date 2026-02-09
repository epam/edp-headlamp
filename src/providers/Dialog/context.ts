import React from 'react';
import { DialogProps, DialogProviderState } from './types';

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
