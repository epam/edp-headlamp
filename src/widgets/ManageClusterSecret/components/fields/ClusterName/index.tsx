import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { CLUSTER_CREATION_FORM_NAMES } from '../../../names';
import { ManageClusterSecretDataContext, ManageClusterSecretValues } from '../../../types';

export const ClusterName = () => {
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
      {...register(CLUSTER_CREATION_FORM_NAMES.clusterName.name, {
        required: 'Enter a name for the cluster.',
      })}
      label={'Cluster Name'}
      title={'Provide a unique and descriptive name for the new cluster.'}
      placeholder={'Enter cluster name'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT || !!ownerReference}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
