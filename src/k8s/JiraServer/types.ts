import { KubeObjectInterface } from '../../plugin.types';

export interface JiraServerSpec {
    apiUrl: string;
    rootUrl: string;
    credentialName: string;
}

export interface JiraServerStatus {
    available: boolean;
    last_time_updated: string;
    status: string;
    detailed_message?: string;
}

export interface JiraServerKubeObjectInterface extends KubeObjectInterface {
    spec: JiraServerSpec;
    status: JiraServerStatus;
}
