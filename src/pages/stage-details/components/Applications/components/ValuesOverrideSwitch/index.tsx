import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormSwitch } from '../../../../../../providers/Form/components/FormSwitch';
import {
  ALL_VALUES_OVERRIDE_KEY,
  APPLICATIONS_TABLE_MODE,
  VALUES_OVERRIDE_POSTFIX,
} from '../../../../constants';
import { ValuesOverrideSwitchProps } from './types';

export const ValuesOverrideSwitch = ({
  enrichedApplicationWithArgoApplication,
  mode,
}: ValuesOverrideSwitchProps) => {
  const { application } = enrichedApplicationWithArgoApplication;
  const {
    control,
    formState: { errors },
    register,
    setValue,
    getValues,
  } = useFormContext();

  return (
    <div style={{ width: '100%' }}>
      <FormSwitch
        label={undefined}
        {...register(`${application.metadata.name}${VALUES_OVERRIDE_POSTFIX}`, {
          onChange: () => {
            const hasAtLeastOneFalse = Object.entries(getValues())
              .filter(([key]) => key.includes(VALUES_OVERRIDE_POSTFIX))
              .some(([, value]) => value === false);

            setValue(ALL_VALUES_OVERRIDE_KEY, !hasAtLeastOneFalse);
          },
        })}
        align={'center'}
        control={control}
        errors={errors}
        disabled={mode === APPLICATIONS_TABLE_MODE.PREVIEW}
      />
    </div>
  );
};
