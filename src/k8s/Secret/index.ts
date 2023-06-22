import { ApiProxy } from '@kinvolk/headlamp-plugin/lib';
import { pluginLib } from '../../plugin.globals';
import { KubeObjectListInterface } from '../../types/k8s';
import { SecretKubeObjectConfig } from './config';
import { SECRET_LABEL_SECRET_TYPE } from './labels';
import { SecretKubeObjectInterface } from './types';

const {
    K8s: { secret },
} = pluginLib;

const {
    name: { pluralForm },
    version,
} = SecretKubeObjectConfig;

export class SecretKubeObject extends secret.default {
    static getList(namespace: string): Promise<KubeObjectListInterface<SecretKubeObjectInterface>> {
        const url = `/api/${version}/namespaces/${namespace}/${pluralForm}?labelSelector=${SECRET_LABEL_SECRET_TYPE}=cluster`;

        return ApiProxy.request(url);
    }
}
