import { EDPKubeObjectInterface } from '../../types/k8s';

export interface GerritSpec {
    keycloakSpec: {
        enabled: boolean;
        realm?: string;
        url?: string;
    };
    sshPort?: number;
}

export interface GerritStatus {
    available?: boolean;
    externalUrl: string;
    lastTimeUpdated?: string;
    status?: string;
}

export interface GerritKubeObjectInterface extends EDPKubeObjectInterface {
    spec: GerritSpec;
    status: GerritStatus;
}
