import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface SecretKubeObjectInterface extends KubeObjectInterface {
    data: any;
}

export interface StreamRegistrySecretsProps {
    namespace: string;
    dataHandler: (data: SecretKubeObjectInterface[]) => void;
    errorHandler: (err: Error) => void;
}