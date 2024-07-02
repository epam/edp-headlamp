import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Box, Grid, Stack, Step, StepLabel, Stepper, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TabPanel } from '../../../../../../components/TabPanel';
import { useHandleEditorSave } from '../../../../../../hooks/useHandleEditorSave';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { useStepperContext } from '../../../../../../providers/Stepper/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import {
  CREATE_EDIT_STAGE_DIALOG_NAME,
  FORM_STEPPER,
  FORM_STEPPER_STEPS,
} from '../../../../constants';
import { STAGE_FORM_BACKWARD_NAME_MAPPING, STAGE_FORM_NAMES } from '../../../../names';
import { CreateEditStageDialogForwardedProps, CreateEditStageFormValues } from '../../../../types';
import {
  Cluster,
  Description,
  Namespace,
  QualityGates,
  StageName,
  TriggerTemplate,
  TriggerType,
} from '../../../fields';
import { FormProps } from './types';

export const Form = ({ editorOpen, editorData, setEditorOpen }: FormProps) => {
  const {
    forwardedProps: { otherStages },
  } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(CREATE_EDIT_STAGE_DIALOG_NAME);
  const { getValues, setValue, resetField } = useFormContext<CreateEditStageFormValues>();

  const handleCloseEditor = React.useCallback(() => setEditorOpen(false), [setEditorOpen]);

  const { handleEditorSave } = useHandleEditorSave({
    names: STAGE_FORM_NAMES,
    backwardNames: STAGE_FORM_BACKWARD_NAME_MAPPING,
    setValue,
    resetField,
  });

  const onEditorSave = React.useCallback(
    (editorReturnValues: KubeObjectInterface[]) => {
      const formValues = getValues();
      const usedValues = getUsedValues(formValues, STAGE_FORM_NAMES);
      handleEditorSave(editorReturnValues, usedValues);
      handleCloseEditor();
    },
    [getValues, handleCloseEditor, handleEditorSave]
  );

  const otherStagesNames = React.useMemo(
    () => otherStages.map(({ spec: { name } }) => name),
    [otherStages]
  );

  const theme = useTheme();

  const { activeStep } = useStepperContext();

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
          <TabPanel value={activeStep} index={FORM_STEPPER.CONFIGURATION.idx}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Cluster />
              </Grid>
              <Grid item xs={6}>
                <StageName otherStagesNames={otherStagesNames} />
              </Grid>
              <Grid item xs={6}>
                <Namespace />
              </Grid>
              <Grid item xs={6}>
                <Description />
              </Grid>
              <Grid item xs={6}>
                <TriggerType />
              </Grid>
              <Grid item xs={6}>
                <TriggerTemplate />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={activeStep} index={FORM_STEPPER.QUALITY_GATES.idx}>
            <QualityGates />
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
