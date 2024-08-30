import React from 'react';
import { CurrentDialogContext } from './context';
import { CurrentDialogContextProviderProps } from './types';

export const CurrentDialogContextProvider: React.FC<CurrentDialogContextProviderProps> = ({
  children,
  props,
  state,
}) => {
  const CurrentDialogContextValue = React.useMemo(
    () => ({
      props,
      state,
    }),
    [props, state]
  );

  return (
    <CurrentDialogContext.Provider value={CurrentDialogContextValue}>
      {children}
    </CurrentDialogContext.Provider>
  );
};
