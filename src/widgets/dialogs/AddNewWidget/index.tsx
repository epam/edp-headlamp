import React from 'react';
import { StepperContextProvider } from '../../../providers/Stepper/provider';
import { DialogInner } from './components/DialogInner';
import { DIALOG_NAME } from './constants';
import { CurrentDialogContextProvider } from './providers/CurrentDialog/provider';
import { AddNewWidgetProps } from './types';

export const AddNewWidget: React.FC<AddNewWidgetProps> = ({ props, state }) => {
  return (
    <StepperContextProvider>
      <CurrentDialogContextProvider props={props} state={state}>
        <DialogInner />
      </CurrentDialogContextProvider>
    </StepperContextProvider>
  );
};

AddNewWidget.displayName = DIALOG_NAME;
