import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TabPanel } from '../../../../../../components/TabPanel';
import { useStageCRUD } from '../../../../../../k8s/groups/EDP/Stage/hooks/useStageCRUD';
import { StageKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Stage/types';
import { createCDPipelineStageInstance } from '../../../../../../k8s/groups/EDP/Stage/utils/createCDPipelineStageInstance';
import { routeStageDetails } from '../../../../../../pages/stage-details/route';
import {
  useDialogContext,
  useSpecificDialogContext,
} from '../../../../../../providers/Dialog/hooks';
import { useStepperContext } from '../../../../../../providers/Stepper/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { SUCCESS_DIALOG_NAME } from '../../../../../SuccessModal/constants';
import { SuccessDialogForwardedProps } from '../../../../../SuccessModal/types';
import { CREATE_EDIT_STAGE_DIALOG_NAME, FORM_STEPPER } from '../../../../constants';
import { STAGE_FORM_NAMES } from '../../../../names';
import { CreateEditStageDialogForwardedProps, CreateEditStageFormValues } from '../../../../types';

export const FormActions = () => {
  const { setDialog } = useDialogContext();

  const {
    forwardedProps: { CDPipelineData },
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

  const onSuccess = React.useCallback(
    (stageData: StageKubeObjectInterface) => {
      const successModalForwardedProps: SuccessDialogForwardedProps = {
        dialogTitle: `Create Environment`,
        title: `Your new Environment is created`,
        description: `Browse your new Environment and start working with it.`,
        goToLink: {
          routeName: routeStageDetails.path,
          text: `go to ennvironment`,
          routeParams: {
            namespace: stageData.metadata.namespace || getDefaultNamespace(),
            stageName: stageData.metadata.name,
            CDPipelineName: CDPipelineData.metadata.name,
          },
        },
      };

      setDialog({
        modalName: SUCCESS_DIALOG_NAME,
        forwardedProps: successModalForwardedProps,
      });

      handleClose();
    },
    [CDPipelineData.metadata.name, handleClose, setDialog]
  );

  const {
    createStage,
    mutations: { stageCreateMutation },
  } = useStageCRUD({
    onSuccess: onSuccess,
  });

  const isLoading = React.useMemo(
    () => stageCreateMutation.isLoading,
    [stageCreateMutation.isLoading]
  );

  const onSubmit = React.useCallback(
    async (values: CreateEditStageFormValues) => {
      const usedValues = getUsedValues(values, STAGE_FORM_NAMES);
      const stageData = createCDPipelineStageInstance(
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

      await createStage({
        stageData,
      });
    },
    [CDPipelineData, createStage]
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
