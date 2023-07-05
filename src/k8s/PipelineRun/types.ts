import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface PipelineRunKubeObjectInterface extends KubeObjectInterface {}

export interface StreamPipelineRunListByCodebaseBranchLabelProps {
    namespace: string;
    codebaseBranchLabel: string;
    dataHandler: (data: PipelineRunKubeObjectInterface[]) => void;
    errorHandler: (err: Error) => void;
}

export interface StreamPipelineRunListByTypeAndPipelineNameLabelsProps {
    namespace: string;
    pipelineType: string;
    stageMetadataName: string;
    dataHandler: (data: PipelineRunKubeObjectInterface[]) => void;
    errorHandler: (err: Error) => void;
}

export interface StreamAutotestRunnerPipelineRunListProps {
    namespace: string;
    stageSpecName: string;
    CDPipelineMetadataName: string;
    dataHandler: (data: PipelineRunKubeObjectInterface[]) => void;
    errorHandler: (err: Error) => void;
}

export interface StreamAutotestsPipelineRunListProps {
    namespace: string;
    stageSpecName: string;
    CDPipelineMetadataName: string;
    parentPipelineRunName: string;
    dataHandler: (data: PipelineRunKubeObjectInterface[]) => void;
    errorHandler: (err: Error) => void;
}
