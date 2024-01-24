import React from 'react';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';

interface UseStreamAutotestPipelineRunListProps {
  namespace: string;
  stageSpecName: string;
  CDPipelineMetadataName: string;
  parentPipelineRunName: string;
  select?: (data: PipelineRunKubeObjectInterface[]) => PipelineRunKubeObjectInterface[];
}

export const useStreamAutotestPipelineRunList = ({
  namespace,
  stageSpecName,
  CDPipelineMetadataName,
  parentPipelineRunName,
  select,
}: UseStreamAutotestPipelineRunListProps) => {
  const [pipelineRunList, setPipelineRunList] = React.useState<PipelineRunKubeObjectInterface[]>(
    []
  );

  React.useEffect(() => {
    if (!stageSpecName || !parentPipelineRunName) {
      return;
    }

    const cancelStream = PipelineRunKubeObject.streamAutotestsPipelineRunList({
      namespace,
      stageSpecName,
      CDPipelineMetadataName,
      parentPipelineRunName,
      dataHandler: (data) => {
        const selectedData = select ? select(data) : data;
        setPipelineRunList(selectedData);
      },
      errorHandler: (error) => console.error(error),
    });

    return () => {
      cancelStream();
    };
  }, [CDPipelineMetadataName, namespace, parentPipelineRunName, select, stageSpecName]);

  return pipelineRunList;
};
