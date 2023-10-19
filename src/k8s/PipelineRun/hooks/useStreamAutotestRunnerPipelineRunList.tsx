import React from 'react';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';

interface UseStreamAutotestRunnerPipelineRunListProps {
    namespace: string;
    stageSpecName: string;
    CDPipelineMetadataName: string;
    select?: (data: PipelineRunKubeObjectInterface[]) => PipelineRunKubeObjectInterface[];
}

export const useStreamAutotestRunnerPipelineRunList = ({
    namespace,
    stageSpecName,
    CDPipelineMetadataName,
    select,
}: UseStreamAutotestRunnerPipelineRunListProps) => {
    const [pipelineRunList, setPipelineRunList] = React.useState<PipelineRunKubeObjectInterface[]>(
        []
    );

    React.useEffect(() => {
        if (!stageSpecName || !CDPipelineMetadataName) {
            return;
        }

        const cancelStream = PipelineRunKubeObject.streamAutotestRunnerPipelineRunList({
            namespace,
            stageSpecName,
            CDPipelineMetadataName,
            dataHandler: data => {
                const selectedData = select ? select(data) : data;
                setPipelineRunList(selectedData);
            },
            errorHandler: error => console.error(error),
        });

        return () => {
            cancelStream();
        };
    }, [CDPipelineMetadataName, namespace, select, stageSpecName]);

    return pipelineRunList;
};
