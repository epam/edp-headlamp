import { KubeObjectInterface } from '../../plugin.types';

export interface TaskRunKubeObjectInterface extends KubeObjectInterface {}

export interface StreamTaskRunListByPipelineNameAndPipelineTypeProps {
    namespace: string;
    CDPipelineName: string;
    pipelineType: string;
    parentPipelineRunName: string;
    dataHandler: (data: TaskRunKubeObjectInterface[]) => void;
    errorHandler: (err: Error) => void;
}
