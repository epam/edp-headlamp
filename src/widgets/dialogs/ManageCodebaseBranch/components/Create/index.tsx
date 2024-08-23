import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { CodebaseBranchKubeObjectInterface } from '../../../../../k8s/groups/EDP/CodebaseBranch/types';
import { FormContextProvider } from '../../../../../providers/Form';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';

export const Create = () => {
  const baseDefaultValues = useDefaultValues();

  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
  const [editorData, setEditorData] = React.useState<CodebaseBranchKubeObjectInterface>(
    {} as CodebaseBranchKubeObjectInterface
  );

  return (
    <FormContextProvider
      formSettings={{
        mode: 'onBlur',
        defaultValues: baseDefaultValues,
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
