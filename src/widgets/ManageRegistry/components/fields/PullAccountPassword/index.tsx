import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { REGISTRY_NAMES } from '../../../names';
import { ManageRegistryDataContext } from '../../../types';

export const PullAccountPassword = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { pullAccountSecret },
  } = useFormContext<ManageRegistryDataContext>();

  const ownerReference = pullAccountSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextFieldPassword
      {...register(REGISTRY_NAMES.PULL_ACCOUNT_PASSWORD, {
        required: 'Enter password or token',
      })}
      label={`Password / Token`}
      title={
        'Enter the confidential combination used for authenticating your access to the container registry.'
      }
      placeholder={'Enter password or token'}
      control={control}
      errors={errors}
      TextFieldProps={{
        helperText: `This field value is managed by ${ownerReference}`,
      }}
      disabled={!!ownerReference}
    />
  );
};
