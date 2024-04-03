import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { VALIDATED_PROTOCOLS } from '../../../../../constants/validatedProtocols';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { getValidURLPattern } from '../../../../../utils/checks/getValidURLPattern';
import { CLUSTER_CREATION_FORM_NAMES } from '../../../names';
import { ManageClusterSecretValues } from '../../../types';

export const ClusterHost = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext<ManageClusterSecretValues>();

  return (
    <FormTextField
      {...register(CLUSTER_CREATION_FORM_NAMES.clusterHost.name, {
        required: 'Enter the cluster URL assigned to the host.',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOLS.STRICT_HTTPS),
          message: 'Enter a valid URL with HTTPS protocol.',
        },
      })}
      label={'Cluster Host'}
      //@ts-ignore
      title={
        <>
          <p>
            Enter cluster’s endpoint URL (e.g., <em>example-cluster-domain.com)</em>.
          </p>
        </>
      }
      placeholder={'Enter cluster host'}
      control={control}
      errors={errors}
    />
  );
};
