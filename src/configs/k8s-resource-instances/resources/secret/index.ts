import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

export const createSecretInstance = (
    codebaseName: string,
    namespace: string,
    repositoryLogin: string,
    repositoryPassword: string
): DeepPartial<EDPKubeObjectInterface> => {
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: {
            name: `repository-codebase-${codebaseName}-temp`,
            namespace,
        },
        data: {
            username: btoa(unescape(repositoryLogin)),
            password: btoa(unescape(repositoryPassword)),
        },
    };
};
