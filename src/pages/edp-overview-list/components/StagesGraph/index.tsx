import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../components/Render';
import { STATUS_COLOR } from '../../../../constants/colors';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDP_CDPIPELINE_STAGE_STATUS } from '../../../../k8s/EDPCDPipelineStage/constants';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';

export const StagesGraph = () => {
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

    return (
        <TileChart
            total={StagesInfo.total === null ? -1 : StagesInfo.total}
            data={[
                {
                    name: 'OK',
                    value: StagesInfo.green,
                    fill: STATUS_COLOR.SUCCESS,
                },
                {
                    name: 'In Progress',
                    value: StagesInfo.blue,
                    fill: STATUS_COLOR.IN_PROGRESS,
                },
                {
                    name: 'Failed',
                    value: StagesInfo.red,
                    fill: STATUS_COLOR.ERROR,
                },
                {
                    name: 'Unknown',
                    value: StagesInfo.grey,
                    fill: STATUS_COLOR.UNKNOWN,
                },
            ]}
            title="Stages"
            // @ts-ignore
            legend={
                <>
                    <Typography component={'div'} variant={'body2'}>
                        Total: {StagesInfo.total}
                    </Typography>
                    <Render condition={!!StagesInfo.green}>
                        <Typography component={'div'} variant={'body2'}>
                            OK: {StagesInfo.green}
                        </Typography>
                    </Render>
                    <Render condition={!!StagesInfo.blue}>
                        <Typography component={'div'} variant={'body2'}>
                            In Progress: {StagesInfo.blue}
                        </Typography>
                    </Render>
                    <Render condition={!!StagesInfo.red}>
                        <Typography component={'div'} variant={'body2'}>
                            Failed: {StagesInfo.red}
                        </Typography>
                    </Render>
                    <Render condition={!!StagesInfo.grey}>
                        <Typography component={'div'} variant={'body2'}>
                            Unknown: {StagesInfo.grey}
                        </Typography>
                    </Render>
                </>
            }
            label={`${StagesInfo.green}/${StagesInfo.total}`}
        />
    );
};
