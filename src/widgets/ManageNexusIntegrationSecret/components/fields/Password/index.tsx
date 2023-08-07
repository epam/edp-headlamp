import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { NEXUS_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageNexusIntegrationSecretFormDataContext } from '../../../types';

export const Password = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    const {
        formData: { isReadOnly },
    } = useFormContext<ManageNexusIntegrationSecretFormDataContext>();

    return (
        <FormTextField
            {...register(NEXUS_INTEGRATION_SECRET_FORM_NAMES.password.name, {
                required: 'Enter password',
            })}
            label={`Password`}
            placeholder={'Enter password'}
            control={control}
            errors={errors}
            TextFieldProps={{ type: 'password' }}
            disabled={isReadOnly}
        />
    );
};
