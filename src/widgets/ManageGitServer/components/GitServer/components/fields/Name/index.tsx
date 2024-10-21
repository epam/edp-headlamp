import React from 'react';
import { FormTextField } from '../../../../../../../providers/Form/components/FormTextField';
import { FORM_MODES } from '../../../../../../../types/forms';
import { useFormsContext } from '../../../../../hooks/useFormsContext';
import { GIT_SERVER_FORM_NAMES } from '../../../../../names';

export const Name = () => {
  const {
    forms: { gitServer: gitServerForm },
  } = useFormsContext();

  return (
    <FormTextField
      {...gitServerForm.form.register(GIT_SERVER_FORM_NAMES.name.name, {
        required: 'Enter the Git server name.',
        pattern: {
          value: /^[a-z]+$/,
          message: 'The name should contain lowercase letters only.',
        },
      })}
      label={'Name'}
      title={'Enter the name of your Git Server (e.g., my-github).'}
      placeholder={'my-github'}
      control={gitServerForm.form.control}
      errors={gitServerForm.form.formState.errors}
      disabled={gitServerForm.mode === FORM_MODES.EDIT}
    />
  );
};
