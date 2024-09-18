import React from 'react';
import { VALIDATED_PROTOCOLS } from '../../../../../../../constants/validatedProtocols';
import { FormTextField } from '../../../../../../../providers/Form/components/FormTextField';
import { getValidURLPattern } from '../../../../../../../utils/checks/getValidURLPattern';
import { useFormsContext } from '../../../../../hooks/useFormsContext';
import { GIT_SERVER_FORM_NAMES } from '../../../../../names';

export const HostName = () => {
  const {
    forms: { gitServer: gitServerForm },
  } = useFormsContext();

  return (
    <FormTextField
      {...gitServerForm.form.register(GIT_SERVER_FORM_NAMES.gitHost.name, {
        required: 'Enter the Git server hostname or IP address. ',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOLS.NO_PROTOCOL),
          message: 'Enter a valid URL without protocol.',
        },
      })}
      label={'Host'}
      title={'Enter the hostname or IP address of your Git Server (e.g.,  github.com).'}
      placeholder={'host-name.com'}
      control={gitServerForm.form.control}
      errors={gitServerForm.form.formState.errors}
    />
  );
};
