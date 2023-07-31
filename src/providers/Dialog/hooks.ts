import React from 'react';
import { DialogContext } from './context';
import { ActiveDialog, DialogContextProviderValue, ModalName } from './types';

export const useDialogContext = <ForwardedPropsType>() =>
    React.useContext<DialogContextProviderValue<ForwardedPropsType>>(DialogContext);

export const useSpecificDialogContext = <ForwardedPropsType>(modalName: ModalName) => {
    const currentContext =
        React.useContext<DialogContextProviderValue<ForwardedPropsType>>(DialogContext);

    const activeModal: ActiveDialog<ForwardedPropsType> = currentContext.dialogState?.[modalName];

    const closeDialog = React.useCallback(
        () => currentContext.closeDialog(modalName),
        [currentContext, modalName]
    );

    const openDialog = React.useCallback(
        () => currentContext.openDialog(modalName),
        [currentContext, modalName]
    );

    return React.useMemo(
        () => ({
            open: activeModal?.open,
            forwardedProps: activeModal?.forwardedProps,
            closeDialog,
            openDialog,
        }),
        [activeModal, closeDialog, openDialog]
    );
};
