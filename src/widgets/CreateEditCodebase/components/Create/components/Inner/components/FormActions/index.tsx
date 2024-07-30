import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TabPanel } from '../../../../../../../../components/TabPanel';
import { useCodebaseCRUD } from '../../../../../../../../k8s/groups/EDP/Codebase/hooks/useCodebaseCRUD';
import { createCodebaseInstance } from '../../../../../../../../k8s/groups/EDP/Codebase/utils/createCodebaseInstance';
import { useSpecificDialogContext } from '../../../../../../../../providers/Dialog/hooks';
import { useStepperContext } from '../../../../../../../../providers/Stepper/hooks';
import { getUsedValues } from '../../../../../../../../utils/forms/getUsedValues';
import {
  CONFIGURATION_STEPPER,
  CREATE_EDIT_CODEBASE_DIALOG_NAME,
  MAIN_TABS,
} from '../../../../../../constants';
import { CODEBASE_FORM_NAMES } from '../../../../../../names';
import { CreateEditCodebaseDialogForwardedProps } from '../../../../../../types';
import { CreateCodebaseFormValues } from '../../../../types';
import { FormActionsProps } from './types';

export const FormActions = ({ baseDefaultValues, setActiveTab }: FormActionsProps) => {
  const theme = useTheme();
  const { activeStep, setActiveStep, nextStep } = useStepperContext();
  const { closeDialog } = useSpecificDialogContext<CreateEditCodebaseDialogForwardedProps>(
    CREATE_EDIT_CODEBASE_DIALOG_NAME
  );

  const {
    reset,
    formState: { isDirty, dirtyFields },
    trigger,
    handleSubmit,
    watch,
    setValue,
  } = useFormContext<CreateCodebaseFormValues>();

  const typeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);
  const strategyFieldValue = watch(CODEBASE_FORM_NAMES.strategy.name);

  const handleClose = React.useCallback(() => {
    closeDialog();
    setTimeout(() => {
      reset({
        ...baseDefaultValues,
        [CODEBASE_FORM_NAMES.strategy.name]: undefined,
        [CODEBASE_FORM_NAMES.type.name]: undefined,
      });
      setActiveStep(CONFIGURATION_STEPPER.CODEBASE_INFO.idx);
      setActiveTab(MAIN_TABS.SELECTION);
    }, 500);
  }, [closeDialog, reset, baseDefaultValues, setActiveStep, setActiveTab]);

  const handleResetFields = React.useCallback(() => {
    reset(baseDefaultValues);
    setValue(CODEBASE_FORM_NAMES.strategy.name, strategyFieldValue, { shouldDirty: true });
    setValue(CODEBASE_FORM_NAMES.type.name, typeFieldValue, { shouldDirty: true });
  }, [strategyFieldValue, typeFieldValue, reset, baseDefaultValues, setValue]);

  const activeTabFormPartName = React.useMemo(() => {
    const validEntry = Object.entries(CONFIGURATION_STEPPER).find(
      ([, { idx }]) => idx === activeStep
    );
    return validEntry?.[0];
  }, [activeStep]);

  const handleProceed = React.useCallback(async () => {
    const activeTabFormPartNames = Object.values(CODEBASE_FORM_NAMES)
      // @ts-ignore
      .filter(({ formPart }) => formPart === activeTabFormPartName)
      .map(({ name }) => name);

    const hasNoErrors = await trigger(activeTabFormPartNames);

    if (hasNoErrors) {
      nextStep();
    }
  }, [activeTabFormPartName, nextStep, trigger]);

  const getFirstErrorStepName = React.useCallback((errors) => {
    const [firstErrorFieldName] = Object.keys(errors);
    return CODEBASE_FORM_NAMES[firstErrorFieldName].formPart;
  }, []);

  const handleValidationError = React.useCallback(
    (errors: Object) => {
      if (errors) {
        const firstErrorTabName = getFirstErrorStepName(errors);
        setActiveStep(CONFIGURATION_STEPPER[firstErrorTabName].idx);
      }
    },
    [getFirstErrorStepName, setActiveStep]
  );

  const {
    createCodebase,
    mutations: {
      codebaseCreateMutation,
      codebaseSecretCreateMutation,
      codebaseSecretDeleteMutation,
    },
  } = useCodebaseCRUD({
    onSuccess: handleClose,
  });

  const isLoading = React.useMemo(
    () =>
      codebaseCreateMutation.isLoading ||
      codebaseSecretCreateMutation.isLoading ||
      codebaseSecretDeleteMutation.isLoading,
    [
      codebaseCreateMutation.isLoading,
      codebaseSecretCreateMutation.isLoading,
      codebaseSecretDeleteMutation.isLoading,
    ]
  );

  const onSubmit = React.useCallback(
    async (values: CreateCodebaseFormValues) => {
      const usedValues = getUsedValues(values, CODEBASE_FORM_NAMES);
      const codebaseData = createCodebaseInstance(CODEBASE_FORM_NAMES, usedValues);

      if (values?.repositoryLogin && values?.repositoryPasswordOrApiToken) {
        await createCodebase({
          codebaseData,
          codebaseAuthData: {
            repositoryLogin: values?.repositoryLogin,
            repositoryPasswordOrApiToken: values?.repositoryPasswordOrApiToken,
          },
        });
      } else {
        await createCodebase({
          codebaseData,
          codebaseAuthData: null,
        });
      }
    },
    [createCodebase]
  );

  const configurationFormIsDirty = Object.keys(dirtyFields).length > 2; // 2 is the number of fields that are always dirty

  return (
    <Stack direction="row" spacing={2} justifyContent="space-between" width="100%">
      <Stack direction="row" spacing={1}>
        <Box sx={{ color: theme.palette.text.primary }}>
          <Button onClick={handleClose} size="small" color="inherit">
            cancel
          </Button>
        </Box>
        <Button onClick={handleResetFields} size="small" disabled={!configurationFormIsDirty}>
          undo changes
        </Button>
      </Stack>
      <div>
        <TabPanel value={activeStep} index={CONFIGURATION_STEPPER.CODEBASE_INFO.idx}>
          <Stack direction="row">
            <Button onClick={() => setActiveTab(MAIN_TABS.SELECTION)} size="small">
              back
            </Button>
            <Button onClick={handleProceed} variant={'contained'} color={'primary'} size="small">
              next
            </Button>
          </Stack>
        </TabPanel>
        <TabPanel value={activeStep} index={CONFIGURATION_STEPPER.ADVANCED_SETTINGS.idx}>
          <Stack direction="row">
            <Button
              onClick={() => {
                setActiveStep(CONFIGURATION_STEPPER.CODEBASE_INFO.idx);
              }}
              size="small"
            >
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
