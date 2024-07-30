import React from 'react';
import { useCDPipelineStageListQuery } from '../../../../../../../k8s/groups/EDP/Stage/hooks/useCDPipelineStageListQuery';
import { StageKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/Stage/types';

export const useConflictedStage = (clusterName: string) => {
  const [stage, setStage] = React.useState<StageKubeObjectInterface>(null);

  useCDPipelineStageListQuery({
    options: {
      onSuccess: async (data) => {
        if (!data?.items) {
          return;
        }

        for (const item of data?.items) {
          const { spec } = item;
          if (spec.clusterName === clusterName) {
            setStage(item);
            break;
          }
        }
      },
      enabled: !!clusterName,
    },
  });

  return stage;
};
