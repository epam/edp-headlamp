import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { JIRA_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageJiraIntegrationSecretFormDataContext } from '../../../types';

export const Password = () => {
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
        <FormTextFieldPassword
            {...register(JIRA_INTEGRATION_SECRET_FORM_NAMES.password.name, {
                required: 'Enter password',
            })}
            label={`Password`}
            placeholder={'Enter password'}
            control={control}
            errors={errors}
            disabled={mode === FORM_MODES.EDIT && isReadOnly}
        />
    );
};
