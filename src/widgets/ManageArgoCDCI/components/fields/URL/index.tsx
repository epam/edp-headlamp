import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldEditable } from '../../../../../providers/Form/components/FormTextFieldEditable';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { ARGOCD_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageArgoCDIntegrationSecretFormDataContext } from '../../../types';

export const URL = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext();

  const {
    formData: { mode, ownerReference },
  } = useFormContext<ManageArgoCDIntegrationSecretFormDataContext>();

  return (
    <FormTextFieldEditable
      {...register(ARGOCD_INTEGRATION_SECRET_FORM_NAMES.url.name, {
        required: 'Enter the Argo CD URL.',
        pattern: {
          value: /^(?!\/).*(?<!\/)$/,
          message: 'Path cannot start or end with slash symbol',
        },
      })}
      label={'URL'}
      title={'Enter the URL of your Argo CD instance.'}
      placeholder={'Enter URL'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && !!ownerReference}
    />
  );
};
