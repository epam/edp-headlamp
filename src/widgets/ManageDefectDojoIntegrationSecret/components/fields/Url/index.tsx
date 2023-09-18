import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageDefectDojoIntegrationSecretFormDataContext } from '../../../types';

export const Url = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    const {
        formData: { isReadOnly },
    } = useFormContext<ManageDefectDojoIntegrationSecretFormDataContext>();

    return (
        <FormTextField
            {...register(DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.url.name, {
                required: 'Enter URL',
                pattern: {
                    value: /^(?!\/).*(?<!\/)$/,
                    message: 'Path cannot start or end with slash symbol',
                },
            })}
            label={`URL`}
            placeholder={'Enter URL'}
            control={control}
            errors={errors}
            disabled={isReadOnly}
        />
    );
};
