import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../components/Render';
import { STATUS_COLOR } from '../../../../constants/colors';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { EDP_CODEBASE_STATUS } from '../../../../k8s/EDPCodebase/constants';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';

export const CodebasesGraph = () => {
    const [codebasesInfo, setCodebasesInfo] = React.useState<{
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
    EDPCodebaseKubeObject.useApiList(
        (codebases: EDPCodebaseKubeObjectInterface[]) => {
            const newCodebasesInfo = {
                green: 0,
                red: 0,
                total: 0,
                blue: 0,
                grey: 0,
            };

            for (const item of codebases) {
                const status = item?.status?.status;

                switch (status) {
                    case EDP_CODEBASE_STATUS.CREATED:
                        newCodebasesInfo.green++;
                        break;
                    case EDP_CODEBASE_STATUS.INITIALIZED:
                        newCodebasesInfo.blue++;
                        break;
                    case EDP_CODEBASE_STATUS.IN_PROGRESS:
                        newCodebasesInfo.blue++;
                        break;
                    case EDP_CODEBASE_STATUS.FAILED:
                        newCodebasesInfo.red++;
                        break;
                    default:
                        newCodebasesInfo.grey++;
                        break;
                }
                newCodebasesInfo.total++;
            }

            setCodebasesInfo(newCodebasesInfo);
        },
        error => setError(error),
        {
            namespace: getDefaultNamespace(),
        }
    );

    return (
        <TileChart
            total={codebasesInfo.total === null ? -1 : codebasesInfo.total}
            data={[
                {
                    name: 'OK',
                    value: codebasesInfo.green,
                    fill: STATUS_COLOR.SUCCESS,
                },
                {
                    name: 'In Progress',
                    value: codebasesInfo.blue,
                    fill: STATUS_COLOR.IN_PROGRESS,
                },
                {
                    name: 'Failed',
                    value: codebasesInfo.red,
                    fill: STATUS_COLOR.ERROR,
                },
                {
                    name: 'Unknown',
                    value: codebasesInfo.grey,
                    fill: STATUS_COLOR.UNKNOWN,
                },
            ]}
            title="Codebases"
            // @ts-ignore
            legend={
                <>
                    <Typography component={'div'} variant={'body2'}>
                        Total: {codebasesInfo.total}
                    </Typography>
                    <Render condition={!!codebasesInfo.green}>
                        <Typography component={'div'} variant={'body2'}>
                            OK: {codebasesInfo.green}
                        </Typography>
                    </Render>
                    <Render condition={!!codebasesInfo.blue}>
                        <Typography component={'div'} variant={'body2'}>
                            In Progress: {codebasesInfo.blue}
                        </Typography>
                    </Render>
                    <Render condition={!!codebasesInfo.red}>
                        <Typography component={'div'} variant={'body2'}>
                            Failed: {codebasesInfo.red}
                        </Typography>
                    </Render>
                    <Render condition={!!codebasesInfo.grey}>
                        <Typography component={'div'} variant={'body2'}>
                            Unknown: {codebasesInfo.grey}
                        </Typography>
                    </Render>
                </>
            }
            label={`${codebasesInfo.green}/${codebasesInfo.total}`}
        />
    );
};
