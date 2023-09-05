import { Icon } from '@iconify/react';
import { Button, Grid, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../../components/Render';
import { TableColumn } from '../../../../../components/Table/types';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { EnrichedApplicationWithArgoApplication } from '../../../types';

export const useUpperColumns = ({
    selected,
    buttonsEnabledMap,
    someArgoApplicationMutationIsLoading,
    qualityGatePipelineIsRunning,
    onDeployClick,
    onUpdateClick,
    onUninstallClick,
    onLatestClick,
    onStableClick,
}): TableColumn<EnrichedApplicationWithArgoApplication>[] => {
    const numSelected = React.useMemo(() => selected.length, [selected]);
    const { reset } = useFormContext();

    return React.useMemo(
        () => [
            {
                id: 'selected',
                label: '',
                render: () => {
                    return (
                        <Render condition={numSelected > 0}>
                            <Typography variant={'body1'}>
                                {numSelected} item(s) selected
                            </Typography>
                        </Render>
                    );
                },
                colSpan: 4,
            },
            {
                id: 'deployUpdateUninstall',
                label: '',
                render: () => {
                    return (
                        <Grid container alignItems={'center'} spacing={2}>
                            <Grid item>
                                <Tooltip
                                    title={
                                        'Deploy selected applications with selected image stream version'
                                    }
                                >
                                    <Button
                                        onClick={onDeployClick}
                                        variant={'contained'}
                                        color={'primary'}
                                        size="small"
                                        startIcon={<Icon icon={'solar:upload-linear'} />}
                                        disabled={
                                            !numSelected ||
                                            !buttonsEnabledMap.deploy ||
                                            someArgoApplicationMutationIsLoading ||
                                            qualityGatePipelineIsRunning
                                        }
                                    >
                                        deploy
                                    </Button>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip
                                    title={
                                        'Update selected applications with selected image stream version'
                                    }
                                >
                                    <Button
                                        onClick={onUpdateClick}
                                        variant={'contained'}
                                        color={'primary'}
                                        size="small"
                                        startIcon={<Icon icon={ICONS.UPDATE} />}
                                        disabled={
                                            !numSelected ||
                                            !buttonsEnabledMap.update ||
                                            someArgoApplicationMutationIsLoading ||
                                            qualityGatePipelineIsRunning
                                        }
                                    >
                                        update
                                    </Button>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title={'Uninstall selected applications'}>
                                    <Button
                                        onClick={onUninstallClick}
                                        variant={'contained'}
                                        color={'primary'}
                                        size="small"
                                        startIcon={<Icon icon={ICONS.BUCKET} />}
                                        disabled={
                                            !numSelected ||
                                            !buttonsEnabledMap.update ||
                                            someArgoApplicationMutationIsLoading ||
                                            qualityGatePipelineIsRunning
                                        }
                                    >
                                        uninstall
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    );
                },
            },
            {
                id: 'valuesOverride',
                label: '',
                render: () => null,
            },
            {
                id: 'latestStableReset',
                label: '',
                render: () => {
                    return (
                        <Grid container alignItems={'center'} spacing={2}>
                            <Grid item>
                                <Tooltip
                                    title={'Set selected applications latest image stream version'}
                                >
                                    <Button
                                        onClick={onLatestClick}
                                        variant={'outlined'}
                                        color={'primary'}
                                        size="small"
                                        fullWidth
                                        disabled={!numSelected}
                                    >
                                        latest
                                    </Button>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip
                                    title={'Set selected applications stable image stream version'}
                                >
                                    <Button
                                        onClick={onStableClick}
                                        variant={'outlined'}
                                        color={'primary'}
                                        size="small"
                                        fullWidth
                                        disabled={!numSelected}
                                    >
                                        stable
                                    </Button>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title={'Reset selected image stream versions'}>
                                    <Button
                                        onClick={() => reset()}
                                        variant={'outlined'}
                                        color={'primary'}
                                        size="small"
                                        startIcon={<Icon icon={'system-uicons:reset'} />}
                                        fullWidth
                                        disabled={!selected || !selected.length}
                                    >
                                        reset
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    );
                },
            },
        ],
        [
            buttonsEnabledMap,
            numSelected,
            onDeployClick,
            onLatestClick,
            onStableClick,
            onUninstallClick,
            onUpdateClick,
            qualityGatePipelineIsRunning,
            reset,
            selected,
            someArgoApplicationMutationIsLoading,
        ]
    );
};
