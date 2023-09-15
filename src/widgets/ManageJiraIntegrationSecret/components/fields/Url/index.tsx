import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { JIRA_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageJiraIntegrationSecretFormDataContext } from '../../../types';

export const Url = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    const {
        formData: { isReadOnly },
    } = useFormContext<ManageJiraIntegrationSecretFormDataContext>();

    return (
        <FormTextField
            {...register(JIRA_INTEGRATION_SECRET_FORM_NAMES.url.name, {
                required: 'Enter URL',
            })}
            label={`URL`}
            placeholder={'Enter URL'}
            control={control}
            errors={errors}
            disabled={isReadOnly}
        />
    );
};
