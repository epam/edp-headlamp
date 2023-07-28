import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { CreateGitServerFormValues } from '../../../types';

export const UserName = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CreateGitServerFormValues>();

    return (
        <FormTextField
            {...register(GIT_SERVER_FORM_NAMES.gitUser.name)}
            label={'User'}
            title={`Git user name, usually "git"`}
            control={control}
            errors={errors}
        />
    );
};
