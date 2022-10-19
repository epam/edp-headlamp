import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { DeepPartial } from '../../../types/global';

export const edpComponentsMock: DeepPartial<KubeObjectInterface> = {
    items: [
        {
            apiVersion: 'v1.edp.epam.com/v1',
            kind: 'EDPComponent',
            metadata: {
                name: 'tekton',
            },
            spec: {
                type: 'tekton',
            },
        },
        {
            apiVersion: 'v1.edp.epam.com/v1',
            kind: 'EDPComponent',
            metadata: {
                name: 'jenkins',
            },
            spec: {
                type: 'jenkins',
            },
        },
        {
            apiVersion: 'v1.edp.epam.com/v1',
            kind: 'EDPComponent',
            metadata: {
                name: 'sonar',
            },
            spec: {
                type: 'sonar',
            },
        },
    ],
};
