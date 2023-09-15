import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { safeEncode } from '../../../../utils/decodeEncode';
import { INTEGRATION_SECRET_NAMES } from '../../constants';
import { SECRET_LABEL_SECRET_TYPE } from '../../labels';

export const createNexusIntegrationSecretInstance = ({
    username,
    password,
    url,
}: {
    username: string;
    password: string;
    url: string;
}): KubeObjectInterface => {
    return {
        apiVersion: 'v1',
        kind: 'Secret',
        // @ts-ignore
        metadata: {
            name: INTEGRATION_SECRET_NAMES.NEXUS,
            labels: {
                [SECRET_LABEL_SECRET_TYPE]: 'nexus',
            },
        },
        type: 'Opaque',
        data: {
            username: safeEncode(username),
            password: safeEncode(password),
            url: safeEncode(url),
        },
    };
};
