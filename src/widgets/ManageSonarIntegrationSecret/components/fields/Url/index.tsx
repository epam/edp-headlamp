import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { SONAR_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageSonarIntegrationSecretFormDataContext } from '../../../types';

export const Url = () => {
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
            {...register(SONAR_INTEGRATION_SECRET_FORM_NAMES.url.name, {
                required: 'Enter the SonarQube URL.',
                pattern: {
                    value: /^(?!\/).*(?<!\/)$/,
                    message: 'Path cannot start or end with slash symbol',
                },
            })}
            label={'URL'}
            title={
                'Enter the URL of your SonarQube instance. This is typically the address where SonarQube is hosted (e.g., https://sonarqube.example.com:9000).'
            }
            placeholder={'Enter URL'}
            control={control}
            errors={errors}
            disabled={isReadOnly}
        />
    );
};
