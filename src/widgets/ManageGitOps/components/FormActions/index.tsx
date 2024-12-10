import { Button, Grid, Tooltip } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { useCodebaseCRUD } from '../../../../k8s/groups/EDP/Codebase/hooks/useCodebaseCRUD';
import { createCodebaseInstance } from '../../../../k8s/groups/EDP/Codebase/utils/createCodebaseInstance';
import { useFormContext } from '../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CODEBASE_FORM_NAMES } from '../../names';
import { ManageGitOpsDataContext, ManageGitOpsValues, WidgetPermissions } from '../../types';

export const FormActions = ({ permissions }: { permissions: WidgetPermissions }) => {
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useReactHookFormContext<ManageGitOpsValues>();
  const {
    formData: { currentElement, handleClosePlaceholder, isReadOnly },
  } = useFormContext<ManageGitOpsDataContext>();

  const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';
  const mode = isPlaceholder ? FORM_MODES.CREATE : FORM_MODES.EDIT;

  const handleClose = React.useCallback(() => {
    reset();
    handleClosePlaceholder();
  }, [handleClosePlaceholder, reset]);

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
    async (values: ManageGitOpsValues) => {
      if (!permissions?.create?.Codebase.allowed) {
        return false;
      }

      const usedValues = getUsedValues(values, CODEBASE_FORM_NAMES);
      const codebaseData = createCodebaseInstance(CODEBASE_FORM_NAMES, usedValues);

      await createCodebase({
        codebaseData,
        codebaseAuthData: null,
      });
    },
    [createCodebase, permissions?.create?.Codebase.allowed]
  );

  return (
    <>
      <Grid container spacing={2} justifyContent={'space-between'}>
        <Grid item>
          {mode === FORM_MODES.CREATE && (
            <Button onClick={handleClosePlaceholder} size="small" component={'button'}>
              cancel
            </Button>
          )}
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item>
              <Button
                onClick={() => reset()}
                size="small"
                component={'button'}
                disabled={!isDirty || isReadOnly}
              >
                undo changes
              </Button>
            </Grid>
            <Grid item>
              <ConditionalWrapper
                condition={!permissions?.create?.Codebase.allowed}
                wrapper={(children) => (
                  <Tooltip title={permissions?.create?.Codebase.reason}>
                    <div>{children}</div>
                  </Tooltip>
                )}
              >
                <Button
                  type={'button'}
                  size={'small'}
                  component={'button'}
                  variant={'contained'}
                  color={'primary'}
                  disabled={isLoading || isReadOnly || !permissions?.create?.Codebase.allowed}
                  onClick={handleSubmit(onSubmit)}
                >
                  save
                </Button>
              </ConditionalWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
