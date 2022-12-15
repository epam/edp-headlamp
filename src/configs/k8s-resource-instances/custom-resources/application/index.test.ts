/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { createRandomFiveSymbolString } from '../../../../utils/createRandomFiveSymbolString';
import { createApplicationInstance } from './index';

beforeEach(() => {
    jest.spyOn(global.window.crypto, 'getRandomValues').mockReturnValue(
        new Uint32Array([2736861854, 4288701136, 612580786, 3178865852, 3429947584])
    );
});

afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.window.crypto, 'getRandomValues').mockRestore();
});

describe('testing createApplicationInstance', () => {
    it('should return valid kube object', () => {
        const randomPostfix = createRandomFiveSymbolString();

        const object = createApplicationInstance({
            pipelineName: 'test-pipeline-name',
            stageData: {
                apiVersion: 'v2.edp.epam.com/v1',
                kind: 'Stage',
                metadata: {
                    name: `test-pipeline-name-test-stage-name`,
                    uid: '84dfeba1-bc42-4d1b-ab1f-473ebdf0fdf3',
                },
                spec: {
                    name: 'test-stage-name',
                },
            } as unknown as EDPCDPipelineStageKubeObjectInterface,
            appName: 'test-application-name',
            imageName: 'test-image-name',
            imageTag: 'test-image-tag',
            port: 45565,
            namespace: 'test-namespace',
            versioningType: 'test-versioning-type',
        });

        expect(object).toEqual({
            apiVersion: 'argoproj.io/v1alpha1',
            kind: 'Application',
            metadata: {
                name: `test-application-name-${randomPostfix}`,
                namespace: 'test-namespace',
                labels: {
                    'app.edp.epam.com/stage': `test-stage-name`,
                    'app.edp.epam.com/pipeline': `test-pipeline-name`,
                    'app.edp.epam.com/app-name': 'test-application-name',
                },
                finalizers: ['resources-finalizer.argocd.argoproj.io'],
                ownerReferences: [
                    {
                        apiVersion: 'v2.edp.epam.com/v1',
                        blockOwnerDeletion: true,
                        controller: true,
                        kind: 'Stage',
                        name: 'test-pipeline-name-test-stage-name',
                        uid: '84dfeba1-bc42-4d1b-ab1f-473ebdf0fdf3',
                    },
                ],
            },
            spec: {
                project: 'test-namespace',
                destination: {
                    namespace: 'test-namespace-test-pipeline-name-test-stage-name',
                    server: 'https://kubernetes.default.svc',
                },
                source: {
                    helm: {
                        parameters: [
                            { name: 'image.tag', value: 'test-image-tag' },
                            { name: 'image.repository', value: 'test-image-name' },
                        ],
                    },
                    path: 'deploy-templates',
                    repoURL: 'ssh://argocd@gerrit.test-namespace:45565/test-application-name.git',
                    targetRevision: 'test-image-tag',
                },
                syncPolicy: {
                    syncOptions: ['CreateNamespace=true'],
                    automated: { selfHeal: true, prune: true },
                },
            },
        });
    });
});
