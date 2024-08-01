import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FORM_MODES } from '../../../../../../types/forms';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { INTEGRATION_SECRET_FORM_NAMES } from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

export const AssistantId = () => {
  const {
    forms: {
      secret: {
        form: {
          register,
          control,
          formState: { errors },
        },
      },
    },
  } = useFormsContext();

  const { mode, ownerReference } = useDataContext();

  return (
    <FormTextField
      {...register(INTEGRATION_SECRET_FORM_NAMES.assistantId.name, {
        required: 'Enter Assistant ID.',
      })}
      label={'Assistant ID'}
      placeholder={'Enter password'}
      control={control}
      errors={errors}
      disabled={mode === FORM_MODES.EDIT && !!ownerReference}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
    />
  );
};
