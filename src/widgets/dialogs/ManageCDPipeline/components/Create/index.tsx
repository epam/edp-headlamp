import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { CDPipelineKubeObjectInterface } from '../../../../../k8s/groups/EDP/CDPipeline/types';
import { FormContextProvider } from '../../../../../providers/Form/provider';
import { StepperContextProvider } from '../../../../../providers/Stepper/provider';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';

export const Create = () => {
  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

  const [editorData, setEditorData] = React.useState<CDPipelineKubeObjectInterface>(
    {} as CDPipelineKubeObjectInterface
  );

  const baseDefaultValues = useDefaultValues();

  return (
    <FormContextProvider
      formSettings={{
        mode: 'onBlur',
        defaultValues: baseDefaultValues,
      }}
    >
      <StepperContextProvider>
        <DialogTitle>
          <DialogHeader setEditorData={setEditorData} setEditorOpen={setEditorOpen} />
        </DialogTitle>
        <DialogContent>
          <Form editorData={editorData} editorOpen={editorOpen} setEditorOpen={setEditorOpen} />
        </DialogContent>
        <DialogActions>
          <FormActions />
        </DialogActions>
      </StepperContextProvider>
    </FormContextProvider>
  );
};
