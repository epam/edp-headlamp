import React from 'react';
import { EDPCDPipelineKubeObject } from '../index';
import { EDPCDPipelineKubeObjectInterface } from '../types';

interface UseStreamCDPipelineProps {
  namespace: string;
  CDPipelineMetadataName: string;
}

export const useStreamCDPipeline = ({
  namespace,
  CDPipelineMetadataName,
}: UseStreamCDPipelineProps) => {
  const [CDPipeline, setCDPipeline] = React.useState<EDPCDPipelineKubeObjectInterface>(null);

  React.useEffect(() => {
    const cancelStream = EDPCDPipelineKubeObject.streamCDPipeline({
      namespace,
      CDPipelineMetadataName,
      dataHandler: data => {
        setCDPipeline(data);
      },
      errorHandler: error => console.error(error),
    });

    return () => {
      cancelStream();
    };
  }, [CDPipelineMetadataName, namespace]);

  return CDPipeline;
};
