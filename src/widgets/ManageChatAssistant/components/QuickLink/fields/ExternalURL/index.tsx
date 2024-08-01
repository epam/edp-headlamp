import React from 'react';
import { VALIDATED_PROTOCOLS } from '../../../../../../constants/validatedProtocols';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { getValidURLPattern } from '../../../../../../utils/checks/getValidURLPattern';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { QUICK_LINK_FORM_NAMES } from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

export const ExternalURL = () => {
  const {
    forms: {
      quickLink: {
        form: {
          register,
          control,
          formState: { errors },
        },
      },
    },
  } = useFormsContext();

  const { quickLink } = useDataContext();

  return (
    <FormTextField
      {...register(QUICK_LINK_FORM_NAMES.externalUrl.name, {
        required: 'Enter the external CodeMie URL.',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOLS.STRICT_HTTPS),
          message: 'Enter a valid URL with HTTPS protocol.',
        },
      })}
      label={'Quick Link URL'}
      title={'Enter the external URL of your CodeMie instance.'}
      placeholder={'Enter URL'}
      control={control}
      errors={errors}
      disabled={!quickLink}
    />
  );
};
