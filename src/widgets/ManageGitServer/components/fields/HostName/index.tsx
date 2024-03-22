import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { VALIDATED_PROTOCOLS } from '../../../../../constants/validatedProtocols';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { getValidURLPattern } from '../../../../../utils/checks/getValidURLPattern';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerValues } from '../../../types';

export const HostName = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext<ManageGitServerValues>();

  return (
    <FormTextField
      {...register(GIT_SERVER_FORM_NAMES.gitHost.name, {
        required: 'Enter the Git server hostname or IP address. ',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOLS.NO_PROTOCOL),
          message: 'Enter a valid URL without protocol.',
        },
      })}
      label={'Host'}
      title={'Enter the hostname or IP address of your Git Server (e.g.,  github.com).'}
      placeholder={'host-name.com'}
      control={control}
      errors={errors}
    />
  );
};
