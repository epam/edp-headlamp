import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { JIRA_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageJiraIntegrationSecretFormDataContext } from '../../../types';

export const User = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    const {
        formData: { mode, jiraServerSecret },
    } = useFormContext<ManageJiraIntegrationSecretFormDataContext>();

    const ownerReference = jiraServerSecret?.metadata?.ownerReferences?.[0].kind;
    const isReadOnly = !!ownerReference;

    return (
        <FormTextField
            {...register(JIRA_INTEGRATION_SECRET_FORM_NAMES.username.name, {
                required: 'Enter user name',
            })}
            label={`User`}
            placeholder={'Enter user name'}
            control={control}
            errors={errors}
            disabled={mode === FORM_MODES.EDIT && isReadOnly}
        />
    );
};
