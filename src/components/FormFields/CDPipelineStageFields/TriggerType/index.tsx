import React from 'react';
import { useFormContext } from 'react-hook-form';
import { triggerTypeSelectOptions } from '../../../../configs/select-options/triggerTypes';
import { FormSelect } from '../../../../providers/Form/components/FormSelect';
import { FieldEvent } from '../../../../types/forms';
import { TriggerTypeProps } from './types';

export const TriggerType = ({ names, handleFormFieldChange }: TriggerTypeProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormSelect
            {...register(names.triggerType.name, {
                required: 'Select trigger type',
                onChange: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Trigger type'}
            placeholder={'Select trigger type'}
            control={control}
            errors={errors}
            options={triggerTypeSelectOptions}
        />
    );
};
