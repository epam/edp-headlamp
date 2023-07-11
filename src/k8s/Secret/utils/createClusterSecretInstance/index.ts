import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';

export const createClusterSecretInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    formValues: {
        [key: string]: any;
    }
): KubeObjectInterface => {
    const base: KubeObjectInterface = {
        apiVersion: 'v1',
        kind: 'Secret',
        // @ts-ignore
        metadata: {
            name: formValues.clusterName,
            labels: {
                'argocd.argoproj.io/secret-type': 'cluster',
            },
        },
        type: 'Opaque',
        stringData: {
            config: {
                tlsClientConfig: {
                    insecure: false,
                },
            },
        },
    };

    for (const [propKey, propValue] of Object.entries(formValues)) {
        const propPath = names[propKey].path;
        set(base, propPath, propValue);
    }

    base.stringData.config = JSON.stringify(base.stringData.config);

    return base;
};
