import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../types';

export const UserName = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageGitServerValues>();

    const {
        formData: { isReadOnly },
    } = useFormContext<ManageGitServerDataContext>();

    return (
        <FormTextField
            {...register(GIT_SERVER_FORM_NAMES.gitUser.name)}
            label={'User'}
            title={`Git user name, usually "git"`}
            control={control}
            errors={errors}
            disabled={isReadOnly}
        />
    );
};
