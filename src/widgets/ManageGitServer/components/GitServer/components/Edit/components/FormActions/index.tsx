import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CRUD_TYPES } from '../../../../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../../../../hooks/useResourceCRUDMutation';
import { editResource } from '../../../../../../../../k8s/common/editResource';
import { EDPGitServerKubeObject } from '../../../../../../../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../../../../../../../k8s/EDPGitServer/types';
import { getUsedValues } from '../../../../../../../../utils/forms/getUsedValues';
import { useDataContext } from '../../../../../../providers/Data/hooks';
import { GIT_SERVER_FORM_NAMES } from '../../../../names';
import { GitServerFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useFormContext<GitServerFormValues>();

  const { gitServer } = useDataContext();

  const gitServerEditMutation = useResourceCRUDMutation<
    EDPGitServerKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('gitServerEditMutation', EDPGitServerKubeObject, CRUD_TYPES.EDIT);

  const onSubmit = React.useCallback(
    async (values: GitServerFormValues) => {
      const transformedValues = {
        ...values,
        sshPort: Number(values.sshPort),
        httpsPort: Number(values.httpsPort),
      };
      const gitServerValues = getUsedValues(transformedValues, GIT_SERVER_FORM_NAMES);

      const newGitServer = editResource(GIT_SERVER_FORM_NAMES, gitServer, gitServerValues);
      gitServerEditMutation.mutate(newGitServer);
    },
    [gitServer, gitServerEditMutation]
  );

  const isLoading = gitServerEditMutation.isLoading;

  return (
    <>
      <Grid container spacing={2} justifyContent={'flex-end'}>
        <Grid item>
          <Button onClick={() => reset()} size="small" component={'button'} disabled={!isDirty}>
            undo changes
          </Button>
        </Grid>
        <Grid item>
          <Button
            type={'button'}
            size={'small'}
            component={'button'}
            variant={'contained'}
            color={'primary'}
            disabled={isLoading || !isDirty}
            onClick={handleSubmit(onSubmit)}
          >
            save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
