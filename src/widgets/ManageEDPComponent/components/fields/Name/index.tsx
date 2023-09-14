import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { EDP_COMPONENT_FORM_NAMES } from '../../../names';
import { ManageEDPComponentValues } from '../../../types';

export const Name = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageEDPComponentValues>();

    return (
        <FormTextField
            {...register(EDP_COMPONENT_FORM_NAMES.name.name, {
                required: 'Enter component name',
            })}
            label={'Name'}
            placeholder={'My component name'}
            control={control}
            errors={errors}
        />
    );
};
