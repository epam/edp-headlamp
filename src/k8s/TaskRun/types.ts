import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface TaskRunKubeObjectInterface extends KubeObjectInterface {}

export interface StreamTaskRunListByPipelineNameAndPipelineTypeProps {
    namespace: string;
    CDPipelineName: string;
    pipelineType: string;
    parentPipelineRunName: string;
    dataHandler: (data: TaskRunKubeObjectInterface[]) => void;
    errorHandler: (err: Error) => void;
}
