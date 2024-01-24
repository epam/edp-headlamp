import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormCheckbox } from '../../../../../../providers/Form/components/FormCheckbox';
import { ValuesOverrideCheckboxProps } from './types';

export const ValuesOverrideCheckbox = ({
  enrichedApplicationWithArgoApplication,
  selected,
  handleSelectRowClick,
  defaultValue,
}: ValuesOverrideCheckboxProps) => {
  const { application } = enrichedApplicationWithArgoApplication;
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <div style={{ width: '100%' }}>
      <FormCheckbox
        label={undefined}
        {...register(`${application.metadata.name}::values-override`, {
          onChange: (event) =>
            !selected.includes(application.metadata.name) &&
            handleSelectRowClick(event, enrichedApplicationWithArgoApplication),
        })}
        align={'center'}
        defaultValue={defaultValue}
        control={control}
        errors={errors}
      />
    </div>
  );
};
