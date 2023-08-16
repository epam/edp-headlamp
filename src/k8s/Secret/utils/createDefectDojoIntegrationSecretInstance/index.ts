import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { SECRET_LABEL_SECRET_TYPE } from '../../labels';

export const createDefectDojoIntegrationSecretInstance = ({
    token,
    url,
}: {
    token: string;
    url: string;
}): KubeObjectInterface => {
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        // @ts-ignore
        metadata: {
            name: 'defectdojo-ciuser-token',
            labels: {
                [SECRET_LABEL_SECRET_TYPE]: 'defectdojo',
            },
        },
        type: 'Opaque',
        data: {
            token: btoa(unescape(token)),
            url: btoa(unescape(url)),
        },
    };
};
