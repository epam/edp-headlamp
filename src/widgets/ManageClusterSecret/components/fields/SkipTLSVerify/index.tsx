import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormCheckbox } from '../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { CLUSTER_FORM_NAMES } from '../../../names';
import { ManageClusterSecretDataContext } from '../../../types';

export const SkipTLSVerify = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { mode, ownerReference },
  } = useFormContext<ManageClusterSecretDataContext>();

  return (
    <FormCheckbox
      {...register(CLUSTER_FORM_NAMES.SKIP_TLS_VERIFY)}
      label={
        <FormControlLabelWithTooltip
          label={'Skip TLS verification'}
          disabled={mode === FORM_MODES.EDIT && !!ownerReference}
        />
      }
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && !!ownerReference}
    />
  );
};
