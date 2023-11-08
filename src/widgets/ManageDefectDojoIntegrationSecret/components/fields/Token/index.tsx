import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageDefectDojoIntegrationSecretFormDataContext } from '../../../types';

export const Token = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext();

    const {
        formData: { isReadOnly },
    } = useFormContext<ManageDefectDojoIntegrationSecretFormDataContext>();

    return (
        <FormTextFieldPassword
            {...register(DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.token.name, {
                required: 'Enter token',
            })}
            label={`Token`}
            placeholder={'Enter token'}
            control={control}
            errors={errors}
            disabled={isReadOnly}
        />
    );
};
