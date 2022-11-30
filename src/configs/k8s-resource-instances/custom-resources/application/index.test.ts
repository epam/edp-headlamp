/**
 * @jest-environment jsdom
 */

import { createApplicationInstance } from './index';

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
                name: 'test-pipeline-name-test-stage-name-test-application-name',
                namespace: 'test-namespace',
                labels: {
                    'app.edp.epam.com/pipeline-stage': `test-pipeline-name-test-stage-name`,
                    'app.edp.epam.com/pipeline': `test-pipeline-name`,
                    'app.edp.epam.com/app-name': 'test-application-name',
                },
                finalizers: ['resources-finalizer.argocd.argoproj.io'],
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
