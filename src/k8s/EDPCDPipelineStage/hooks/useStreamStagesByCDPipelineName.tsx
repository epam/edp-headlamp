import React from 'react';
import { EDPCDPipelineStageKubeObject } from '../index';
import { EDPCDPipelineStageKubeObjectInterface } from '../types';

interface UseStreamStagesByCDPipelineNameProps {
    namespace: string;
    CDPipelineMetadataName: string;
    select?: (
        data: EDPCDPipelineStageKubeObjectInterface[]
    ) => EDPCDPipelineStageKubeObjectInterface[];
}

export const useStreamStagesByCDPipelineName = ({
    namespace,
    CDPipelineMetadataName,
    select,
}: UseStreamStagesByCDPipelineNameProps) => {
    const [stageList, setStageList] = React.useState<EDPCDPipelineStageKubeObjectInterface[]>([]);

    React.useEffect(() => {
        const cancelStream = EDPCDPipelineStageKubeObject.streamCDPipelineStagesByCDPipelineName({
            namespace,
            CDPipelineMetadataName,
            dataHandler: data => {
                const selectedData = select ? select(data) : data;
                setStageList(selectedData);
            },
            errorHandler: error => console.error(error),
        });

        return () => {
            cancelStream();
        };
    }, [CDPipelineMetadataName, namespace, select]);

    return stageList;
};
