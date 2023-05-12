import { KubeObjectInterface } from '../../plugin.types';

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

export interface GerritKubeObjectInterface extends KubeObjectInterface {
    spec: GerritSpec;
    status: GerritStatus;
}
