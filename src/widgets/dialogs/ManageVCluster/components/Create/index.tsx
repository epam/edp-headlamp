import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { FormContextProvider } from '../../../../../providers/Form/provider';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';

export const Create = () => {
  return (
    <FormContextProvider
      formSettings={{
        mode: 'onBlur',
      }}
    >
      <DialogTitle>
        <DialogHeader />
      </DialogTitle>
      <DialogContent>
        <Form />
      </DialogContent>
      <DialogActions>
        <FormActions />
      </DialogActions>
    </FormContextProvider>
  );
};
