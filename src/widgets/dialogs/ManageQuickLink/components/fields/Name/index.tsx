import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { QUICK_LINK_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';

export const Name = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  const {
    props: { isSystem },
  } = useCurrentDialog();

  return (
    <FormTextField
      {...register(QUICK_LINK_FORM_NAMES.name.name, {
        required: 'Enter a component name.',
      })}
      label={'Name'}
      title={
        'Enter a service name for the link. This name will be displayed on the overview page. Ensure the name is in lowercase.'
      }
      placeholder={'My component name'}
      control={control}
      errors={errors}
      disabled={isSystem}
    />
  );
};
