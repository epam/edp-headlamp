import React from 'react';
import { CDPipelineKubeObject } from '../index';
import { CDPipelineKubeObjectInterface } from '../types';

interface UseStreamCDPipelineProps {
  namespace: string;
  CDPipelineMetadataName: string;
}

export const useStreamCDPipeline = ({
  namespace,
  CDPipelineMetadataName,
}: UseStreamCDPipelineProps) => {
  const [CDPipeline, setCDPipeline] = React.useState<CDPipelineKubeObjectInterface>(null);

  React.useEffect(() => {
    const cancelStream = CDPipelineKubeObject.streamCDPipeline({
      namespace,
      CDPipelineMetadataName,
      dataHandler: (data) => {
        setCDPipeline(data);
      },
      errorHandler: (error) => console.error(error),
    });

    return () => {
      cancelStream();
    };
  }, [CDPipelineMetadataName, namespace]);

  return CDPipeline;
};
