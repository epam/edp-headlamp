import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';

export const CDPipelinesGraph = () => {
    const [CDPipelinesInfo, setCDPipelinesInfo] = React.useState<{
        total: number;
        green: number;
        red: number;
    }>({
        total: 0,
        green: 0,
        red: 0,
    });
    const [, setError] = React.useState<unknown>(null);
    EDPCDPipelineKubeObject.useApiList(
        (CDPipelines: PipelineRunKubeObjectInterface[]) => {
            const newCDPipelinesInfo = {
                green: 0,
                red: 0,
                total: 0,
            };

            for (const item of CDPipelines) {
                if (item.status.status === CUSTOM_RESOURCE_STATUSES.CREATED) {
                    newCDPipelinesInfo.green++;
                } else if (item.status.status === CUSTOM_RESOURCE_STATUSES.FAILED) {
                    newCDPipelinesInfo.red++;
                }
                newCDPipelinesInfo.total++;
            }

            setCDPipelinesInfo(newCDPipelinesInfo);
        },
        error => setError(error)
    );

    return (
        <TileChart
            total={CDPipelinesInfo.total === 0 ? -1 : CDPipelinesInfo.total}
            data={[
                {
                    name: 'OK',
                    value: CDPipelinesInfo.green,
                    fill: '#4caf50',
                },
                {
                    name: 'Failed',
                    value: CDPipelinesInfo.red,
                    fill: '#f44336',
                },
            ]}
            title="CDPipelines"
            // @ts-ignore
            legend={
                <>
                    <Typography component={'div'} variant={'body2'}>
                        Total: {CDPipelinesInfo.total}
                    </Typography>
                    <Typography component={'div'} variant={'body2'}>
                        OK: {CDPipelinesInfo.green}
                    </Typography>
                    <Typography component={'div'} variant={'body2'}>
                        Failed: {CDPipelinesInfo.red}
                    </Typography>
                </>
            }
            label={`${CDPipelinesInfo.green}/${CDPipelinesInfo.total}`}
        />
    );
};
