import { EDPKubeObjectInterface } from '../../types/k8s';

interface EDPCodebaseBranchSpecInterface {
    branchName: string;
    codebaseName: string;
    fromCommit: string;
    release: boolean;
    releaseJobParams: {
        additionalProperties: string;
    } | null;
    version: string | null;
}

interface EDPCodebaseBranchStatusInterface {
    action: string;
    build: string;
    detailedMessage: string;
    failureCount: number;
    lastSuccessfulBuild: string;
    lastTimeUpdated: string;
    result: string;
    status: string;
    username: string;
    value: string;
    versionHistory: string[];
}

interface EDPCodebaseBranchKubeObjectInterface extends EDPKubeObjectInterface {
    spec: EDPCodebaseBranchSpecInterface;
    status: EDPCodebaseBranchStatusInterface;
}

export {
    EDPCodebaseBranchSpecInterface,
    EDPCodebaseBranchStatusInterface,
    EDPCodebaseBranchKubeObjectInterface,
};
