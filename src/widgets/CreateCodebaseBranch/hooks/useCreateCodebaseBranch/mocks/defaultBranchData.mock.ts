import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
import { DeepPartial } from '../../../../../types/global';

export const defaultBranchDataMock: DeepPartial<EDPCodebaseBranchKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'CodebaseBranch',
    spec: {
        codebaseName: 'test-java-app',
        branchName: 'develop',
        fromCommit: '',
        release: false,
        version: 'test',
    },
    metadata: {
        name: 'test-java-app-develops',
        namespace: 'edp-delivery-vp-delivery-dev',
        labels: {
            'app.edp.epam.com/codebaseName': 'test-java-app',
        },
    },
};
