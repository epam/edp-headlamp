import React from 'react';
import { GIT_PROVIDERS } from '../../../../../constants/gitProviders';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../types';

export const useDefaultValues = ({ formData }: { formData: ManageGitServerDataContext }) => {
    const { gitServer, gitServerSecret } = formData;
    const gitProvider = gitServer.spec.gitProvider;

    return React.useMemo(() => {
        let base: Partial<ManageGitServerValues> = {
            [GIT_SERVER_FORM_NAMES.sshPort.name]: gitServer.spec.sshPort
                ? Number(gitServer.spec.sshPort)
                : undefined,
            [GIT_SERVER_FORM_NAMES.httpsPort.name]: gitServer.spec.httpsPort
                ? Number(gitServer.spec.httpsPort)
                : undefined,
            [GIT_SERVER_FORM_NAMES.gitUser.name]: gitServer.spec.gitUser,
            [GIT_SERVER_FORM_NAMES.gitHost.name]: gitServer.spec.gitHost,
            [GIT_SERVER_FORM_NAMES.gitProvider.name]: gitServer.spec.gitProvider,
        };

        if (gitProvider === GIT_PROVIDERS.GERRIT) {
            base = {
                ...base,
                [GIT_SERVER_FORM_NAMES.sshPrivateKey.name]: gitServerSecret?.data['id_rsa'],
                [GIT_SERVER_FORM_NAMES.sshPublicKey.name]: safeDecode(
                    gitServerSecret?.data['id_rsa.pub']
                ),
            };
        }

        if (gitProvider === GIT_PROVIDERS.GITLAB) {
            base = {
                ...base,
                [GIT_SERVER_FORM_NAMES.sshPrivateKey.name]: gitServerSecret?.data['id_rsa'],
                [GIT_SERVER_FORM_NAMES.secretString.name]: safeDecode(
                    gitServerSecret?.data.secretString
                ),
                [GIT_SERVER_FORM_NAMES.token.name]: safeDecode(gitServerSecret?.data.token),
            };
        }

        if (gitProvider === GIT_PROVIDERS.GITHUB) {
            base = {
                ...base,
                [GIT_SERVER_FORM_NAMES.sshPrivateKey.name]: gitServerSecret?.data['id_rsa'],
                [GIT_SERVER_FORM_NAMES.token.name]: safeDecode(gitServerSecret?.data.token),
            };
        }

        return base;
    }, [gitProvider, gitServer, gitServerSecret]);
};
