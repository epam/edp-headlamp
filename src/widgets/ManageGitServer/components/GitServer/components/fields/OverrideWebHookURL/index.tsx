import React from 'react';
import { FormCheckbox } from '../../../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { useFormsContext } from '../../../../../hooks/useFormsContext';
import { GIT_SERVER_FORM_NAMES } from '../../../../../names';

export const OverrideWebhookURL = () => {
  const {
    forms: { gitServer: gitServerForm },
  } = useFormsContext();

  return (
    <FormCheckbox
      {...gitServerForm.form.register(GIT_SERVER_FORM_NAMES.overrideWebhookURL.name)}
      label={
        <FormControlLabelWithTooltip
          label={'Override Webhook URL'}
          title="If enabled, the override Webhook URL will be used instead of the default one."
        />
      }
      control={gitServerForm.form.control}
      errors={gitServerForm.form.formState.errors}
    />
  );
};
