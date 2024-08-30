import { Alert, Grid } from '@mui/material';
import React from 'react';
import { CodemieKubeObject } from '../../../../../../k8s/groups/EDP/Codemie';
import { CodemieProjectKubeObject } from '../../../../../../k8s/groups/EDP/CodemieProject';
import { FormCheckbox } from '../../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FieldEvent, FORM_MODES } from '../../../../../../types/forms';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';

export const CodemieIntegration = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useTypedFormContext();

  const {
    props: { codebaseData },
  } = useCurrentDialog();

  const mode = codebaseData ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const defaultNamespace = getDefaultNamespace();

  const [codemie, codemieError] = CodemieKubeObject.useGet('codemie', defaultNamespace);
  const [codemieProject, codemieProjectError] = CodemieProjectKubeObject.useGet(
    defaultNamespace,
    defaultNamespace
  );

  const hasCodemieAndProject = codemie && codemieProject;
  const hasError = codemieError || codemieProjectError;
  const codemieStatusIsOk = !!codemie?.status?.connected;
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
                !hasCodemieAndProject ||
                !codemieStatusIsOk ||
                !codemieProjectStatusIsOk ||
                !!hasError ||
                mode === FORM_MODES.EDIT
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
