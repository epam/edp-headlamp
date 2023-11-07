import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { safeEncode } from '../../../../utils/decodeEncode';
import { SECRET_LABEL_SECRET_TYPE } from '../../labels';

export const createGerritGitServerSecretInstance = ({
    sshPrivateKey,
    sshPublicKey,
    username,
}: {
    sshPrivateKey: string;
    sshPublicKey: string;
    username: string;
}): EDPKubeObjectInterface => {
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: {
            labels: {
                [SECRET_LABEL_SECRET_TYPE]: 'repository',
            },
            name: 'gerrit-ciuser-sshkey',
        },
        data: {
            id_rsa: safeEncode(sshPrivateKey.trim() + '\n'),
            'id_rsa.pub': safeEncode(sshPublicKey),
            username: safeEncode(username),
        },
    };
};

export const createGithubGitServerSecretInstance = ({
    sshPrivateKey,
    token,
    username,
}: {
    sshPrivateKey: string;
    token: string;
    username: string;
}): EDPKubeObjectInterface => {
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: {
            labels: {
                [SECRET_LABEL_SECRET_TYPE]: 'repository',
            },
            name: 'ci-github',
        },
        data: {
            id_rsa: safeEncode(sshPrivateKey.trim() + '\n'),
            token: safeEncode(token),
            username: safeEncode(username),
        },
    };
};

export const createGitlabGitServerSecretInstance = ({
    sshPrivateKey,
    secretString,
    token,
}: {
    sshPrivateKey: string;
    secretString: string;
    token: string;
}): EDPKubeObjectInterface => {
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: {
            labels: {
                [SECRET_LABEL_SECRET_TYPE]: 'repository',
            },
            name: 'ci-gitlab',
        },
        data: {
            id_rsa: safeEncode(sshPrivateKey.trim() + '\n'),
            secretString: safeEncode(secretString),
            token: safeEncode(token),
        },
    };
};
