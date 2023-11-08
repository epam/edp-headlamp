import React from 'react';
import { EDPCDPipelineKubeObject } from '../../../../../k8s/EDPCDPipeline';
import { EDP_CDPIPELINE_STATUS } from '../../../../../k8s/EDPCDPipeline/constants';
import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';

export const useCDPipelinesGraphData = () => {
    const [CDPipelinesInfo, setCDPipelinesInfo] = React.useState<{
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
    EDPCDPipelineKubeObject.useApiList(
        (CDPipelines: PipelineRunKubeObjectInterface[]) => {
            const newCDPipelinesInfo = {
                green: 0,
                red: 0,
                total: 0,
                blue: 0,
                grey: 0,
            };

            for (const item of CDPipelines) {
                const status = item?.status?.status;

                switch (status) {
                    case EDP_CDPIPELINE_STATUS.CREATED:
                        newCDPipelinesInfo.green++;
                        break;
                    case EDP_CDPIPELINE_STATUS.INITIALIZED:
                        newCDPipelinesInfo.blue++;
                        break;
                    case EDP_CDPIPELINE_STATUS.IN_PROGRESS:
                        newCDPipelinesInfo.blue++;
                        break;
                    case EDP_CDPIPELINE_STATUS.FAILED:
                        newCDPipelinesInfo.red++;
                        break;
                    default:
                        newCDPipelinesInfo.grey++;
                        break;
                }

                newCDPipelinesInfo.total++;
            }

            setCDPipelinesInfo(newCDPipelinesInfo);
        },
        error => setError(error),
        {
            namespace: getDefaultNamespace(),
        }
    );

    return CDPipelinesInfo;
};
