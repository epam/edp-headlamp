import { MODAL_MAPPING } from './mapping';

export interface ActiveDialog {
    modalName: keyof typeof MODAL_MAPPING;
    forwardedProps?: any;
    open: boolean;
}

export interface DialogContextProviderValue {
    activeDialog: ActiveDialog;
    setDialog: ({
        modalName,
        forwardedProps = {},
    }: {
        modalName: ActiveDialog['modalName'];
        forwardedProps?: ActiveDialog['forwardedProps'];
    }) => void;
    openDialog: () => void;
    closeDialog: () => void;
}
