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
                required: 'Enter service endpoint URL.',
            })}
            label={'URL'}
            title={
                'Specify the full URL including the protocol (e.g., https://example.com). This is the destination users will be redirected to when clicking the link.'
            }
            placeholder={'https://example.com'}
            control={control}
            errors={errors}
        />
    );
};
