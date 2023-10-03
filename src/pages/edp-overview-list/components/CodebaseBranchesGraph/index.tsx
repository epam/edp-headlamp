import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';

export const CodebaseBranchesGraph = () => {
    const [codebaseBranchesInfo, setCodebaseBranchesInfo] = React.useState<{
        total: number;
        green: number;
        red: number;
    }>({
        total: null,
        green: null,
        red: null,
    });
    const [, setError] = React.useState<unknown>(null);
    EDPCodebaseBranchKubeObject.useApiList(
        (codebaseBranches: EDPCodebaseBranchKubeObjectInterface[]) => {
            const newCodebaseBranchesInfo = {
                green: 0,
                red: 0,
                total: 0,
            };

            for (const item of codebaseBranches) {
                if (item.status.status === CUSTOM_RESOURCE_STATUSES.CREATED) {
                    newCodebaseBranchesInfo.green++;
                } else if (item.status.status === CUSTOM_RESOURCE_STATUSES.FAILED) {
                    newCodebaseBranchesInfo.red++;
                }
                newCodebaseBranchesInfo.total++;
            }

            setCodebaseBranchesInfo(newCodebaseBranchesInfo);
        },
        error => setError(error),
        {
            namespace: getDefaultNamespace(),
        }
    );

    return (
        <TileChart
            total={codebaseBranchesInfo.total === null ? -1 : codebaseBranchesInfo.total}
            data={[
                {
                    name: 'OK',
                    value: codebaseBranchesInfo.green,
                    fill: '#4caf50',
                },
                {
                    name: 'Failed',
                    value: codebaseBranchesInfo.red,
                    fill: '#f44336',
                },
            ]}
            title="Branches"
            // @ts-ignore
            legend={
                <>
                    <Typography component={'div'} variant={'body2'}>
                        Total: {codebaseBranchesInfo.total}
                    </Typography>
                    <Typography component={'div'} variant={'body2'}>
                        OK: {codebaseBranchesInfo.green}
                    </Typography>
                    <Typography component={'div'} variant={'body2'}>
                        Failed: {codebaseBranchesInfo.red}
                    </Typography>
                </>
            }
            label={`${codebaseBranchesInfo.green}/${codebaseBranchesInfo.total}`}
        />
    );
};
