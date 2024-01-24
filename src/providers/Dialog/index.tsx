import React from 'react';
import { DialogContext } from './context';
import { MODAL_MAPPING } from './mapping';
import { DialogProviderState, ModalName } from './types';

export const DialogContextProvider: React.FC = React.memo(({ children }) => {
  const [dialogState, setDialogState] = React.useState<DialogProviderState<unknown>>({});

  const setDialog = React.useCallback(
    ({ modalName, forwardedProps = null }: { modalName: ModalName; forwardedProps: unknown }) => {
      setDialogState((prev) => ({
        ...prev,
        [modalName]: {
          forwardedProps,
          open: true,
        },
      }));
    },
    []
  );

  const openDialog = React.useCallback((modalName: ModalName) => {
    setDialogState((prev) => ({
      ...prev,
      [modalName]: {
        ...prev[modalName],
        open: true,
      },
    }));
  }, []);

  const closeDialog = React.useCallback((modalName: ModalName) => {
    setDialogState((prev) => ({
      ...prev,
      [modalName]: {
        ...prev[modalName],
        open: false,
      },
    }));
  }, []);

  return (
    <DialogContext.Provider value={{ dialogState, setDialog, openDialog, closeDialog }}>
      <>
        {children}
        {Object.entries(dialogState).map(([modalName, modalState]) => {
          const key = `modal::${modalName}`;
          const ModalComponent = MODAL_MAPPING[modalName];
          const isOpen = modalState.open;

          return (
            <React.Fragment key={key}>
              {isOpen && ModalComponent ? ModalComponent : null}
            </React.Fragment>
          );
        })}
      </>
    </DialogContext.Provider>
  );
});
