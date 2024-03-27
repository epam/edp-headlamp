import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../../../providers/Form/components/FormTextField';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { GitServerFormValues } from '../../../types';

export const HTTPSPort = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<GitServerFormValues>();

  return (
    <FormTextField
      {...register(GIT_SERVER_FORM_NAMES.httpsPort.name, {
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
      control={control}
      errors={errors}
      TextFieldProps={{
        type: 'number',
      }}
    />
  );
};
