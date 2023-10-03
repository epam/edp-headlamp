import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';

export const StagesGraph = () => {
    const [StagesInfo, setStagesInfo] = React.useState<{
        total: number;
        green: number;
        red: number;
    }>({
        total: null,
        green: null,
        red: null,
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
        error => setError(error),
        {
            namespace: getDefaultNamespace(),
        }
    );

    return (
        <TileChart
            total={StagesInfo.total === null ? -1 : StagesInfo.total}
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
