import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TabPanel } from '../../../../../../components/TabPanel';
import { useCreateCDPipelineStage } from '../../../../../../k8s/groups/EDP/Stage/hooks/useCreateCDPipelineStage';
import { createCDPipelineStageInstance } from '../../../../../../k8s/groups/EDP/Stage/utils/createCDPipelineStageInstance';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { useStepperContext } from '../../../../../../providers/Stepper/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_STAGE_DIALOG_NAME, FORM_STEPPER } from '../../../../constants';
import { STAGE_FORM_NAMES } from '../../../../names';
import { CreateEditStageDialogForwardedProps, CreateEditStageFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    forwardedProps: { CDPipelineData, handleApply: customHandleApply },
    closeDialog,
  } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(CREATE_EDIT_STAGE_DIALOG_NAME);

  const {
    reset,
    formState: { isDirty },
    watch,
    handleSubmit,
  } = useFormContext<CreateEditStageFormValues>();

  const handleClose = React.useCallback(() => {
    closeDialog();
    reset();
  }, [closeDialog, reset]);

  const handleResetFields = React.useCallback(() => {
    reset();
  }, [reset]);

  const {
    createCDPipelineStage,
    mutations: { CDPipelineStageCreateMutation },
  } = useCreateCDPipelineStage({
    onSuccess: handleClose,
  });

  const isLoading = React.useMemo(
    () => CDPipelineStageCreateMutation.isLoading,
    [CDPipelineStageCreateMutation.isLoading]
  );

  const onSubmit = React.useCallback(
    async (values: CreateEditStageFormValues) => {
      const usedValues = getUsedValues(values, STAGE_FORM_NAMES);
      const CDPipelineStageData = createCDPipelineStageInstance(
        STAGE_FORM_NAMES,
        {
          ...usedValues,
          // removing unnecessary ID used in form
          qualityGates: usedValues.qualityGates.map((el) => ({
            qualityGateType: el.qualityGateType,
            stepName: el.stepName,
            autotestName: el.autotestName,
            branchName: el.branchName,
          })),
        },
        CDPipelineData
      );
      if (customHandleApply) {
        customHandleApply({
          CDPipelineStageData,
        });
        closeDialog();
      } else {
        await createCDPipelineStage({
          CDPipelineStageData,
        });
      }
    },
    [CDPipelineData, closeDialog, createCDPipelineStage, customHandleApply]
  );

  const qualityGatesFieldValue = watch(STAGE_FORM_NAMES.qualityGates.name);

  const { activeStep, nextStep, prevStep } = useStepperContext();
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={2} justifyContent="space-between" width="100%">
      <Stack direction="row" spacing={1}>
        <Box sx={{ color: theme.palette.text.primary }}>
          <Button onClick={handleClose} size="small" color="inherit">
            cancel
          </Button>
        </Box>
        <Button onClick={handleResetFields} size="small" disabled={!isDirty}>
          undo changes
        </Button>
      </Stack>
      <div>
        <TabPanel value={activeStep} index={FORM_STEPPER.CONFIGURATION.idx}>
          <Stack direction="row">
            <Button onClick={nextStep} variant={'contained'} color={'primary'} size="small">
              next
            </Button>
          </Stack>
        </TabPanel>
        <TabPanel value={activeStep} index={FORM_STEPPER.QUALITY_GATES.idx}>
          <Stack direction="row">
            <Button onClick={prevStep} size="small">
              back
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              color={'primary'}
              size="small"
              disabled={
                !isDirty || isLoading || !qualityGatesFieldValue || !qualityGatesFieldValue.length
              }
            >
              create
            </Button>
          </Stack>
        </TabPanel>
      </div>
    </Stack>
  );
};
