import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../k8s/EDPCodebaseImageStream/types';
import { DeepPartial } from '../../../types/global';

export const codebaseImageStreamsMock: {
    items: DeepPartial<EDPCodebaseImageStreamKubeObjectInterface>[];
} = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                name: 'test-python-2-main',
                namespace: 'edp-delivery-vp-dev',
            },
            spec: {
                codebase: 'test-python-2',
                imageName:
                    '01234567890.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev/test-python-2',
                tags: [
                    {
                        created: '2022-10-26T13:41:09',
                        name: 'main-1.0.0-1',
                    },
                ],
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                name: 'vp-test-jenkins-master',
                namespace: 'edp-delivery-vp-dev',
            },
            spec: {
                codebase: 'vp-test-jenkins',
                imageName:
                    '01234567890.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev/vp-test-jenkins',
                tags: [
                    {
                        created: '2022-10-25T19:57:04',
                        name: 'master-1.0.0-1',
                    },
                ],
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                name: 'vp-test-jenkins-pipe-qa-test-python-2-verified',
                namespace: 'edp-delivery-vp-dev',
            },
            spec: {
                codebase: 'test-python-2',
                imageName: '01234567890.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev',
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                name: 'vp-test-jenkins-pipe-qa-vp-test-jenkins-verified',
                namespace: 'edp-delivery-vp-dev',
            },
            spec: {
                codebase: 'vp-test-jenkins',
                imageName: '01234567890.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev',
                tags: [
                    {
                        created: '2022-10-25T20:04:59',
                        name: 'master-1.0.0-1',
                    },
                ],
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                name: 'vp-test-jenkins-pipe-sit-test-python-2-verified',
                namespace: 'edp-delivery-vp-dev',
            },
            spec: {
                codebase: 'test-python-2',
                imageName: '01234567890.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev',
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                name: 'vp-test-jenkins-pipe-sit-vp-test-jenkins-verified',
                namespace: 'edp-delivery-vp-dev',
            },
            spec: {
                codebase: 'vp-test-jenkins',
                tags: [
                    {
                        created: '2022-10-25T20:03:36',
                        name: 'master-1.0.0-1',
                    },
                ],
            },
        },
    ],
};
