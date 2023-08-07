import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { SONAR_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageSonarIntegrationSecretFormDataContext } from '../../../types';

export const Secret = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    const {
        formData: { isReadOnly },
    } = useFormContext<ManageSonarIntegrationSecretFormDataContext>();

    return (
        <FormTextField
            {...register(SONAR_INTEGRATION_SECRET_FORM_NAMES.secret.name, {
                required: 'Enter secret',
            })}
            label={`Secret`}
            placeholder={'Enter secret'}
            control={control}
            errors={errors}
            TextFieldProps={{ type: 'password' }}
            disabled={isReadOnly}
        />
    );
};
