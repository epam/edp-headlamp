import React from 'react';
import { FormTextField } from '../../../../../../../providers/Form/components/FormTextField';
import { useGitServerFormsContext } from '../../../../../hooks/useGitServerFormsContext';
import { GIT_SERVER_FORM_NAMES } from '../../../../../names';

export const HTTPSPort = () => {
  const {
    forms: { gitServer: gitServerForm },
  } = useGitServerFormsContext();

  return (
    <FormTextField
      {...gitServerForm.form.register(GIT_SERVER_FORM_NAMES.httpsPort.name, {
        required: 'Specify the HTTPS port for Git server communication.',
        pattern: {
          value: /^(\d{1,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
          message: 'Enter correct https port',
        },
        setValueAs: (value: string) => (value ? Number(value) : value),
      })}
      label={'HTTPS port'}
      title={'Specify the HTTPS port used for Git server communication (the default value is 443).'}
      placeholder={'Enter HTTPS port'}
      control={gitServerForm.form.control}
      errors={gitServerForm.form.formState.errors}
      TextFieldProps={{
        type: 'number',
      }}
    />
  );
};
