/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { pluginLib } from '../../plugin.globals';
import { useApplicationsInCDPipeline } from './index';
import { CDPipelineMock } from './mocks/CDPipeline.mock';
import { codebaseImageStreamsMock } from './mocks/codebaseImageStreams.mock';
import { codebasesMock } from './mocks/codebases.mock';
const { ApiProxy } = pluginLib;

describe('testing useApplicationsInCDPipeline hook', () => {
    it('should return applications with their to promote status', async () => {
        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('codebases')) {
                return Promise.resolve(codebasesMock);
            }
            if (url.includes('codebaseimagestreams')) {
                return Promise.resolve(codebaseImageStreamsMock);
            }
        });

        const useApplicationsInCDPipelineProps = {
            CDPipelineData: CDPipelineMock as EDPCDPipelineKubeObjectInterface,
        };

        const { result, waitForNextUpdate } = renderHook(() =>
            useApplicationsInCDPipeline(useApplicationsInCDPipelineProps)
        );

        await waitForNextUpdate();

        await expect(result.current.applications).toEqual([
            {
                application: {
                    apiVersion: 'v2.edp.epam.com/v1',
                    kind: 'Codebase',
                    metadata: {
                        name: 'test-python-2',
                        namespace: 'edp-delivery-vp-dev',
                        resourceVersion: '335482485',
                    },
                },
                toPromote: true,
                applicationImageStreams: [
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
                                '093899590031.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev/test-python-2',
                            tags: [{ created: '2022-10-26T13:41:09', name: 'main-1.0.0-1' }],
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
                            imageName:
                                '093899590031.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev',
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
                            imageName:
                                '093899590031.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev',
                        },
                    },
                ],
            },
            {
                application: {
                    apiVersion: 'v2.edp.epam.com/v1',
                    kind: 'Codebase',
                    metadata: { name: 'vp-test-jenkins', namespace: 'edp-delivery-vp-dev' },
                },
                toPromote: true,
                applicationImageStreams: [
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
                                '093899590031.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev/vp-test-jenkins',
                            tags: [{ created: '2022-10-25T19:57:04', name: 'master-1.0.0-1' }],
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
                            imageName:
                                '093899590031.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev',
                            tags: [{ created: '2022-10-25T20:04:59', name: 'master-1.0.0-1' }],
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
                            tags: [{ created: '2022-10-25T20:03:36', name: 'master-1.0.0-1' }],
                        },
                    },
                ],
            },
        ]);
        await expect(result.current.error).toBeNull();
    });
    it('should throw an error after async request if something goes wrong', async () => {
        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('codebases')) {
                return Promise.resolve(codebasesMock);
            }
            if (url.includes('codebaseimagestreams')) {
                return Promise.reject({ status: 'Failure' });
            }
        });
        const useApplicationsInCDPipelineProps = {
            CDPipelineData: CDPipelineMock as EDPCDPipelineKubeObjectInterface,
        };

        const { result, waitForNextUpdate } = renderHook(() =>
            useApplicationsInCDPipeline(useApplicationsInCDPipelineProps)
        );

        await waitForNextUpdate();
        await expect(result.current.applications).toHaveLength(0);
        await expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
