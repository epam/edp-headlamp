import { KubeObjectConfig } from '../../types/configs/k8s';

export const EDPCodebaseKubeObjectConfig: KubeObjectConfig = {
    kind: 'Codebase',
    name: {
        singularForm: 'codebase',
        pluralForm: 'codebases',
    },
    group: 'v2.edp.epam.com',
    version: 'v1',
    types: {
        application: {
            name: {
                singularForm: 'application',
                pluralForm: 'applications',
            },
        },
        library: {
            name: {
                singularForm: 'library',
                pluralForm: 'libraries',
            },
        },
        autotest: {
            name: {
                singularForm: 'autotest',
                pluralForm: 'autotests',
            },
        },
    },
};
