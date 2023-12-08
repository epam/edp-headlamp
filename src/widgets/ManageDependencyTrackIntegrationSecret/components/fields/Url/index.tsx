import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageDependencyTrackIntegrationSecretFormDataContext } from '../../../types';

export const Url = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    const {
        formData: { isReadOnly },
    } = useFormContext<ManageDependencyTrackIntegrationSecretFormDataContext>();

    return (
        <FormTextField
            {...register(DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES.url.name, {
                required: 'Enter the DependencyTrack URL.',
                pattern: {
                    value: /^(?!\/).*(?<!\/)$/,
                    message: 'Path cannot start or end with slash symbol',
                },
            })}
            label={'URL'}
            title={
                'Enter the URL of your DependencyTrack instance. This is typically the address where DependencyTrack is hosted (e.g., https://deptrack.example.com).'
            }
            placeholder={'Enter URL'}
            control={control}
            errors={errors}
            disabled={isReadOnly}
        />
    );
};
