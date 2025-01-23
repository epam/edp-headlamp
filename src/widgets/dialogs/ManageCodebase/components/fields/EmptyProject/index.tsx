import React from 'react';
import { FormCheckbox } from '../../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const EmptyProject = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormCheckbox
      {...register(CODEBASE_FORM_NAMES.emptyProject.name)}
      label={
        <FormControlLabelWithTooltip
          label={'Empty project'}
          title={
            'An empty project does not contain any template code. However, KubeRocketCI pipelines and deployment templates will be created'
          }
        />
      }
      control={control}
      errors={errors}
    />
  );
};
