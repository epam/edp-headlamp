import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../types/global';

export const groovyLibrariesBranchesMock: DeepPartial<EDPCodebaseKubeObjectInterface> = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseBranch',
            metadata: {
                labels: {
                    'app.edp.epam.com/codebaseName': 'test-groovy',
                },
                name: 'test-groovy-master',
                namespace: 'edp-delivery-vp-delivery-dev',
            },
            spec: {
                branchName: 'master',
                codebaseName: 'test-groovy',
                fromCommit: '',
                release: false,
            },
        },
    ],
};
