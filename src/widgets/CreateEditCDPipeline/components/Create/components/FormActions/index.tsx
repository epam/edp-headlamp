import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TabPanel } from '../../../../../../components/TabPanel';
import { useCreateCDPipeline } from '../../../../../../k8s/groups/EDP/CDPipeline/hooks/useCreateCDPipeline';
import { CDPipelineKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CDPipeline/types';
import { createCDPipelineInstance } from '../../../../../../k8s/groups/EDP/CDPipeline/utils/createCDPipelineInstance';
import { routeCDPipelineDetails } from '../../../../../../pages/cdpipeline-details/route';
import {
  useDialogContext,
  useSpecificDialogContext,
} from '../../../../../../providers/Dialog/hooks';
import { useStepperContext } from '../../../../../../providers/Stepper/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { SUCCESS_DIALOG_NAME } from '../../../../../SuccessModal/constants';
import { SuccessDialogForwardedProps } from '../../../../../SuccessModal/types';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME, FORM_STEPPER } from '../../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import {
  CreateEditCDPipelineDialogForwardedProps,
  CreateEditCDPipelineFormValues,
} from '../../../../types';

export const FormActions = () => {
  const { closeDialog } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
    CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
  );
  const { activeStep, setActiveStep, nextStep, prevStep } = useStepperContext();

  const {
    reset,
    formState: { isDirty },
    trigger,
    handleSubmit,
  } = useFormContext<CreateEditCDPipelineFormValues>();

  const handleClose = React.useCallback(() => {
    closeDialog();
    reset();
  }, [closeDialog, reset]);

  const handleResetFields = React.useCallback(() => {
    reset();
  }, [reset]);

  const activeTabFormPartName = React.useMemo(() => {
    const validEntry = Object.entries(FORM_STEPPER).find(([, { idx }]) => idx === activeStep);
    return validEntry?.[0];
  }, [activeStep]);

  const handleProceed = React.useCallback(async () => {
    const activeTabFormPartNames = Object.values(CDPIPELINE_FORM_NAMES)
      // @ts-ignore
      .filter(({ formPart }) => formPart === activeTabFormPartName)
      .map(({ name }) => name);

    const hasNoErrors = await trigger(activeTabFormPartNames);

    if (hasNoErrors) {
      nextStep();
    }
  }, [activeTabFormPartName, nextStep, trigger]);

  const getFirstErrorStepName = (errors) => {
    const [firstErrorFieldName] = Object.keys(errors);
    return CDPIPELINE_FORM_NAMES[firstErrorFieldName].formPart;
  };

  const handleValidationError = React.useCallback(
    (errors: Object) => {
      if (errors) {
        const firstErrorTabName = getFirstErrorStepName(errors);
        setActiveStep(FORM_STEPPER[firstErrorTabName].idx);
      }
    },
    [setActiveStep]
  );

  const { setDialog } = useDialogContext();

  const onSuccess = React.useCallback(
    (CDPipelineData: CDPipelineKubeObjectInterface) => {
      const successModalForwardedProps: SuccessDialogForwardedProps = {
        dialogTitle: 'Create Environment',
        title: 'Your new environment is created',
        description: 'Make sure to add stages to your environment to start deploying applications.',
        goToLink: {
          routeName: routeCDPipelineDetails.path,
          text: 'go to environment',
          routeParams: {
            namespace: CDPipelineData.metadata.namespace || getDefaultNamespace(),
            name: CDPipelineData.metadata.name,
          },
        },
      };

      setDialog({
        modalName: SUCCESS_DIALOG_NAME,
        forwardedProps: successModalForwardedProps,
      });

      handleClose();
    },
    [handleClose, setDialog]
  );

  const {
    createCDPipeline,
    mutations: {
      CDPipelineCreateMutation,
      CDPipelineStageCreateMutation,
      CDPipelineDeleteMutation,
      CDPipelineStageDeleteMutation,
    },
  } = useCreateCDPipeline();

  const isLoading = React.useMemo(
    () =>
      CDPipelineCreateMutation.isLoading ||
      CDPipelineStageCreateMutation.isLoading ||
      CDPipelineDeleteMutation.isLoading ||
      CDPipelineStageDeleteMutation.isLoading,
    [
      CDPipelineCreateMutation.isLoading,
      CDPipelineDeleteMutation.isLoading,
      CDPipelineStageCreateMutation.isLoading,
      CDPipelineStageDeleteMutation.isLoading,
    ]
  );

  const onSubmit = React.useCallback(
    async (values: CreateEditCDPipelineFormValues) => {
      const usedValues = getUsedValues(values, CDPIPELINE_FORM_NAMES);
      const CDPipelineData = createCDPipelineInstance(CDPIPELINE_FORM_NAMES, usedValues);
      await createCDPipeline({
        CDPipelineData: CDPipelineData,
        onSuccess: onSuccess,
      });
    },
    [createCDPipeline, onSuccess]
  );

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
        <TabPanel value={activeStep} index={FORM_STEPPER.PIPELINE.idx}>
          <Button onClick={handleProceed} variant={'contained'} color={'primary'} size="small">
            next
          </Button>
        </TabPanel>
        <TabPanel value={activeStep} index={FORM_STEPPER.APPLICATIONS.idx}>
          <Stack direction="row">
            <Button onClick={prevStep} size="small">
              back
            </Button>
            <Button
              onClick={handleSubmit(onSubmit, handleValidationError)}
              variant={'contained'}
              color={'primary'}
              size="small"
              disabled={!isDirty || isLoading}
            >
              create
            </Button>
          </Stack>
        </TabPanel>
      </div>
    </Stack>
  );
};
