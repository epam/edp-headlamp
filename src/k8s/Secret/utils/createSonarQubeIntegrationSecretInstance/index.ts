import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { safeEncode } from '../../../../utils/decodeEncode';
import { INTEGRATION_SECRET_NAMES } from '../../constants';
import { SECRET_LABEL_SECRET_TYPE } from '../../labels';

export const createSonarQubeIntegrationSecretInstance = ({
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
            name: INTEGRATION_SECRET_NAMES.SONAR,
            labels: {
                [SECRET_LABEL_SECRET_TYPE]: 'sonar',
            },
        },
        type: 'Opaque',
        data: {
            token: safeEncode(token),
            url: safeEncode(url),
        },
    };
};
