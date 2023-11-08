import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldEditable } from '../../../../../providers/Form/components/FormTextFieldEditable';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../types';

export const UserName = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useReactHookFormContext<ManageGitServerValues>();

    const {
        formData: { mode, gitServerSecret },
    } = useFormContext<ManageGitServerDataContext>();

    const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

    return (
        <FormTextFieldEditable
            {...register(GIT_SERVER_FORM_NAMES.gitUser.name)}
            label={'User'}
            title={`Git user name, usually "git"`}
            placeholder={'git'}
            control={control}
            errors={errors}
            disabled={mode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
        />
    );
};
