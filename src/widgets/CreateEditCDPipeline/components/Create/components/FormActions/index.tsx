import { Button } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCreateCDPipeline } from '../../../../../../k8s/EDPCDPipeline/hooks/useCreateCDPipeline';
import { createCDPipelineInstance } from '../../../../../../k8s/EDPCDPipeline/utils/createCDPipelineInstance';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import {
  CREATE_EDIT_CD_PIPELINE_DIALOG_NAME,
  FORM_PART_PIPELINE,
  TAB_INDEXES,
} from '../../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import {
  CreateEditCDPipelineDialogForwardedProps,
  CreateEditCDPipelineFormValues,
} from '../../../../types';
import { FormActionsProps } from './types';

const TAB_INDEXES_LAST_INDEX = Object.keys(TAB_INDEXES).length - 1;

export const FormActions = ({
  setFormActiveTabIdx,
  formActiveTabIdx,
  setStages,
  stages,
}: FormActionsProps) => {
  const { closeDialog } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
    CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
  );

  const {
    reset,
    formState: { isDirty },
    trigger,
    handleSubmit,
  } = useFormContext<CreateEditCDPipelineFormValues>();

  const handleClose = React.useCallback(() => {
    closeDialog();
    reset();
    setFormActiveTabIdx(TAB_INDEXES[FORM_PART_PIPELINE]);
  }, [closeDialog, reset, setFormActiveTabIdx]);

  const handleResetFields = React.useCallback(() => {
    reset();
    setStages([]);
  }, [reset, setStages]);

  const activeTabFormPartName = React.useMemo(() => {
    const [validEntry] = Object.entries(TAB_INDEXES).filter(([, idx]) => idx === formActiveTabIdx);
    const [activeTabName] = validEntry;

    return activeTabName;
  }, [formActiveTabIdx]);

  const handleProceed = React.useCallback(async () => {
    const activeTabFormPartNames = Object.values(CDPIPELINE_FORM_NAMES)
      .filter(({ formPart }) => formPart === activeTabFormPartName)
      .map(({ name }) => name);

    const hasNoErrors = await trigger(activeTabFormPartNames);

    if (hasNoErrors) {
      setFormActiveTabIdx(formActiveTabIdx + 1);
    }
  }, [activeTabFormPartName, formActiveTabIdx, setFormActiveTabIdx, trigger]);

  const getFirstErrorTabName = React.useCallback((errors) => {
    const [firstErrorFieldName] = Object.keys(errors);
    return CDPIPELINE_FORM_NAMES[firstErrorFieldName].formPart;
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
    createCDPipeline,
    mutations: {
      CDPipelineCreateMutation,
      CDPipelineStageCreateMutation,
      CDPipelineDeleteMutation,
      CDPipelineStageDeleteMutation,
    },
  } = useCreateCDPipeline({
    onSuccess: handleClose,
  });

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
        CDPipelineStagesData: stages,
      });
    },
    [createCDPipeline, stages]
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
          disabled={!isDirty || isLoading || !stages.length}
        >
          apply
        </Button>
      )}
    </>
  );
};
