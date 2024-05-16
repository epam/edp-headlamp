import React from 'react';
import { FormTextField } from '../../../../../../../../providers/Form/components/FormTextField';
import { useGitServerFormsContext } from '../../../../../../hooks/useGitServerFormsContext';
import { GIT_SERVER_FORM_NAMES } from '../../../../../../names';

export const SSHPort = () => {
  const {
    forms: { gitServer: gitServerForm },
  } = useGitServerFormsContext();

  return (
    <FormTextField
      {...gitServerForm.form.register(GIT_SERVER_FORM_NAMES.sshPort.name, {
        required: 'Enter the SSH port for Git server communication.',
        pattern: {
          value: /^(\d{1,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
          message: 'Enter correct ssh port',
        },
        setValueAs: (value: string) => (value ? Number(value) : value),
      })}
      label={'SSH port'}
      title={'Specify the SSH port used for Git server communication (default is 22).'}
      placeholder={'Enter SSH port'}
      control={gitServerForm.form.control}
      errors={gitServerForm.form.formState.errors}
      TextFieldProps={{
        type: 'number',
      }}
    />
  );
};
