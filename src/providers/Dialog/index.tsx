import React from 'react';
import { DialogContext } from './context';
import { MODAL_MAPPING } from './mapping';
import { DialogProviderState, ModalName } from './types';

export const DialogContextProvider: React.FC = ({ children }) => {
    const [dialogProviderState, setDialogProviderState] = React.useState<
        DialogProviderState<unknown>
    >({});

    const setDialog = React.useCallback(
        ({
            modalName,
            forwardedProps = null,
        }: {
            modalName: ModalName;
            forwardedProps: unknown;
        }) => {
            setDialogProviderState(prev => ({
                ...prev,
                [modalName]: {
                    forwardedProps,
                    open: true,
                },
            }));
        },
        []
    );

    const openDialog = React.useCallback(
        (modalName: ModalName) => {
            if (dialogProviderState && Object.hasOwn(dialogProviderState, modalName)) {
                setDialogProviderState(prev => ({
                    ...prev,
                    [modalName]: {
                        ...prev[modalName],
                        open: true,
                    },
                }));
            }
        },
        [dialogProviderState]
    );

    const closeDialog = React.useCallback(
        (modalName: ModalName) => {
            if (dialogProviderState && Object.hasOwn(dialogProviderState, modalName)) {
                setDialogProviderState(prev => ({
                    ...prev,
                    [modalName]: {
                        ...prev[modalName],
                        open: false,
                    },
                }));
            }
        },
        [dialogProviderState]
    );

    console.log(dialogProviderState);

    const entries = Object.entries(dialogProviderState);

    return (
        <DialogContext.Provider value={{ dialogProviderState, setDialog, openDialog, closeDialog }}>
            <>
                {children}
                {dialogProviderState &&
                    entries.map(([modalName]) => {
                        const key = `modal::${modalName}`;

                        return (
                            <React.Fragment key={key}>
                                {MODAL_MAPPING?.[modalName] ? MODAL_MAPPING?.[modalName] : null}
                            </React.Fragment>
                        );
                    })}
            </>
        </DialogContext.Provider>
    );
};
