import { Icon } from '@iconify/react';
import { Button, ButtonGroup, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../../components/Render';
import { TableColumn } from '../../../../../components/Table/types';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';
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
    const { stage } = useDynamicDataContext();

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
                                    <IconButton
                                        onClick={onDeployClick}
                                        disabled={
                                            !numSelected ||
                                            !buttonsEnabledMap.deploy ||
                                            someArgoApplicationMutationIsLoading ||
                                            qualityGatePipelineIsRunning
                                        }
                                    >
                                        <Icon icon={'solar:upload-linear'} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip
                                    title={
                                        'Update selected applications with selected image stream version'
                                    }
                                >
                                    <IconButton
                                        onClick={onUpdateClick}
                                        disabled={
                                            !numSelected ||
                                            !buttonsEnabledMap.update ||
                                            someArgoApplicationMutationIsLoading ||
                                            qualityGatePipelineIsRunning
                                        }
                                    >
                                        <Icon icon={ICONS.UPDATE} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title={'Uninstall selected applications'}>
                                    <IconButton
                                        onClick={onUninstallClick}
                                        disabled={
                                            !numSelected ||
                                            !buttonsEnabledMap.update ||
                                            someArgoApplicationMutationIsLoading ||
                                            qualityGatePipelineIsRunning
                                        }
                                    >
                                        <Icon icon={ICONS.BUCKET} />
                                    </IconButton>
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
                                <ButtonGroup>
                                    <Tooltip
                                        title={
                                            'Set selected applications latest image stream version'
                                        }
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
                                    <Tooltip
                                        title={
                                            'Set selected applications stable image stream version'
                                        }
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
                                </ButtonGroup>
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
            ...(stage?.spec.clusterName === 'in-cluster'
                ? ([
                      {
                          id: 'pods',
                          label: 'Pods',
                          render: () => null,
                      },
                  ] as TableColumn<EnrichedApplicationWithArgoApplication>[])
                : []),
            {
                id: 'ingress',
                label: '',
                render: () => null,
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
            stage,
        ]
    );
};
