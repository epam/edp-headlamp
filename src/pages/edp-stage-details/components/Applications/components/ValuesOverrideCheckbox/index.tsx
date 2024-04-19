import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormSwitch } from '../../../../../../providers/Form/components/FormSwitch';
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
    setValue,
  } = useFormContext();

  React.useEffect(() => {
    setValue(`${application.metadata.name}::values-override`, defaultValue);
  }, [application.metadata.name, defaultValue, setValue]);

  return (
    <div style={{ width: '100%' }}>
      <FormSwitch
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
