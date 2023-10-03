import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';

export const CodebasesGraph = () => {
    const [codebasesInfo, setCodebasesInfo] = React.useState<{
        total: number;
        green: number;
        red: number;
    }>({
        total: null,
        green: null,
        red: null,
    });
    const [, setError] = React.useState<unknown>(null);
    EDPCodebaseKubeObject.useApiList(
        (codebases: EDPCodebaseKubeObjectInterface[]) => {
            const newCodebasesInfo = {
                green: 0,
                red: 0,
                total: 0,
            };

            for (const item of codebases) {
                if (item.status.status === CUSTOM_RESOURCE_STATUSES.CREATED) {
                    newCodebasesInfo.green++;
                } else if (item.status.status === CUSTOM_RESOURCE_STATUSES.FAILED) {
                    newCodebasesInfo.red++;
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
                    fill: '#4caf50',
                },
                {
                    name: 'Failed',
                    value: codebasesInfo.red,
                    fill: '#f44336',
                },
            ]}
            title="Codebases"
            // @ts-ignore
            legend={
                <>
                    <Typography component={'div'} variant={'body2'}>
                        Total: {codebasesInfo.total}
                    </Typography>
                    <Typography component={'div'} variant={'body2'}>
                        OK: {codebasesInfo.green}
                    </Typography>
                    <Typography component={'div'} variant={'body2'}>
                        Failed: {codebasesInfo.red}
                    </Typography>
                </>
            }
            label={`${codebasesInfo.green}/${codebasesInfo.total}`}
        />
    );
};
