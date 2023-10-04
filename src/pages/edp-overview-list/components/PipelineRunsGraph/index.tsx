import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';

export const PipelineRunsGraph = () => {
    const [pipelineRunsInfo, setPipelineRunsInfo] = React.useState<{
        total: number;
        green: number;
        red: number;
    }>({
        total: null,
        green: null,
        red: null,
    });
    const [, setError] = React.useState<unknown>(null);
    PipelineRunKubeObject.useApiList(
        (pipelineRuns: PipelineRunKubeObjectInterface[]) => {
            const newPipelineRunsInfo = {
                green: 0,
                red: 0,
                total: 0,
            };

            for (const item of pipelineRuns) {
                if (item?.status?.conditions?.[0]?.status === 'True') {
                    newPipelineRunsInfo.green++;
                } else {
                    newPipelineRunsInfo.red++;
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
                    fill: '#4caf50',
                },
                {
                    name: 'Failed',
                    value: pipelineRunsInfo.red,
                    fill: '#f44336',
                },
            ]}
            title="PipelineRuns"
            // @ts-ignore
            legend={
                <>
                    <Typography component={'div'} variant={'body2'}>
                        Total: {pipelineRunsInfo.total}
                    </Typography>
                    <Typography component={'div'} variant={'body2'}>
                        Passed: {pipelineRunsInfo.green}
                    </Typography>
                    <Typography component={'div'} variant={'body2'}>
                        Failed: {pipelineRunsInfo.red}
                    </Typography>
                </>
            }
            label={`${pipelineRunsInfo.green}/${pipelineRunsInfo.total}`}
        />
    );
};
