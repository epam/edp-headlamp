import { React } from '../../../plugin.globals';
import { TaskRunKubeObjectInterface } from '../../TaskRun/types';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';

interface UseStreamPipelineRunListByTypeAndPipelineNameLabelsProps {
    namespace: string;
    pipelineType: string;
    stageMetadataName: string;
    select?: (data: PipelineRunKubeObjectInterface[]) => PipelineRunKubeObjectInterface[];
}

export const useStreamPipelineRunListByTypeAndPipelineNameLabels = ({
    namespace,
    pipelineType,
    stageMetadataName,
    select,
}: UseStreamPipelineRunListByTypeAndPipelineNameLabelsProps) => {
    const [pipelineRunList, setPipelineRunList] = React.useState<TaskRunKubeObjectInterface[]>([]);

    React.useEffect(() => {
        const cancelStream = PipelineRunKubeObject.streamPipelineRunListByTypeAndPipelineNameLabels(
            {
                namespace,
                pipelineType,
                stageMetadataName,
                dataHandler: data => {
                    const selectedData = select ? select(data) : data;
                    setPipelineRunList(selectedData);
                },
                errorHandler: error => console.error(error),
            }
        );

        return () => {
            cancelStream();
        };
    }, [namespace, pipelineType, select, stageMetadataName]);

    return pipelineRunList;
};
