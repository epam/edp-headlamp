import { Grid } from '@mui/material';
import { Alert } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CodemieKubeObject } from '../../../../../k8s/groups/EDP/Codemie';
import { CodemieProjectKubeObject } from '../../../../../k8s/groups/EDP/CodemieProject';
import { FormCheckbox } from '../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FieldEvent } from '../../../../../types/forms';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const CodemieIntegration = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext<CreateCodebaseFormValues>();

  const defaultNamespace = getDefaultNamespace();

  const [codemie, codemieError] = CodemieKubeObject.useGet('codemie', defaultNamespace);
  const [codemieProject, codemieProjectError] = CodemieProjectKubeObject.useGet(
    defaultNamespace,
    defaultNamespace
  );

  const hasCodemieAndProject = codemie && codemieProject;
  const noError = !codemieError && !codemieProjectError;
  const codemieStatusIsOk = codemie?.status?.connected === 'true';
  const codemieProjectStatusIsOk = codemieProject?.status?.value === 'created';

  return (
    <Grid container spacing={2}>
      {!hasCodemieAndProject ? (
        <Grid item xs={12}>
          <Alert severity="info" variant="outlined">
            There is no Codemie or CodemieProject available
          </Alert>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <FormCheckbox
              {...register(CODEBASE_FORM_NAMES.hasCodemieIntegration.name, {
                onChange: ({ target: { value } }: FieldEvent) => {
                  if (value) {
                    setValue(CODEBASE_FORM_NAMES.codemieIntegrationLabel.name, 'codemie');
                  } else {
                    setValue(CODEBASE_FORM_NAMES.codemieIntegrationLabel.name, undefined);
                  }
                },
              })}
              label={<FormControlLabelWithTooltip label={'Integrate with Codemie'} />}
              control={control}
              errors={errors}
              disabled={
                !hasCodemieAndProject || !codemieStatusIsOk || !codemieProjectStatusIsOk || !noError
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
