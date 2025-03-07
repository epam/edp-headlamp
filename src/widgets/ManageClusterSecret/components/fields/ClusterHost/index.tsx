import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { VALIDATED_PROTOCOL } from '../../../../../constants/validatedProtocols';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { getValidURLPattern } from '../../../../../utils/checks/getValidURLPattern';
import { CLUSTER_FORM_NAMES } from '../../../names';
import { ManageClusterSecretDataContext, ManageClusterSecretValues } from '../../../types';

export const ClusterHost = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext<ManageClusterSecretValues>();

  const {
    formData: { mode, ownerReference },
  } = useFormContext<ManageClusterSecretDataContext>();

  return (
    <FormTextField
      {...register(CLUSTER_FORM_NAMES.CLUSTER_HOST, {
        required: 'Enter the cluster URL assigned to the host.',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOL.STRICT_HTTPS),
          message: 'Enter a valid URL with HTTPS protocol.',
        },
      })}
      label={'Cluster Host'}
      //@ts-ignore
      title={
        <>
          <p>
            Enter cluster’s endpoint URL (e.g., <em>https://example-cluster-domain.com)</em>.
          </p>
        </>
      }
      placeholder={'Enter cluster host'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && !!ownerReference}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
