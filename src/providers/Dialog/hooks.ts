import React from 'react';
import { DialogContext } from './context';
import { DialogContextProviderValue } from './types';

export const useDialogContext = <ForwardedPropsType>() =>
    React.useContext<DialogContextProviderValue<ForwardedPropsType>>(DialogContext);
