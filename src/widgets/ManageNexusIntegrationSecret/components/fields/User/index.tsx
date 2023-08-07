import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { NEXUS_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageNexusIntegrationSecretFormDataContext } from '../../../types';

export const User = () => {
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
            {...register(NEXUS_INTEGRATION_SECRET_FORM_NAMES.username.name, {
                required: 'Enter user name',
            })}
            label={`User`}
            placeholder={'Enter user name'}
            control={control}
            errors={errors}
            disabled={isReadOnly}
        />
    );
};
