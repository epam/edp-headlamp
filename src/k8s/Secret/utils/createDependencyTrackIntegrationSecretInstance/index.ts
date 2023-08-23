import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { SECRET_LABEL_SECRET_TYPE } from '../../labels';

export const createDependencyTrackIntegrationSecretInstance = ({
    token,
}: {
    token: string;
}): KubeObjectInterface => {
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        // @ts-ignore
        metadata: {
            name: 'ci-dependency-track',
            labels: {
                [SECRET_LABEL_SECRET_TYPE]: 'dependency-track',
            },
        },
        type: 'Opaque',
        data: {
            token: btoa(unescape(token)),
        },
    };
};
