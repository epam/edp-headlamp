import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { FormTextFieldPassword } from '../../../../../providers/Form/components/FormTextFieldPassword';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../types';
import { getGitServerSecret } from '../../../utils/getGitServerSecret';

export const Token = () => {
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
        <FormTextFieldPassword
            {...register(GIT_SERVER_FORM_NAMES.token.name, {
                required: 'Enter your access token',
            })}
            label={'Access token'}
            control={control}
            errors={errors}
            disabled={mode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
        />
    );
};
