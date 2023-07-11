import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

export const createCodebaseSecretInstance = (
    codebaseName: string,
    repositoryLogin: string,
    repositoryPassword: string
): DeepPartial<EDPKubeObjectInterface> => {
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: {
            name: `repository-codebase-${codebaseName}-temp`,
        },
        data: {
            username: btoa(unescape(repositoryLogin)),
            password: btoa(unescape(repositoryPassword)),
        },
    };
};
