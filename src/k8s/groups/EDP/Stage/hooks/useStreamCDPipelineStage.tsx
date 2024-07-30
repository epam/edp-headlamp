import React from 'react';
import { StageKubeObject } from '../index';
import { StageKubeObjectInterface } from '../types';

interface UseStreamCDPipelineStageProps {
  namespace: string;
  stageMetadataName: string;
}

export const useStreamCDPipelineStage = ({
  namespace,
  stageMetadataName,
}: UseStreamCDPipelineStageProps) => {
  const [CDPipelineStage, setCDPipelineStage] = React.useState<StageKubeObjectInterface>(null);

  React.useEffect(() => {
    const cancelStream = StageKubeObject.streamCDPipelineStage({
      namespace,
      stageMetadataName,
      dataHandler: (data) => {
        setCDPipelineStage(data);
      },
      errorHandler: (error) => console.error(error),
    });

    return () => {
      cancelStream();
    };
  }, [namespace, stageMetadataName]);

  return CDPipelineStage;
};
