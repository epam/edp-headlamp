import { KubeObjectInterface } from '../../plugin.types';

export interface EDPGitServerSpec {
    gitHost: string;
    gitProvider: string;
    gitUser: string;
    httpsPort: number;
    nameSshKeySecret: string;
    sshPort: number;
}

export interface EDPGitServerStatus {
    action: string;
    available: boolean;
    detailed_message: string;
    last_time_updated: string;
    result: string;
    status: string;
    username: string;
    value: string;
}

export interface EDPGitServerKubeObjectInterface extends KubeObjectInterface {
    spec: EDPGitServerSpec;
    status: EDPGitServerStatus;
}
