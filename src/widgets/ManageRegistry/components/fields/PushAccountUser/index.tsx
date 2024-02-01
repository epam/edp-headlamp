import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FieldEvent } from '../../../../../types/forms';
import { REGISTRY_NAMES } from '../../../names';
import { ManageRegistryDataContext } from '../../../types';

export const PushAccountUser = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useReactHookFormContext();

  const {
    formData: { pushAccountSecret },
  } = useFormContext<ManageRegistryDataContext>();

  const useSameAccountFieldValue = watch(REGISTRY_NAMES.USE_SAME_ACCOUNT);

  const ownerReference = pushAccountSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextField
      {...register(REGISTRY_NAMES.PUSH_ACCOUNT_USER, {
        required: 'Enter user name',
        onChange: ({ target: { value } }: FieldEvent) => {
          if (!useSameAccountFieldValue) {
            return;
          }

          setValue(REGISTRY_NAMES.PULL_ACCOUNT_USER, value);
        },
      })}
      label={`User`}
      title={'Provide the unique identifier linked to your user account on the container registry.'}
      placeholder={'Enter user name'}
      control={control}
      errors={errors}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
      disabled={!!ownerReference}
    />
  );
};
