import { Icon } from '@iconify/react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { Graph } from '../../components/Graph';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { Render } from '../../components/Render';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../k8s/PipelineRun';
import { TaskRunKubeObject } from '../../k8s/TaskRun';
import { TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN } from '../../k8s/TaskRun/labels';
import { TaskRunKubeObjectInterface } from '../../k8s/TaskRun/types';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { PIPELINE_RUN_GRAPH_DIALOG_NAME } from './constants';
import { useStyles } from './styles';
import { PipelineRunGraphDialogForwardedProps } from './types';

export const PipelineRunGraph = () => {
    const classes = useStyles();

    const {
        open,
        forwardedProps: { pipelineRun },
        closeDialog,
    } = useSpecificDialogContext<PipelineRunGraphDialogForwardedProps>(
        PIPELINE_RUN_GRAPH_DIALOG_NAME
    );

    const [taskRuns] = TaskRunKubeObject.useList({
        labelSelector: `${TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN}=${pipelineRun.metadata.name}`,
    });

    const pipelineRunTasks = pipelineRun?.status?.pipelineSpec?.tasks;

    const PipelineRunTaskRunListByNameMap = React.useMemo(() => {
        if (taskRuns === null || !pipelineRunTasks) {
            return;
        }

        const map = new Map<string, TaskRunKubeObjectInterface>();
        pipelineRunTasks?.forEach(item => {
            map.set(item.name, item);
        });
        return map;
    }, [taskRuns, pipelineRunTasks]);

    const TaskRunListByNameMap = React.useMemo(() => {
        if (taskRuns === null) {
            return;
        }

        const map = new Map<string, TaskRunKubeObjectInterface>();
        taskRuns.forEach(item => {
            map.set(item.metadata.labels['tekton.dev/pipelineTask'], item);
        });
        return map;
    }, [taskRuns]);

    const nodes = React.useMemo(() => {
        if (!PipelineRunTaskRunListByNameMap) {
            return null;
        }

        let _nodes = [];

        for (const name of PipelineRunTaskRunListByNameMap.keys()) {
            const TaskRunByName = TaskRunListByNameMap.get(name);
            const status = TaskRunKubeObject.parseStatus(TaskRunByName);
            const reason = TaskRunKubeObject.parseStatusReason(TaskRunByName);
            const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(status, reason);

            _nodes = [
                ..._nodes,
                {
                    id: `task::${name}`,
                    status: `Status: ${status}. Reason: ${reason}`,
                    icon,
                    color,
                    isRotating,
                    url: null,
                    title: name,
                    height: 35,
                    width: 150,
                },
            ];
        }

        return _nodes;
    }, [PipelineRunTaskRunListByNameMap, TaskRunListByNameMap]);

    const edges = React.useMemo(() => {
        if (!PipelineRunTaskRunListByNameMap) {
            return null;
        }

        let _edges = [];

        for (const [name, value] of PipelineRunTaskRunListByNameMap.entries()) {
            const TaskRunByName = TaskRunListByNameMap.get(name);
            const status = TaskRunKubeObject.parseStatus(TaskRunByName);
            const reason = TaskRunKubeObject.parseStatusReason(TaskRunByName);

            const [, color] = PipelineRunKubeObject.getStatusIcon(status, reason);

            if (!value?.runAfter) {
                continue;
            }

            for (const item of value.runAfter) {
                _edges = [
                    {
                        id: `edge::${name}::${item}`,
                        source: `task::${item}`,
                        color,
                        target: `task::${name}`,
                    },
                    ..._edges,
                ];
            }
        }

        return _edges;
    }, [PipelineRunTaskRunListByNameMap, TaskRunListByNameMap]);

    const diagramIsReady = nodes !== null && edges !== null;

    return (
        <Dialog
            open={open}
            fullWidth
            onClose={() => closeDialog()}
            maxWidth={'xl'}
            className={classes.dialog}
        >
            <DialogTitle>
                <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <Grid item>
                        <Typography variant={'h4'}>
                            "{pipelineRun?.metadata.name}" Tree Diagram
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => closeDialog()}>
                            <Icon icon={ICONS.CROSS} />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <LoadingWrapper isLoading={taskRuns === null && !diagramIsReady}>
                    <Render condition={diagramIsReady}>
                        <div>
                            <Graph
                                direction={'RIGHT'}
                                nodes={nodes}
                                edges={edges}
                                id={'pipeline-run-steps'}
                            />
                        </div>
                    </Render>
                    <Render condition={!pipelineRunTasks || !pipelineRunTasks?.length}>
                        <Typography variant={'body1'} align={'center'}>
                            The PipelineRun has no tasks
                        </Typography>
                    </Render>
                    <Render condition={!taskRuns?.length}>
                        <Typography variant={'body1'} align={'center'}>
                            Couldn't find TaskRuns for the PipelineRun
                        </Typography>
                    </Render>
                </LoadingWrapper>
            </DialogContent>
        </Dialog>
    );
};
