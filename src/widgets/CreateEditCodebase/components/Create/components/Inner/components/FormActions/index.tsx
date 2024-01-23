import { Button } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCodebaseCRUD } from '../../../../../../../../k8s/EDPCodebase/hooks/useCodebaseCRUD';
import { createCodebaseInstance } from '../../../../../../../../k8s/EDPCodebase/utils/createCodebaseInstance';
import { useSpecificDialogContext } from '../../../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../../../utils/forms/getUsedValues';
import {
  CREATE_EDIT_CODEBASE_DIALOG_NAME,
  FORM_PART_CODEBASE_INFO,
  TAB_INDEXES,
} from '../../../../../../constants';
import { CODEBASE_FORM_NAMES } from '../../../../../../names';
import { CreateEditCodebaseDialogForwardedProps } from '../../../../../../types';
import { CreateCodebaseFormValues } from '../../../../types';
import { FormActionsProps } from './types';

const TAB_INDEXES_LAST_INDEX = Object.keys(TAB_INDEXES).length - 1;

export const FormActions = ({
  baseDefaultValues,
  setFormActiveTabIdx,
  setModalActiveTabIdx,
  formActiveTabIdx,
}: FormActionsProps) => {
  const { closeDialog } = useSpecificDialogContext<CreateEditCodebaseDialogForwardedProps>(
    CREATE_EDIT_CODEBASE_DIALOG_NAME
  );

  const {
    reset,
    formState: { isDirty },
    trigger,
    handleSubmit,
    watch,
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
      setFormActiveTabIdx(TAB_INDEXES[FORM_PART_CODEBASE_INFO]);
      setModalActiveTabIdx(0);
    }, 500);
  }, [closeDialog, reset, baseDefaultValues, setFormActiveTabIdx, setModalActiveTabIdx]);

  const handleResetFields = React.useCallback(() => {
    reset({
      ...baseDefaultValues,
      [CODEBASE_FORM_NAMES.strategy.name]: strategyFieldValue,
      [CODEBASE_FORM_NAMES.type.name]: typeFieldValue,
    });
  }, [reset, baseDefaultValues, strategyFieldValue, typeFieldValue]);

  const activeTabFormPartName = React.useMemo(() => {
    const [validEntry] = Object.entries(TAB_INDEXES).filter(([, idx]) => idx === formActiveTabIdx);
    const [activeTabName] = validEntry;

    return activeTabName;
  }, [formActiveTabIdx]);

  const handleProceed = React.useCallback(async () => {
    const activeTabFormPartNames = Object.values(CODEBASE_FORM_NAMES)
      // @ts-ignore
      .filter(({ formPart }) => formPart === activeTabFormPartName)
      .map(({ name }) => name);
    const hasNoErrors = await trigger(activeTabFormPartNames);
    if (hasNoErrors) {
      setFormActiveTabIdx(formActiveTabIdx + 1);
    }
  }, [activeTabFormPartName, formActiveTabIdx, setFormActiveTabIdx, trigger]);

  const getFirstErrorTabName = React.useCallback(errors => {
    const [firstErrorFieldName] = Object.keys(errors);
    return CODEBASE_FORM_NAMES[firstErrorFieldName].formPart;
  }, []);

  const handleValidationError = React.useCallback(
    (errors: Object) => {
      if (errors) {
        const firstErrorTabName = getFirstErrorTabName(errors);
        setFormActiveTabIdx(TAB_INDEXES[firstErrorTabName]);
      }
    },
    [getFirstErrorTabName, setFormActiveTabIdx]
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

  return (
    <>
      <Button onClick={handleResetFields} size="small" component={'button'} disabled={!isDirty}>
        undo changes
      </Button>
      <Button
        onClick={handleClose}
        size="small"
        component={'button'}
        style={{ marginLeft: 'auto' }}
      >
        cancel
      </Button>
      {formActiveTabIdx < TAB_INDEXES_LAST_INDEX && (
        <Button onClick={handleProceed} variant={'contained'} color={'primary'} size="small">
          proceed
        </Button>
      )}
      {formActiveTabIdx === TAB_INDEXES_LAST_INDEX && (
        <Button
          onClick={handleSubmit(onSubmit, handleValidationError)}
          variant={'contained'}
          color={'primary'}
          size="small"
          disabled={!isDirty || isLoading}
        >
          apply
        </Button>
      )}
    </>
  );
};
