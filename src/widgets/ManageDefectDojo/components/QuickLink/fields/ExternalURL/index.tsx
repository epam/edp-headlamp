import React from 'react';
import { VALIDATED_PROTOCOL } from '../../../../../../constants/validatedProtocols';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FORM_MODES } from '../../../../../../types/forms';
import { getValidURLPattern } from '../../../../../../utils/checks/getValidURLPattern';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { INTEGRATION_SECRET_FORM_NAMES, QUICK_LINK_FORM_NAMES } from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

export const ExternalURL = () => {
  const {
    forms: {
      secret,
      quickLink: {
        form: {
          register,
          control,
          formState: { errors },
        },
      },
    },
  } = useFormsContext();

  const { quickLink, mode } = useDataContext();

  return (
    <FormTextField
      {...register(QUICK_LINK_FORM_NAMES.externalUrl.name, {
        required: 'Enter the external DefectDojo URL.',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOL.STRICT_HTTPS),
          message: 'Enter a valid URL with HTTPS protocol.',
        },
        onChange: ({ target: { value } }) => {
          if (mode === FORM_MODES.EDIT) {
            return;
          }

          secret.form.setValue(INTEGRATION_SECRET_FORM_NAMES.url.name, value);
        },
      })}
      label={'Quick Link URL'}
      title={'Enter the external URL of your DefectDojo instance.'}
      placeholder={'Enter URL'}
      control={control}
      errors={errors}
      disabled={!quickLink}
    />
  );
};
