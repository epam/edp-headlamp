import React from 'react';
import { STATUS_COLOR } from '../../../constants/colors';
import { PipelineKubeObjectInterface } from '../../../k8s/Pipeline/types';

export const usePipelineRunGraphData = (pipeline: PipelineKubeObjectInterface) => {
    const PipelineTaskListByNameMap = React.useMemo(() => {
        if (pipeline === null) {
            return;
        }

        const map = new Map<string, PipelineKubeObjectInterface>();
        pipeline.spec.tasks.forEach(item => {
            map.set(item.name, item);
        });
        return map;
    }, [pipeline]);

    const nodes = React.useMemo(() => {
        if (!PipelineTaskListByNameMap) {
            return null;
        }

        let _nodes = [];

        for (const name of PipelineTaskListByNameMap.keys()) {
            _nodes = [
                {
                    id: `task::${name}`,
                    height: 40,
                    width: 180,
                    color: STATUS_COLOR.UNKNOWN,
                    data: { name },
                },
                ..._nodes,
            ];
        }

        return _nodes;
    }, [PipelineTaskListByNameMap]);

    const edges = React.useMemo(() => {
        if (!PipelineTaskListByNameMap) {
            return null;
        }

        let _edges = [];

        for (const [name, value] of PipelineTaskListByNameMap.entries()) {
            if (!value?.runAfter) {
                continue;
            }

            for (const item of value.runAfter) {
                _edges = [
                    {
                        id: `edge::${name}::${item}`,
                        source: `task::${item}`,
                        color: STATUS_COLOR.UNKNOWN,
                        target: `task::${name}`,
                    },
                    ..._edges,
                ];
            }
        }

        return _edges;
    }, [PipelineTaskListByNameMap]);

    return { nodes, edges };
};
