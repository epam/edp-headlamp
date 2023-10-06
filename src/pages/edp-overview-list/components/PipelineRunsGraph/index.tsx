import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../components/Render';
import { STATUS_COLOR } from '../../../../constants/colors';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON, PIPELINE_RUN_STATUS } from '../../../../k8s/PipelineRun/constants';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';

export const PipelineRunsGraph = () => {
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
    console.log(pipelineRunsInfo);
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

    return (
        <TileChart
            total={pipelineRunsInfo.total === null ? -1 : pipelineRunsInfo.total}
            data={[
                {
                    name: 'Passed',
                    value: pipelineRunsInfo.green,
                    fill: STATUS_COLOR.SUCCESS,
                },
                {
                    name: 'In Progress',
                    value: pipelineRunsInfo.blue,
                    fill: STATUS_COLOR.IN_PROGRESS,
                },
                {
                    name: 'Suspended',
                    value: pipelineRunsInfo.purple,
                    fill: STATUS_COLOR.SUSPENDED,
                },
                {
                    name: 'Failed',
                    value: pipelineRunsInfo.red,
                    fill: STATUS_COLOR.ERROR,
                },
                {
                    name: 'Unknown',
                    value: pipelineRunsInfo.grey,
                    fill: STATUS_COLOR.UNKNOWN,
                },
            ]}
            title="PipelineRuns"
            // @ts-ignore
            legend={
                <>
                    <Typography component={'div'} variant={'body2'}>
                        Total: {pipelineRunsInfo.total}
                    </Typography>
                    <Render condition={!!pipelineRunsInfo.green}>
                        <Typography component={'div'} variant={'body2'}>
                            Passed: {pipelineRunsInfo.green}
                        </Typography>
                    </Render>
                    <Render condition={!!pipelineRunsInfo.blue}>
                        <Typography component={'div'} variant={'body2'}>
                            In Progress: {pipelineRunsInfo.blue}
                        </Typography>
                    </Render>
                    <Render condition={!!pipelineRunsInfo.purple}>
                        <Typography component={'div'} variant={'body2'}>
                            Suspended: {pipelineRunsInfo.purple}
                        </Typography>
                    </Render>
                    <Render condition={!!pipelineRunsInfo.red}>
                        <Typography component={'div'} variant={'body2'}>
                            Failed: {pipelineRunsInfo.red}
                        </Typography>
                    </Render>
                    <Render condition={!!pipelineRunsInfo.grey}>
                        <Typography component={'div'} variant={'body2'}>
                            Unknown: {pipelineRunsInfo.grey}
                        </Typography>
                    </Render>
                </>
            }
            label={`${pipelineRunsInfo.green}/${pipelineRunsInfo.total}`}
        />
    );
};
