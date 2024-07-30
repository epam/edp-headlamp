import React from 'react';
import { StageKubeObject } from '../index';
import { StageKubeObjectInterface } from '../types';

interface UseStreamStagesByCDPipelineNameProps {
  namespace: string;
  CDPipelineMetadataName: string;
  select?: (data: StageKubeObjectInterface[]) => StageKubeObjectInterface[];
}

export const useStreamStagesByCDPipelineName = ({
  namespace,
  CDPipelineMetadataName,
  select,
}: UseStreamStagesByCDPipelineNameProps) => {
  const [stageList, setStageList] = React.useState<StageKubeObjectInterface[]>([]);

  React.useEffect(() => {
    const cancelStream = StageKubeObject.streamCDPipelineStagesByCDPipelineName({
      namespace,
      CDPipelineMetadataName,
      dataHandler: (data) => {
        const selectedData = select ? select(data) : data;
        setStageList(selectedData);
      },
      errorHandler: (error) => console.error(error),
    });

    return () => {
      cancelStream();
    };
  }, [CDPipelineMetadataName, namespace, select]);

  return stageList;
};
