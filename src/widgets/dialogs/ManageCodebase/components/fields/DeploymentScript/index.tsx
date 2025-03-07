import React from 'react';
import { DEPLOYMENT_SCRIPT } from '../../../../../../constants/deploymentScripts';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const DeploymentScript = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  const options = Object.values(DEPLOYMENT_SCRIPT).map((script) => ({
    label: script,
    value: script,
  }));

  return (
    <FormSelect
      {...register(CODEBASE_FORM_NAMES.deploymentScript.name, {
        required: 'Select the deployment script',
      })}
      label={'Deployment Options'}
      title={
        <>
          Select the deployment approach that best suits your target environment:
          <ul>
            <li>
              <strong>Helm</strong>: Deploy applications within Kubernetes clusters.
            </li>
            <li>
              <strong>RPM</strong>: Install applications on RPM-based Linux distributions.
            </li>
          </ul>
        </>
      }
      control={control}
      errors={errors}
      options={options}
    />
  );
};
