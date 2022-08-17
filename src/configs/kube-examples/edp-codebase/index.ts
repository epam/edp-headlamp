import lodashSet from 'lodash.set';
import { CODEBASE_TYPE_AUTOTEST } from '../../../components/CreateCodebase/constants';
import { EDPCodebaseKubeObjectConfig } from '../../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../types/global';

const { kind, group, version } = EDPCodebaseKubeObjectConfig;

export const createCodebaseExample: any = (
    names,
    type,
    { name, namespace, ...restProps }
): DeepPartial<EDPCodebaseKubeObjectInterface> => {
    const base: DeepPartial<EDPCodebaseKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        spec: {
            type: type === CODEBASE_TYPE_AUTOTEST ? 'autotests' : type,
        },
        metadata: {
            name: name || `your ${type} name`,
            namespace: namespace || 'your namespace',
        },
    };

    for (const prop in restProps) {
        const propPath = names[prop].path;
        const propValue = restProps[prop];
        lodashSet(base, propPath, propValue);
    }

    return base;
};
