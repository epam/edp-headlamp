import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { QuickLinkKubeObjectInterface } from '../../../../../k8s/groups/EDP/QuickLink/types';
import { FormContextProvider } from '../../../../../providers/Form/provider';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';

export const Create = () => {
  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
  const [editorData, setEditorData] = React.useState<QuickLinkKubeObjectInterface>(
    {} as QuickLinkKubeObjectInterface
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
        <Form editorData={editorData} editorOpen={editorOpen} setEditorOpen={setEditorOpen} />
      </DialogContent>
      <DialogActions>
        <FormActions />
      </DialogActions>
    </FormContextProvider>
  );
};
