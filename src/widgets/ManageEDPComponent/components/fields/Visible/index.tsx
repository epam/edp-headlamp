import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormCheckbox } from '../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { EDP_COMPONENT_FORM_NAMES } from '../../../names';
import { ManageEDPComponentValues } from '../../../types';

export const Visible = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useReactHookFormContext<ManageEDPComponentValues>();

  return (
    <FormCheckbox
      {...register(EDP_COMPONENT_FORM_NAMES.visible.name)}
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
