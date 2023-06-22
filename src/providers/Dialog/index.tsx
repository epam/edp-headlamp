import React from 'react';
import { DialogContext } from './context';
import { MODAL_MAPPING } from './mapping';
import { ActiveDialog } from './types';

const renderModal = (activeDialog: ActiveDialog) => {
    if (!activeDialog.modalName) {
        return null;
    }

    return MODAL_MAPPING[activeDialog.modalName];
};

export const DialogContextProvider: React.FC = ({ children }) => {
    const [activeDialog, setActiveDialog] = React.useState<ActiveDialog>({
        modalName: null,
        forwardedProps: null,
        open: false,
    });

    const setDialog = React.useCallback(({ modalName, forwardedProps = {} }: ActiveDialog) => {
        setActiveDialog({
            modalName,
            forwardedProps,
            open: true,
        });
    }, []);

    const openDialog = React.useCallback(() => {
        setActiveDialog(prevState => ({
            ...prevState,
            open: true,
        }));
    }, []);

    const closeDialog = React.useCallback(() => {
        setActiveDialog(prevState => ({
            ...prevState,
            open: false,
        }));
    }, []);

    const modalComponent = renderModal(activeDialog);

    return (
        <DialogContext.Provider value={{ activeDialog, setDialog, openDialog, closeDialog }}>
            <>
                {children}
                {modalComponent}
            </>
        </DialogContext.Provider>
    );
};
