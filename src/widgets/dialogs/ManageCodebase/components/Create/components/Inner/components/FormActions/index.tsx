import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { TabPanel } from '../../../../../../../../../components/TabPanel';
import { CODEBASE_CREATION_STRATEGY } from '../../../../../../../../../constants/creationStrategies';
import { useCodebaseCRUD } from '../../../../../../../../../k8s/groups/EDP/Codebase/hooks/useCodebaseCRUD';
import { CodebaseKubeObjectInterface } from '../../../../../../../../../k8s/groups/EDP/Codebase/types';
import { createCodebaseInstance } from '../../../../../../../../../k8s/groups/EDP/Codebase/utils/createCodebaseInstance';
import { routeComponentDetails } from '../../../../../../../../../pages/component-details/route';
import { useDialogContext } from '../../../../../../../../../providers/Dialog/hooks';
import { useStepperContext } from '../../../../../../../../../providers/Stepper/hooks';
import { ValueOf } from '../../../../../../../../../types/global';
import { capitalizeFirstLetter } from '../../../../../../../../../utils/format/capitalizeFirstLetter';
import { getUsedValues } from '../../../../../../../../../utils/forms/getUsedValues';
import { getDefaultNamespace } from '../../../../../../../../../utils/getDefaultNamespace';
import { SuccessDialog } from '../../../../../../../Success';
import { CONFIGURATION_STEPPER, MAIN_TABS } from '../../../../../../constants';
import { useTypedFormContext } from '../../../../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES, NAMES } from '../../../../../../names';
import { useCurrentDialog } from '../../../../../../providers/CurrentDialog/hooks';
import { ManageCodebaseFormValues } from '../../../../../../types';
import { FormActionsProps } from './types';

export const FormActions = ({ baseDefaultValues, setActiveTab }: FormActionsProps) => {
  const theme = useTheme();
  const { activeStep, setActiveStep, nextStep } = useStepperContext();
  const { setDialog } = useDialogContext();
  const {
    state: { closeDialog },
  } = useCurrentDialog();

  const {
    reset,
    formState: { isDirty, dirtyFields },
    trigger,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useTypedFormContext();

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
    const values = getValues();

    const activeTabFormPartNames = Object.values(CODEBASE_FORM_NAMES)
      // @ts-ignore
      .filter(({ formPart }) => formPart === activeTabFormPartName)
      .map(({ name }) => name);

    if (values.strategy === CODEBASE_CREATION_STRATEGY.CLONE && !!values.hasCodebaseAuth) {
      activeTabFormPartNames.push(CODEBASE_FORM_NAMES.repositoryLogin.name);
      activeTabFormPartNames.push(CODEBASE_FORM_NAMES.repositoryPasswordOrApiToken.name);
    }

    const hasNoErrors = await trigger(activeTabFormPartNames);

    if (hasNoErrors) {
      nextStep();
    }
  }, [activeTabFormPartName, getValues, nextStep, trigger]);

  const getFirstErrorStepName = React.useCallback((errors) => {
    const [firstErrorFieldName] = Object.keys(errors);
    const field = CODEBASE_FORM_NAMES[firstErrorFieldName as ValueOf<typeof NAMES>];
    return 'formPart' in field ? field.formPart : undefined;
  }, []);

  const handleValidationError = React.useCallback(
    (errors: Object) => {
      if (errors) {
        const firstErrorTabName = getFirstErrorStepName(errors);
        setActiveStep(
          CONFIGURATION_STEPPER[firstErrorTabName as keyof typeof CONFIGURATION_STEPPER]?.idx
        );
      }
    },
    [getFirstErrorStepName, setActiveStep]
  );

  const onSuccess = React.useCallback(
    (codebaseData: CodebaseKubeObjectInterface) => {
      const capitalizedType = capitalizeFirstLetter(typeFieldValue);
      setDialog(SuccessDialog, {
        dialogTitle: `Create ${capitalizedType}`,
        title: `Your new ${capitalizedType} is created`,
        description: `Browse your new ${capitalizedType} and start working with it.`,
        goToLink: {
          routeName: routeComponentDetails.path,
          text: `go to ${typeFieldValue}`,
          routeParams: {
            namespace: codebaseData.metadata.namespace || getDefaultNamespace(),
            name: codebaseData.metadata.name,
          },
        },
      });

      handleClose();
    },
    [handleClose, setDialog, typeFieldValue]
  );

  const {
    createCodebase,
    mutations: {
      codebaseCreateMutation,
      codebaseSecretCreateMutation,
      codebaseSecretDeleteMutation,
    },
  } = useCodebaseCRUD({
    onSuccess: onSuccess,
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
    async (values: ManageCodebaseFormValues) => {
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
