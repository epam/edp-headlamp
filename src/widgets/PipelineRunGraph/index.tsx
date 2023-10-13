import { CardNodeColumn, CardNodeTitle } from '@carbon/charts-react/diagrams/CardNode';
import { Icon } from '@iconify/react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { Graph } from '../../components/Graph';
import { Edge } from '../../components/Graph/components/Edge';
import { Node } from '../../components/Graph/components/Node';
import { MyNode } from '../../components/Graph/components/types';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { Render } from '../../components/Render';
import { StatusIcon } from '../../components/StatusIcon';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../k8s/PipelineRun';
import { TaskRunKubeObject } from '../../k8s/TaskRun';
import { TASK_RUN_STEP_REASON, TASK_RUN_STEP_STATUS } from '../../k8s/TaskRun/constants';
import { TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN } from '../../k8s/TaskRun/labels';
import { TaskRunKubeObjectInterface } from '../../k8s/TaskRun/types';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { ValueOf } from '../../types/global';
import { PIPELINE_RUN_GRAPH_DIALOG_NAME } from './constants';
import { useStyles } from './styles';
import { PipelineRunGraphDialogForwardedProps } from './types';

interface TaskRunStep {
    // @ts-ignore
    name: string;
    [key: string]: {
        reason?: ValueOf<typeof TASK_RUN_STEP_REASON>;
    };
}

const parseTaskRunStepStatus = (step: TaskRunStep) => {
    return step?.[TASK_RUN_STEP_STATUS.RUNNING]
        ? TASK_RUN_STEP_STATUS.RUNNING
        : step?.[TASK_RUN_STEP_STATUS.WAITING]
        ? TASK_RUN_STEP_STATUS.WAITING
        : step?.[TASK_RUN_STEP_STATUS.TERMINATED]
        ? TASK_RUN_STEP_STATUS.TERMINATED
        : undefined;
};

const parseTaskRunStepStatusObject = (step: TaskRunStep) => {
    return (
        step?.[TASK_RUN_STEP_STATUS.RUNNING] ||
        step?.[TASK_RUN_STEP_STATUS.WAITING] ||
        step?.[TASK_RUN_STEP_STATUS.TERMINATED]
    );
};

const parseTaskRunStepReason = (step: TaskRunStep): ValueOf<typeof TASK_RUN_STEP_REASON> => {
    const statusObject = parseTaskRunStepStatusObject(step);
    return statusObject?.reason;
};

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
            const [, color] = PipelineRunKubeObject.getStatusIcon(status, reason);

            _nodes = [
                {
                    id: `task::${name}`,
                    height: 35,
                    width: 150,
                    color,
                    data: { name, TaskRunByName },
                },
                ..._nodes,
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

    const renderSteps = React.useCallback((steps: TaskRunStep[]) => {
        if (!steps) {
            return null;
        }

        return steps.map(step => {
            const stepName = step?.name;
            const status = parseTaskRunStepStatus(step);
            const reason = parseTaskRunStepReason(step);
            const [icon, color, isRotating] = TaskRunKubeObject.getStepStatusIcon(status, reason);
            return (
                <Grid item xs={12}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item>
                            <StatusIcon
                                icon={icon}
                                color={color}
                                isRotating={isRotating}
                                Title={`Status: ${status}. Reason: ${reason}`}
                                width={15}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant={'subtitle2'} title={stepName}>
                                {stepName}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            );
        });
    }, []);

    const renderNode = React.useCallback(
        (node: MyNode<{ name: string; TaskRunByName: TaskRunKubeObjectInterface }>) => {
            const {
                data: { name, TaskRunByName },
            } = node;

            const steps = TaskRunByName?.status?.steps;

            const status = TaskRunKubeObject.parseStatus(TaskRunByName);
            const reason = TaskRunKubeObject.parseStatusReason(TaskRunByName);
            const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(status, reason);
            const Steps = renderSteps(steps);

            return (
                // @ts-ignore
                <Node {...node}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <CardNodeColumn>
                            <StatusIcon
                                icon={icon}
                                color={color}
                                isRotating={isRotating}
                                Title={`Status: ${status}. Reason: ${reason}`}
                                width={15}
                            />
                        </CardNodeColumn>
                        <CardNodeColumn>
                            <Tooltip title={<>{Steps}</>} interactive arrow placement={'bottom'}>
                                <div>
                                    <CardNodeTitle>
                                        <Typography variant={'subtitle2'}>{name}</Typography>
                                    </CardNodeTitle>
                                </div>
                            </Tooltip>
                        </CardNodeColumn>
                    </div>
                </Node>
            );
        },
        [renderSteps]
    );

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
                                renderEdge={edge => <Edge direction={'RIGHT'} {...edge} />}
                                renderNode={renderNode}
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
