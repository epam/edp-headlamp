import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { ARGOCD_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageArgoCDIntegrationSecretFormDataContext } from '../../../types';

export const Token = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    const {
        formData: { isReadOnly },
    } = useFormContext<ManageArgoCDIntegrationSecretFormDataContext>();

    return (
        <FormTextFieldPassword
            {...register(ARGOCD_INTEGRATION_SECRET_FORM_NAMES.token.name, {
                required: 'Enter the authentication token for ArgoCD.',
            })}
            label={`Token`}
            title={
                'Provide an authentication token for ArgoCD. Generate the token from your ArgoCD instance.'
            }
            placeholder={'Enter token'}
            control={control}
            errors={errors}
            disabled={isReadOnly}
        />
    );
};
