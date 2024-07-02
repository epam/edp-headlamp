import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Box, Grid, Stack, Step, StepLabel, Stepper, useTheme } from '@mui/material';
import { Alert } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TabPanel } from '../../../../../../components/TabPanel';
import { useHandleEditorSave } from '../../../../../../hooks/useHandleEditorSave';
import { createCDPipelineInstance } from '../../../../../../k8s/EDPCDPipeline/utils/createCDPipelineInstance';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { useStepperContext } from '../../../../../../providers/Stepper/hooks';
import { FORM_MODES } from '../../../../../../types/forms';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../../CreateEditStage/constants';
import { CreateEditStageDialogForwardedProps } from '../../../../../CreateEditStage/types';
import { FORM_STEPPER, FORM_STEPPER_STEPS } from '../../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import { CreateEditCDPipelineFormValues } from '../../../../types';
import { Applications, PipelineName, Stages } from '../../../fields';
import { FormProps } from './types';

export const Form = ({ editorOpen, editorData, setEditorOpen, stages, setStages }: FormProps) => {
  const { setDialog } = useDialogContext();
  const { getValues, setValue, resetField } = useFormContext<CreateEditCDPipelineFormValues>();

  const handleCloseEditor = React.useCallback(() => setEditorOpen(false), [setEditorOpen]);

  const { handleEditorSave } = useHandleEditorSave({
    names: CDPIPELINE_FORM_NAMES,
    setValue,
    resetField,
  });

  const onEditorSave = React.useCallback(
    (editorReturnValues: KubeObjectInterface[]) => {
      const formValues = getValues();
      const usedValues = getUsedValues(formValues, CDPIPELINE_FORM_NAMES);
      handleEditorSave(editorReturnValues, usedValues);
      handleCloseEditor();
    },
    [getValues, handleCloseEditor, handleEditorSave]
  );

  const onPipelineNameChange = React.useCallback(
    (pipelineNameFieldValue) => {
      if (!stages.length) {
        return;
      }

      const updatedStagesWithNewPipelineName = stages.map((el) => ({
        ...el,
        metadata: {
          ...el.metadata,
          name: `${pipelineNameFieldValue}-${el.spec.name}`,
        },
        spec: {
          ...el.spec,
          cdPipeline: pipelineNameFieldValue,
        },
      }));

      setStages(updatedStagesWithNewPipelineName);
    },
    [setStages, stages]
  );

  const handleDeleteStage = React.useCallback(
    (idx: number) => {
      setStages((prev) =>
        prev
          .map((el, prevElIndex) => {
            if (idx !== prevElIndex) {
              return el;
            }
          })
          .filter(Boolean)
      );
    },
    [setStages]
  );

  const handleClickAddStage = React.useCallback(() => {
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, CDPIPELINE_FORM_NAMES);
    const newCDPipelineData = createCDPipelineInstance(CDPIPELINE_FORM_NAMES, usedValues);
    const createStageDialogForwardedProps: CreateEditStageDialogForwardedProps = {
      CDPipelineData: newCDPipelineData,
      otherStages: stages,
      mode: FORM_MODES.CREATE,
      handleApply: ({ CDPipelineStageData }) => {
        setStages((prev) => [...prev, CDPipelineStageData]);
      },
    };
    setDialog({
      modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
      forwardedProps: createStageDialogForwardedProps,
    });
  }, [getValues, setDialog, setStages, stages]);

  const { activeStep } = useStepperContext();
  const theme = useTheme();

  return (
    <>
      <Stack spacing={2}>
        <Box sx={{ pt: theme.typography.pxToRem(24) }}>
          <Stepper activeStep={activeStep}>
            {FORM_STEPPER_STEPS.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
        <Box sx={{ p: `${theme.typography.pxToRem(24)} ${theme.typography.pxToRem(8)}` }}>
          <TabPanel value={activeStep} index={FORM_STEPPER.PIPELINE.idx}>
            <PipelineName onPipelineNameChange={onPipelineNameChange} />
          </TabPanel>
          <TabPanel value={activeStep} index={FORM_STEPPER.APPLICATIONS.idx}>
            <Applications />
          </TabPanel>
          <TabPanel value={activeStep} index={FORM_STEPPER.STAGES.idx}>
            <Stack spacing={2}>
              <Stages
                stages={stages}
                handleDeleteStage={handleDeleteStage}
                handleClickAddStage={handleClickAddStage}
              />
              {stages && !stages.length ? (
                <Grid item xs={12}>
                  <Alert severity="info" variant="outlined">
                    Add at least one stage
                  </Alert>
                </Grid>
              ) : null}
            </Stack>
          </TabPanel>
        </Box>
      </Stack>
      {editorOpen && (
        <EditorDialog
          open={editorOpen}
          item={editorData}
          onClose={handleCloseEditor}
          onSave={onEditorSave}
        />
      )}
    </>
  );
};
