import React from 'react';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';

interface UseStreamStagePipelineRunListProps {
  namespace: string;
  cdPipelineName: string;
  pipelineType: string;
  stageMetadataName: string;
  select?: (data: PipelineRunKubeObjectInterface[]) => PipelineRunKubeObjectInterface[];
}

export const useStreamStagePipelineRunList = ({
  namespace,
  cdPipelineName,
  pipelineType,
  stageMetadataName,
  select,
}: UseStreamStagePipelineRunListProps) => {
  const [pipelineRunList, setPipelineRunList] = React.useState<PipelineRunKubeObjectInterface[]>(
    []
  );

  React.useEffect(() => {
    if (!stageMetadataName || !cdPipelineName) {
      return;
    }

    const cancelStream = PipelineRunKubeObject.streamStagePipelineRunList({
      namespace,
      cdPipelineName,
      pipelineType,
      stageMetadataName,
      dataHandler: (data) => {
        const selectedData = select ? select(data) : data;
        setPipelineRunList(selectedData);
      },
      errorHandler: (error) => console.error(error),
    });

    return () => {
      cancelStream();
    };
  }, [cdPipelineName, namespace, pipelineType, select, stageMetadataName]);

  return pipelineRunList;
};
