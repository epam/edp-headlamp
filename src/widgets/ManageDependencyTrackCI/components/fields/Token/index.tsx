import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageDependencyTrackIntegrationSecretFormDataContext } from '../../../types';

export const Token = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    const {
        formData: { ownerReference },
    } = useFormContext<ManageDependencyTrackIntegrationSecretFormDataContext>();

    return (
        <FormTextFieldPassword
            {...register(DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES.token.name, {
                required: 'Enter the API token for DependencyTrack authentication.',
            })}
            label={`Token`}
            title={
                'Provide an API token for authentication with DependencyTrack. Generate the token from your DependencyTrack instance.'
            }
            placeholder={'Enter token'}
            control={control}
            errors={errors}
            disabled={!!ownerReference}
        />
    );
};
