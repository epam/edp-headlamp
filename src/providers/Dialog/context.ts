import { React } from '../../plugin.globals';
import { DialogContextProviderValue } from './types';

export const DialogContext = React.createContext<DialogContextProviderValue>({
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
