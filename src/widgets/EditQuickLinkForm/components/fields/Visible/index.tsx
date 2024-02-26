import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormCheckbox } from '../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { QUICK_LINK_FORM_NAMES } from '../../../names';
import { ManageQuickLinkValues } from '../../../types';

export const Visible = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext<ManageQuickLinkValues>();

  return (
    <FormCheckbox
      {...register(QUICK_LINK_FORM_NAMES.visible.name)}
      label={
        <FormControlLabelWithTooltip
          label={'Show on Overview Page'}
          title="Display this component in the Overview page for quick access."
        />
      }
      control={control}
      errors={errors}
    />
  );
};
