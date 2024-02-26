import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useSpecificDialogContext } from '../../../../../providers/Dialog/hooks';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { MANAGE_QUICK_LINK_DIALOG_NAME } from '../../../constants';
import { QUICK_LINK_FORM_NAMES } from '../../../names';
import { ManageQuickLinkDialogForwardedProps, ManageQuickLinkValues } from '../../../types';

export const Name = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext<ManageQuickLinkValues>();

  const {
    forwardedProps: { isSystem },
  } = useSpecificDialogContext<ManageQuickLinkDialogForwardedProps>(MANAGE_QUICK_LINK_DIALOG_NAME);

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
