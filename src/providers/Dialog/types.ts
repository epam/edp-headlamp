import { MODAL_MAPPING } from './mapping';

export interface ActiveDialog<ForwardedPropsType = {}> {
    modalName: keyof typeof MODAL_MAPPING;
    forwardedProps?: ForwardedPropsType;
    open: boolean;
}

export interface DialogContextProviderValue<ForwardedPropsType> {
    activeDialog: ActiveDialog<ForwardedPropsType>;
    setDialog: ({
        modalName,
        forwardedProps,
    }: {
        modalName: ActiveDialog['modalName'];
        forwardedProps?: ForwardedPropsType;
    }) => void;
    openDialog: () => void;
    closeDialog: () => void;
}
