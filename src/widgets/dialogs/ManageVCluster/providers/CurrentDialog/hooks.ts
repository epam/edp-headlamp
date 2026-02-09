import React from 'react';
import { CurrentDialogContext } from './context';

export const useCurrentDialog = () => React.useContext(CurrentDialogContext);
