import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { CLUSTER_FORM_NAMES } from '../../../names';
import { ManageClusterSecretDataContext, ManageClusterSecretValues } from '../../../types';

export const ClusterCertificate = () => {
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
      {...register(CLUSTER_FORM_NAMES.CLUSTER_CERTIFICATE, {
        required: 'Paste the cluster certificate.',
      })}
      label={'Cluster Certificate'}
      title={
        'Provide a Kubernetes  certificate required for proper authentication. Take this certificate from the config file of the user you are going to access the cluster.'
      }
      placeholder={'Enter cluster certificate'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && !!ownerReference}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
