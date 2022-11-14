import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { React } from '../../../plugin.globals';
import { DeepPartial } from '../../../types/global';

export const useRows = (kubeObjectData: DeepPartial<EDPCodebaseKubeObjectInterface>) =>
    React.useMemo(() => {
        const { spec, status } = kubeObjectData;

        return [
            {
                name: 'Status',
                value: status.status,
            },
            {
                name: 'Language',
                value: spec.lang,
            },
            {
                name: 'Build tool',
                value: spec.buildTool,
            },
            {
                name: 'Framework',
                value: spec.framework,
            },
            {
                name: 'Strategy',
                value: spec.strategy,
            },
        ];
    }, [kubeObjectData]);
