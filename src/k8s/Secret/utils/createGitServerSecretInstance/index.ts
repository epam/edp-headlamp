import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { safeEncode } from '../../../../utils/decodeEncode';

export const createGitServerSecretInstance = ({
    name,
    gitUser,
    sshPrivateKey,
    token,
}: {
    name: string;
    gitUser: string;
    sshPrivateKey: string;
    token: string;
}): DeepPartial<EDPKubeObjectInterface> => {
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: {
            name: `${name}-config`,
        },
        data: {
            username: safeEncode(gitUser),
            id_rsa: safeEncode(sshPrivateKey.trim() + '\n'),
            token: safeEncode(token),
        },
    };
};
