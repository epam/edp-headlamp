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
                required: 'Enter a component name.',
            })}
            label={'Name'}
            title={
                'Enter a service name for the link. This name will be displayed on the overview page. Ensure the name is in lowercase.'
            }
            placeholder={'My component name'}
            control={control}
            errors={errors}
        />
    );
};
