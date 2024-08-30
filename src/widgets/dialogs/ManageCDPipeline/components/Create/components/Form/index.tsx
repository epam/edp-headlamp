import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Box, Stack, Step, StepLabel, Stepper, useTheme } from '@mui/material';
import React from 'react';
import { TabPanel } from '../../../../../../../components/TabPanel';
import { useHandleEditorSave } from '../../../../../../../hooks/useHandleEditorSave';
import { useStepperContext } from '../../../../../../../providers/Stepper/hooks';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { FORM_STEPPER, FORM_STEPPER_STEPS } from '../../../../constants';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import { Applications, PipelineName } from '../../../fields';
import { FormProps } from './types';

export const Form = ({ editorOpen, editorData, setEditorOpen }: FormProps) => {
  const { getValues, setValue, resetField } = useTypedFormContext();

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
            <PipelineName />
          </TabPanel>
          <TabPanel value={activeStep} index={FORM_STEPPER.APPLICATIONS.idx}>
            <Applications />
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
