import React from 'react';
import { FormTextField } from '../../../../../../../providers/Form/components/FormTextField';
import { useFormsContext } from '../../../../../hooks/useFormsContext';
import { GIT_SERVER_FORM_NAMES } from '../../../../../names';

export const WebHookURL = () => {
  const {
    forms: { gitServer: gitServerForm },
  } = useFormsContext();

  const overrideWebhookURLFieldValue = gitServerForm.form.watch(
    GIT_SERVER_FORM_NAMES.overrideWebhookURL.name
  );

  return (
    <FormTextField
      {...gitServerForm.form.register(GIT_SERVER_FORM_NAMES.webhookURL.name, {
        required: overrideWebhookURLFieldValue
          ? 'Enter the WebHook URL for repository event notifications.'
          : false,
      })}
      label={'Webhook URL'}
      title={`URL for Git server event notifications like push operations. Must be accessible from the Git Server's network.`}
      placeholder={'https://example.com'}
      control={gitServerForm.form.control}
      errors={gitServerForm.form.formState.errors}
      disabled={!overrideWebhookURLFieldValue}
    />
  );
};
