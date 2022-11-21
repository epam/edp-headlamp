/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
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
        const object = createApplicationInstance({
            pipelineName: 'test-pipeline-name',
            stageName: 'test-stage-name',
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
                name: 'test-pipeline-name-test-stage-name-test-application-name-8ygse',
                namespace: 'test-namespace',
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
