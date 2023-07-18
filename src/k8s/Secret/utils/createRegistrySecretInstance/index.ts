import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { SECRET_LABEL_SECRET_TYPE } from '../../labels';

export const createRegistrySecretInstance = ({
    name,
    registryEndpoint,
    user,
    password,
}: {
    name: string;
    registryEndpoint: string;
    user: string;
    password: string;
}): KubeObjectInterface => {
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        // @ts-ignore
        metadata: {
            name,
            labels: {
                [SECRET_LABEL_SECRET_TYPE]: 'registry',
            },
        },
        type: 'Opaque',
        data: {
            'config.json': btoa(
                unescape(
                    JSON.stringify({
                        auths: {
                            [registryEndpoint]: {
                                username: user,
                                password: password,
                                auth: btoa(unescape(`${user}:${password}`)),
                            },
                        },
                    })
                )
            ),
        },
    };
};
