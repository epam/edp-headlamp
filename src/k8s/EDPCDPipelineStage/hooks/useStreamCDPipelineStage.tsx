import React from 'react';
import { EDPCDPipelineStageKubeObject } from '../index';
import { EDPCDPipelineStageKubeObjectInterface } from '../types';

interface UseStreamCDPipelineStageProps {
  namespace: string;
  stageMetadataName: string;
}

export const useStreamCDPipelineStage = ({
  namespace,
  stageMetadataName,
}: UseStreamCDPipelineStageProps) => {
  const [CDPipelineStage, setCDPipelineStage] =
    React.useState<EDPCDPipelineStageKubeObjectInterface>(null);

  React.useEffect(() => {
    const cancelStream = EDPCDPipelineStageKubeObject.streamCDPipelineStage({
      namespace,
      stageMetadataName,
      dataHandler: data => {
        setCDPipelineStage(data);
      },
      errorHandler: error => console.error(error),
    });

    return () => {
      cancelStream();
    };
  }, [namespace, stageMetadataName]);

  return CDPipelineStage;
};
