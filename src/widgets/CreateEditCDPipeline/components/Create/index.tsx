import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { FormContextProvider } from '../../../../providers/Form';
import { StepperContextProvider } from '../../../../providers/Stepper';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';

export const Create = () => {
  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

  const [editorData, setEditorData] = React.useState<EDPCDPipelineKubeObjectInterface>(
    {} as EDPCDPipelineKubeObjectInterface
  );

  const [stages, setStages] = React.useState<EDPCDPipelineStageKubeObjectInterface[]>([]);

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
          <Form
            editorData={editorData}
            editorOpen={editorOpen}
            setEditorOpen={setEditorOpen}
            stages={stages}
            setStages={setStages}
          />
        </DialogContent>
        <DialogActions>
          <FormActions stages={stages} setStages={setStages} />
        </DialogActions>
      </StepperContextProvider>
    </FormContextProvider>
  );
};
