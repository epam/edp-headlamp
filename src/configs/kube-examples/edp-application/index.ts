import lodashSet from 'lodash.set';
import { EDPCodebaseKubeObjectConfig } from '../../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../types/global';

const { kind, group, version } = EDPCodebaseKubeObjectConfig;

export const createApplicationExample: any = (
    names,
    { name = 'your application name', namespace = 'your namespace', ...restProps }
) => {
    const base: DeepPartial<EDPCodebaseKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        spec: {
            type: 'application',
        },
        metadata: {
            name,
            namespace,
        },
    };

    for (const prop in restProps) {
        const propPath = names[prop].path;
        const propValue = restProps[prop];
        lodashSet(base, propPath, propValue);
    }

    return base;
};
