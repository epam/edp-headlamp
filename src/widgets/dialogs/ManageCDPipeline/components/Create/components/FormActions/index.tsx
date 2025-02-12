import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { TabPanel } from '../../../../../../../components/TabPanel';
import { useCDPipelineCRUD } from '../../../../../../../k8s/groups/EDP/CDPipeline/hooks/useCDPIpelineCRUD';
import { CDPipelineKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/CDPipeline/types';
import { createCDPipelineInstance } from '../../../../../../../k8s/groups/EDP/CDPipeline/utils/createCDPipelineInstance';
import { routeCDPipelineDetails } from '../../../../../../../pages/cdpipeline-details/route';
import { useDialogContext } from '../../../../../../../providers/Dialog/hooks';
import { useStepperContext } from '../../../../../../../providers/Stepper/hooks';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { getDefaultNamespace } from '../../../../../../../utils/getDefaultNamespace';
import { SuccessDialog } from '../../../../../Success';
import { FORM_STEPPER } from '../../../../constants';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';
import { ManageCDPipelineFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    state: { closeDialog },
  } = useCurrentDialog();
  const { activeStep, setActiveStep, nextStep, prevStep } = useStepperContext();

  const {
    reset,
    formState: { dirtyFields },
    trigger,
    handleSubmit,
  } = useTypedFormContext();

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
      setDialog(SuccessDialog, {
        dialogTitle: 'Create Deployment Flow',
        title: 'Your new Deployment Flow is created',
        description:
          'Kickstart application rollouts by adding Environments to your Deployment Flow.',
        goToLink: {
          routeName: routeCDPipelineDetails.path,
          text: 'go to Deployment Flow',
          routeParams: {
            namespace: CDPipelineData?.metadata.namespace || getDefaultNamespace(),
            name: CDPipelineData?.metadata.name,
          },
        },
      });

      handleClose();
    },
    [handleClose, setDialog]
  );

  const {
    createCDPipeline,
    mutations: { CDPipelineCreateMutation },
  } = useCDPipelineCRUD();

  const isLoading = React.useMemo(
    () => CDPipelineCreateMutation.isLoading,
    [CDPipelineCreateMutation.isLoading]
  );

  const onSubmit = React.useCallback(
    (values: ManageCDPipelineFormValues) => {
      const usedValues = getUsedValues(values, CDPIPELINE_FORM_NAMES);
      const CDPipelineData = createCDPipelineInstance(CDPIPELINE_FORM_NAMES, usedValues);
      createCDPipeline({
        CDPipelineData: CDPipelineData,
        onSuccess: onSuccess,
      });
    },
    [createCDPipeline, onSuccess]
  );

  const theme = useTheme();

  const isDirty = Object.keys(dirtyFields).length;

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
