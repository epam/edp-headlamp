import React from 'react';
import { DialogContextProviderValue } from './types';

export const DialogContext = React.createContext<DialogContextProviderValue<null>>({
    activeDialog: {
        modalName: null,
        forwardedProps: null,
        open: false,
    },
    setDialog: () => {
        // empty fn
    },
    openDialog: () => {
        // empty fn
    },
    closeDialog: () => {
        // empty fn
    },
});
