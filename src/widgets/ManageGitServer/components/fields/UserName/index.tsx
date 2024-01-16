import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldEditable } from '../../../../../providers/Form/components/FormTextFieldEditable';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../types';
import { getGitServerSecret } from '../../../utils/getGitServerSecret';

export const UserName = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useReactHookFormContext<ManageGitServerValues>();

    const {
        formData: { mode, gitServer, repositorySecrets },
    } = useFormContext<ManageGitServerDataContext>();

    const gitProviderFieldValue = watch(GIT_SERVER_FORM_NAMES.gitProvider.name);

    const gitServerSecret = React.useMemo(
        () => getGitServerSecret(gitServer, repositorySecrets, gitProviderFieldValue),
        [gitProviderFieldValue, gitServer, repositorySecrets]
    );

    const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

    return (
        <FormTextFieldEditable
            {...register(GIT_SERVER_FORM_NAMES.gitUser.name, {
                required: 'Enter the username associated with your Git account.',
            })}
            label={'User'}
            title={'Provide the username associated with your Git account.'}
            placeholder={'git'}
            control={control}
            errors={errors}
            disabled={mode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
        />
    );
};
