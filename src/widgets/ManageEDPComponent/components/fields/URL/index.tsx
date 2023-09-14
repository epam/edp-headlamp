import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { EDP_COMPONENT_FORM_NAMES } from '../../../names';
import { ManageEDPComponentValues } from '../../../types';

export const URL = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageEDPComponentValues>();

    return (
        <FormTextField
            {...register(EDP_COMPONENT_FORM_NAMES.url.name, {
                required: 'Enter component url',
            })}
            label={'URL'}
            placeholder={'https://example.com'}
            control={control}
            errors={errors}
        />
    );
};
