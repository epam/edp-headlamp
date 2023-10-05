import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../components/Render';
import { STATUS_COLOR } from '../../../../constants/colors';
import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { EDP_CDPIPELINE_STATUS } from '../../../../k8s/EDPCDPipeline/constants';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';

export const CDPipelinesGraph = () => {
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

    return (
        <TileChart
            total={CDPipelinesInfo.total === null ? -1 : CDPipelinesInfo.total}
            data={[
                {
                    name: 'OK',
                    value: CDPipelinesInfo.green,
                    fill: STATUS_COLOR.SUCCESS,
                },
                {
                    name: 'In Progress',
                    value: CDPipelinesInfo.blue,
                    fill: STATUS_COLOR.IN_PROGRESS,
                },
                {
                    name: 'Failed',
                    value: CDPipelinesInfo.red,
                    fill: STATUS_COLOR.ERROR,
                },
                {
                    name: 'Unknown',
                    value: CDPipelinesInfo.grey,
                    fill: STATUS_COLOR.UNKNOWN,
                },
            ]}
            title="CDPipelines"
            // @ts-ignore
            legend={
                <>
                    <Typography component={'div'} variant={'body2'}>
                        Total: {CDPipelinesInfo.total}
                    </Typography>
                    <Render condition={!!CDPipelinesInfo.green}>
                        <Typography component={'div'} variant={'body2'}>
                            OK: {CDPipelinesInfo.green}
                        </Typography>
                    </Render>
                    <Render condition={!!CDPipelinesInfo.blue}>
                        <Typography component={'div'} variant={'body2'}>
                            In Progress: {CDPipelinesInfo.blue}
                        </Typography>
                    </Render>
                    <Render condition={!!CDPipelinesInfo.red}>
                        <Typography component={'div'} variant={'body2'}>
                            Failed: {CDPipelinesInfo.red}
                        </Typography>
                    </Render>
                    <Render condition={!!CDPipelinesInfo.grey}>
                        <Typography component={'div'} variant={'body2'}>
                            Unknown: {CDPipelinesInfo.grey}
                        </Typography>
                    </Render>
                </>
            }
            label={`${CDPipelinesInfo.green}/${CDPipelinesInfo.total}`}
        />
    );
};
