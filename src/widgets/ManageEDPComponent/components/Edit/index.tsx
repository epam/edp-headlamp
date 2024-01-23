import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { EDPComponentKubeObjectInterface } from '../../../../k8s/EDPComponent/types';
import { FormContextProvider } from '../../../../providers/Form';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';

export const Edit = () => {
  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
  const [editorData, setEditorData] = React.useState<EDPComponentKubeObjectInterface>(
    {} as EDPComponentKubeObjectInterface
  );

  const defaultValues = useDefaultValues();

  return (
    <FormContextProvider
      formSettings={{
        mode: 'onBlur',
        defaultValues: defaultValues,
      }}
    >
      <DialogTitle>
        <DialogHeader setEditorData={setEditorData} setEditorOpen={setEditorOpen} />
      </DialogTitle>
      <DialogContent>
        <Form editorOpen={editorOpen} editorData={editorData} setEditorOpen={setEditorOpen} />
      </DialogContent>
      <DialogActions>
        <FormActions />
      </DialogActions>
    </FormContextProvider>
  );
};
