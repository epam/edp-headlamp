import React from 'react';
import { TaskRunKubeObject } from '../index';
import { TaskRunKubeObjectInterface } from '../types';

interface UseStreamTaskRunListByPipelineNameAndPipelineTypeProps {
    namespace: string;
    CDPipelineName: string;
    pipelineType: string;
    parentPipelineRunName: string;
    select?: (data: TaskRunKubeObjectInterface[]) => TaskRunKubeObjectInterface[];
}

export const useStreamTaskRunListByPipelineNameAndPipelineType = ({
    namespace,
    CDPipelineName,
    pipelineType,
    parentPipelineRunName,
    select,
}: UseStreamTaskRunListByPipelineNameAndPipelineTypeProps) => {
    const [taskRunList, setTaskRunList] = React.useState<TaskRunKubeObjectInterface[]>([]);

    React.useEffect(() => {
        const cancelStream = TaskRunKubeObject.streamListByPipelineNameAndPipelineType({
            namespace,
            CDPipelineName,
            pipelineType,
            parentPipelineRunName,
            dataHandler: data => {
                const selectedData = select ? select(data) : data;
                setTaskRunList(selectedData);
            },
            errorHandler: error => console.error(error),
        });

        return () => {
            cancelStream();
        };
    }, [namespace, CDPipelineName, pipelineType, select, parentPipelineRunName]);

    return taskRunList;
};
