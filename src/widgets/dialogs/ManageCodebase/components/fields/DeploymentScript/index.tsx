import React from 'react';
import { DEPLOYMENT_SCRIPTS } from '../../../../../../constants/deploymentScripts';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const DeploymentScript = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  const options = Object.values(DEPLOYMENT_SCRIPTS).map((script) => ({
    label: script,
    value: script,
  }));

  return (
    <FormSelect
      {...register(CODEBASE_FORM_NAMES.deploymentScript.name, {
        required: 'Select the deployment script',
      })}
      label={'Deployment Options'}
      title={'Choose the deployment script'}
      control={control}
      errors={errors}
      options={options}
    />
  );
};
