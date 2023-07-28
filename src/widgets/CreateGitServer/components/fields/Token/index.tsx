import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { CreateGitServerFormValues } from '../../../types';

export const Token = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateGitServerFormValues>();

    return (
        <FormTextField
            {...register(GIT_SERVER_FORM_NAMES.token.name, {
                required: 'Enter your access token',
            })}
            label={'Access token'}
            control={control}
            errors={errors}
            TextFieldProps={{
                multiline: true,
                minRows: 4,
                maxRows: 4,
            }}
        />
    );
};
