import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { SECRET_LABEL_SECRET_TYPE } from '../../labels';

export const createSonarQubeIntegrationSecretInstance = ({
    user,
    secret,
}: {
    user: string;
    secret: string;
}): KubeObjectInterface => {
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        // @ts-ignore
        metadata: {
            name: 'sonar-ciuser-token',
            labels: {
                [SECRET_LABEL_SECRET_TYPE]: 'sonar',
            },
        },
        type: 'Opaque',
        data: {
            username: btoa(unescape(user)),
            secret: btoa(unescape(secret)),
        },
    };
};
