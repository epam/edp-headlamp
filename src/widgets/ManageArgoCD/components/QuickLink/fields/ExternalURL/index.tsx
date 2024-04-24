import React from 'react';
import { VALIDATED_PROTOCOLS } from '../../../../../../constants/validatedProtocols';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FORM_MODES } from '../../../../../../types/forms';
import { getValidURLPattern } from '../../../../../../utils/checks/getValidURLPattern';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { INTEGRATION_SECRET_FORM_NAMES, QUICK_LINK_FORM_NAMES } from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

export const ExternalURL = () => {
  const {
    forms: {
      quickLink: {
        form: {
          register,
          control,
          formState: { errors },
          setValue,
        },
      },
    },
  } = useFormsContext();

  const { quickLink, mode } = useDataContext();

  return (
    <FormTextField
      {...register(QUICK_LINK_FORM_NAMES.externalUrl.name, {
        required: 'Enter the external ArgoCD URL.',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOLS.STRICT_HTTPS),
          message: 'Enter a valid URL with HTTPS protocol.',
        },
        onChange: ({ target: { value } }) => {
          if (mode === FORM_MODES.EDIT) {
            return;
          }

          setValue(INTEGRATION_SECRET_FORM_NAMES.url.name, value);
        },
      })}
      label={'Quick Link URL'}
      title={'Enter the external URL of your ArgoCD instance.'}
      placeholder={'Enter URL'}
      control={control}
      errors={errors}
      disabled={!quickLink}
    />
  );
};
