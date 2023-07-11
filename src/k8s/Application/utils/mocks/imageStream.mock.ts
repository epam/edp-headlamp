import { DeepPartial } from '../../../../types/global';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../EDPCodebaseImageStream/types';

export const imageStreamMock: DeepPartial<EDPCodebaseImageStreamKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'CodebaseImageStream',
    metadata: {
        name: 'test-app-name-master',
        namespace: 'test-namespace',
    },
    spec: {
        codebase: 'test-app-name',
        imageName: '012345678910.dkr.ecr.eu-central-1.amazonaws.com/test-namespace/test-app-name',
        tags: [
            {
                created: "2023-01-10'T'12:49:28",
                name: 'master-0.0.1-SNAPSHOT-20230110-124530',
            },
        ],
    },
};
