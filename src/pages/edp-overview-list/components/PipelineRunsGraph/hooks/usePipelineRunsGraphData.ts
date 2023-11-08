import React from 'react';
import { PipelineRunKubeObject } from '../../../../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON, PIPELINE_RUN_STATUS } from '../../../../../k8s/PipelineRun/constants';
import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';

export const usePipelineRunsGraphData = () => {
    const [pipelineRunsInfo, setPipelineRunsInfo] = React.useState<{
        total: number;
        green: number;
        red: number;
        blue: number;
        grey: number;
        purple: number;
    }>({
        total: null,
        green: null,
        red: null,
        blue: null,
        grey: null,
        purple: null,
    });
    const [, setError] = React.useState<unknown>(null);
    PipelineRunKubeObject.useApiList(
        (pipelineRuns: PipelineRunKubeObjectInterface[]) => {
            const newPipelineRunsInfo = {
                green: 0,
                red: 0,
                total: 0,
                blue: 0,
                grey: 0,
                purple: 0,
            };

            for (const item of pipelineRuns) {
                const status = PipelineRunKubeObject.parseStatus(item);
                const reason = PipelineRunKubeObject.parseStatusReason(item);

                const _status = status.toLowerCase();
                const _reason = reason.toLowerCase();

                switch (_status) {
                    case PIPELINE_RUN_STATUS.UNKNOWN:
                        if (
                            _reason === PIPELINE_RUN_REASON.STARTED ||
                            _reason === PIPELINE_RUN_REASON.RUNNING
                        ) {
                            newPipelineRunsInfo.blue++;
                        }

                        if (_reason === PIPELINE_RUN_REASON.CANCELLED) {
                            newPipelineRunsInfo.purple++;
                        }
                        break;
                    case PIPELINE_RUN_STATUS.TRUE:
                        newPipelineRunsInfo.green++;
                        break;
                    case PIPELINE_RUN_STATUS.FALSE:
                        newPipelineRunsInfo.red++;
                        break;
                    default:
                        newPipelineRunsInfo.grey++;
                        break;
                }
                newPipelineRunsInfo.total++;
            }

            setPipelineRunsInfo(newPipelineRunsInfo);
        },
        error => setError(error),
        {
            namespace: getDefaultNamespace(),
        }
    );

    return pipelineRunsInfo;
};
