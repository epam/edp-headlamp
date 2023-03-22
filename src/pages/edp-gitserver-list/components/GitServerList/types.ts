import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';

export interface GitServerListProps {
    gitServers: EDPGitServerKubeObjectInterface[];
    error: unknown;
}
