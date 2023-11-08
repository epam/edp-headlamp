import React from 'react';
import { EDPCDPipelineStageKubeObject } from '../../../../../k8s/EDPCDPipelineStage';
import { EDP_CDPIPELINE_STAGE_STATUS } from '../../../../../k8s/EDPCDPipelineStage/constants';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';

export const useStagesGraphData = () => {
    const [StagesInfo, setStagesInfo] = React.useState<{
        total: number;
        green: number;
        red: number;
        blue: number;
        grey: number;
    }>({
        total: null,
        green: null,
        red: null,
        blue: null,
        grey: null,
    });
    const [, setError] = React.useState<unknown>(null);
    EDPCDPipelineStageKubeObject.useApiList(
        (stages: EDPCDPipelineStageKubeObjectInterface[]) => {
            const newStagesInfo = {
                green: 0,
                red: 0,
                total: 0,
                blue: 0,
                grey: 0,
            };

            for (const item of stages) {
                const status = item?.status?.status;

                switch (status) {
                    case EDP_CDPIPELINE_STAGE_STATUS.CREATED:
                        newStagesInfo.green++;
                        break;
                    case EDP_CDPIPELINE_STAGE_STATUS.INITIALIZED:
                        newStagesInfo.blue++;
                        break;
                    case EDP_CDPIPELINE_STAGE_STATUS.IN_PROGRESS:
                        newStagesInfo.blue++;
                        break;
                    case EDP_CDPIPELINE_STAGE_STATUS.FAILED:
                        newStagesInfo.red++;
                        break;
                    default:
                        newStagesInfo.grey++;
                        break;
                }

                newStagesInfo.total++;
            }

            setStagesInfo(newStagesInfo);
        },
        error => setError(error),
        {
            namespace: getDefaultNamespace(),
        }
    );

    return StagesInfo;
};
