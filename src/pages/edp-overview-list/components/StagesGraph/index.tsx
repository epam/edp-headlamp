import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';

export const StagesGraph = () => {
    const [StagesInfo, setStagesInfo] = React.useState<{
        total: number;
        green: number;
        red: number;
    }>({
        total: 0,
        green: 0,
        red: 0,
    });
    const [, setError] = React.useState<unknown>(null);
    EDPCDPipelineStageKubeObject.useApiList(
        (stages: EDPCDPipelineStageKubeObjectInterface[]) => {
            const newStagesInfo = {
                green: 0,
                red: 0,
                total: 0,
            };

            for (const item of stages) {
                console.log(item);
                if (item?.status?.status === CUSTOM_RESOURCE_STATUSES.CREATED) {
                    newStagesInfo.green++;
                } else if (item?.status?.status === CUSTOM_RESOURCE_STATUSES.FAILED) {
                    newStagesInfo.red++;
                } else {
                    newStagesInfo.red++;
                }
                newStagesInfo.total++;
            }

            setStagesInfo(newStagesInfo);
        },
        error => setError(error)
    );

    return (
        <TileChart
            total={StagesInfo.total === 0 ? -1 : StagesInfo.total}
            data={[
                {
                    name: 'OK',
                    value: StagesInfo.green,
                    fill: '#4caf50',
                },
                {
                    name: 'Failed',
                    value: StagesInfo.red,
                    fill: '#f44336',
                },
            ]}
            title="Stages"
            // @ts-ignore
            legend={
                <>
                    <Typography component={'div'} variant={'body2'}>
                        Total: {StagesInfo.total}
                    </Typography>
                    <Typography component={'div'} variant={'body2'}>
                        OK: {StagesInfo.green}
                    </Typography>
                    <Typography component={'div'} variant={'body2'}>
                        Failed: {StagesInfo.red}
                    </Typography>
                </>
            }
            label={`${StagesInfo.green}/${StagesInfo.total}`}
        />
    );
};
