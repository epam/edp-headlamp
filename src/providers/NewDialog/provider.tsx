import React, { Suspense } from 'react';
import { DialogContext, DialogProps, DialogProviderState } from './context';

export const NewDialogContextProvider: React.FC = ({ children }) => {
  const [dialogs, setDialogs] = React.useState<DialogProviderState>({});

  const setDialog = <Props extends {}>(
    component: React.ComponentType<DialogProps<Props>>,
    props: Props
  ) => {
    const key = component.displayName || component.name;

    setDialogs((prevDialogs) => ({
      ...prevDialogs,
      [key]: { Component: component, props },
    }));
  };

  const closeDialog = (key: string) => {
    setDialogs((prevDialogs) => {
      if (prevDialogs[key]) {
        // eslint-disable-next-line no-unused-vars
        const { [key]: _, ...rest } = prevDialogs;
        return rest;
      }
      return prevDialogs;
    });
  };

  const mapEntries = React.useMemo(
    () =>
      Object.entries(dialogs).map(([key, { Component, props }]) => (
        <Suspense key={key} fallback={'Loading...'}>
          <Component
            props={props}
            state={{
              open: true,
              closeDialog: () => closeDialog(key),
              openDialog: () => setDialog(Component, props),
            }}
          />
        </Suspense>
      )),
    [dialogs]
  );

  return (
    <DialogContext.Provider value={{ dialogs, setDialog, closeDialog }}>
      {children}
      {mapEntries}
    </DialogContext.Provider>
  );
};
