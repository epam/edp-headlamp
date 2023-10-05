import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../components/Render';
import { STATUS_COLOR } from '../../../../constants/colors';
import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { EDP_CODEBASE_BRANCH_STATUS } from '../../../../k8s/EDPCodebaseBranch/constants';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';

export const CodebaseBranchesGraph = () => {
    const [codebaseBranchesInfo, setCodebaseBranchesInfo] = React.useState<{
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
    EDPCodebaseBranchKubeObject.useApiList(
        (codebaseBranches: EDPCodebaseBranchKubeObjectInterface[]) => {
            const newCodebaseBranchesInfo = {
                green: 0,
                red: 0,
                total: 0,
                blue: 0,
                grey: 0,
            };

            for (const item of codebaseBranches) {
                const status = item?.status?.status;

                switch (status) {
                    case EDP_CODEBASE_BRANCH_STATUS.CREATED:
                        newCodebaseBranchesInfo.green++;
                        break;
                    case EDP_CODEBASE_BRANCH_STATUS.INITIALIZED:
                        newCodebaseBranchesInfo.blue++;
                        break;
                    case EDP_CODEBASE_BRANCH_STATUS.IN_PROGRESS:
                        newCodebaseBranchesInfo.blue++;
                        break;
                    case EDP_CODEBASE_BRANCH_STATUS.FAILED:
                        newCodebaseBranchesInfo.red++;
                        break;
                    default:
                        newCodebaseBranchesInfo.grey++;
                        break;
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
                    fill: STATUS_COLOR.SUCCESS,
                },
                {
                    name: 'In Progress',
                    value: codebaseBranchesInfo.blue,
                    fill: STATUS_COLOR.IN_PROGRESS,
                },
                {
                    name: 'Failed',
                    value: codebaseBranchesInfo.red,
                    fill: STATUS_COLOR.ERROR,
                },
                {
                    name: 'Unknown',
                    value: codebaseBranchesInfo.grey,
                    fill: STATUS_COLOR.UNKNOWN,
                },
            ]}
            title="Branches"
            // @ts-ignore
            legend={
                <>
                    <Typography component={'div'} variant={'body2'}>
                        Total: {codebaseBranchesInfo.total}
                    </Typography>
                    <Render condition={!!codebaseBranchesInfo.green}>
                        <Typography component={'div'} variant={'body2'}>
                            OK: {codebaseBranchesInfo.green}
                        </Typography>
                    </Render>
                    <Render condition={!!codebaseBranchesInfo.blue}>
                        <Typography component={'div'} variant={'body2'}>
                            In Progress: {codebaseBranchesInfo.blue}
                        </Typography>
                    </Render>
                    <Render condition={!!codebaseBranchesInfo.red}>
                        <Typography component={'div'} variant={'body2'}>
                            Failed: {codebaseBranchesInfo.red}
                        </Typography>
                    </Render>
                    <Render condition={!!codebaseBranchesInfo.grey}>
                        <Typography component={'div'} variant={'body2'}>
                            Unknown: {codebaseBranchesInfo.grey}
                        </Typography>
                    </Render>
                </>
            }
            label={`${codebaseBranchesInfo.green}/${codebaseBranchesInfo.total}`}
        />
    );
};
