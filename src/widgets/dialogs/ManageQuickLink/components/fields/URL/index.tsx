import React from 'react';
import { VALIDATED_PROTOCOL } from '../../../../../../constants/validatedProtocols';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { getValidURLPattern } from '../../../../../../utils/checks/getValidURLPattern';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { QUICK_LINK_FORM_NAMES } from '../../../names';

export const URL = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormTextField
      {...register(QUICK_LINK_FORM_NAMES.url.name, {
        required: 'Enter service endpoint URL.',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOL.HTTP_OR_HTTPS),
          message: 'Enter a valid URL with HTTP/HTTPS protocol.',
        },
      })}
      label={'URL'}
      title={
        'Specify the full URL including the protocol (e.g., https://example.com). This is the destination users will be redirected to when clicking the link.'
      }
      placeholder={'https://example.com'}
      control={control}
      errors={errors}
    />
  );
};
