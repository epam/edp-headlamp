import { GIT_PROVIDERS } from '../../../../constants/gitProviders';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { safeEncode } from '../../../../utils/decodeEncode';

export const createGitServerSecretInstance = ({
    name,
    gitUser,
    sshPrivateKey,
    token,
    gitProvider,
}: {
    name: string;
    gitUser: string;
    sshPrivateKey: string;
    token: string;
    gitProvider: GIT_PROVIDERS;
}): DeepPartial<EDPKubeObjectInterface> => {
    const _name = gitProvider === GIT_PROVIDERS.GERRIT ? `${name}-config` : `ci-${gitProvider}`;

    return {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: {
            name: _name,
        },
        data: {
            username: safeEncode(gitUser),
            id_rsa: safeEncode(sshPrivateKey.trim() + '\n'),
            token: safeEncode(token),
        },
    };
};
