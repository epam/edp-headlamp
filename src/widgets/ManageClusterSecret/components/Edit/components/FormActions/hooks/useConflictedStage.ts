import React from 'react';
import { useCDPipelineStageListQuery } from '../../../../../../../k8s/EDPCDPipelineStage/hooks/useCDPipelineStageListQuery';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../k8s/EDPCDPipelineStage/types';

export const useConflictedStage = (clusterName: string) => {
    const [stage, setStage] = React.useState<EDPCDPipelineStageKubeObjectInterface>(null);

    useCDPipelineStageListQuery({
        options: {
            onSuccess: async data => {
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
