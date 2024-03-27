import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormCheckbox } from '../../../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { GitServerFormValues } from '../../../types';

export const SkipWebHookSSL = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<GitServerFormValues>();

  return (
    <FormCheckbox
      {...register(GIT_SERVER_FORM_NAMES.skipWebhookSSLVerification.name)}
      label={
        <FormControlLabelWithTooltip
          label={'Skip Webhook SSL Verification'}
          title="If enabled, the webhook SSL verification will be skipped."
        />
      }
      control={control}
      errors={errors}
    />
  );
};
