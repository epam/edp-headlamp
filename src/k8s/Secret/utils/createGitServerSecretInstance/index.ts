import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

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
            username: btoa(unescape(gitUser)),
            id_rsa: btoa(unescape(sshPrivateKey.trim() + '\n')),
            token: btoa(unescape(token)),
        },
    };
};
