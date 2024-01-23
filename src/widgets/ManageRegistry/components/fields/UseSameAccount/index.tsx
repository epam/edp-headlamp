import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormCheckbox } from '../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FieldEvent } from '../../../../../types/forms';
import { REGISTRY_NAMES } from '../../../names';

export const UseSameAccount = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const pushAccountUserNameFieldValue = watch(REGISTRY_NAMES.PUSH_ACCOUNT_USER);
  const pushAccountPasswordFieldValue = watch(REGISTRY_NAMES.PUSH_ACCOUNT_PASSWORD);

  return (
    <FormCheckbox
      {...register(REGISTRY_NAMES.USE_SAME_ACCOUNT, {
        onChange: ({ target: { value } }: FieldEvent) => {
          if (value) {
            setValue(REGISTRY_NAMES.PULL_ACCOUNT_USER, pushAccountUserNameFieldValue);
            setValue(REGISTRY_NAMES.PULL_ACCOUNT_PASSWORD, pushAccountPasswordFieldValue);
          }
        },
      })}
      label={
        <FormControlLabelWithTooltip
          label={`Use the Push Account's credentials`}
          title={'Enables using the same account for both pull and push purposes.'}
        />
      }
      control={control}
      errors={errors}
    />
  );
};
