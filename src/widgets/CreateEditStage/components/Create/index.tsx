import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { FormContextProvider } from '../../../../providers/Form';
import { StepperContextProvider } from '../../../../providers/Stepper';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';

export const Create = () => {
  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
  const [editorData, setEditorData] = React.useState<EDPCDPipelineStageKubeObjectInterface>(
    {} as EDPCDPipelineStageKubeObjectInterface
  );

  const defaultValues = useDefaultValues();

  return (
    <FormContextProvider
      formSettings={{
        mode: 'onBlur',
        defaultValues: defaultValues,
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
