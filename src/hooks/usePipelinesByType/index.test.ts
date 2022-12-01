/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import { usePipelinesByType } from './index';
import { pipelinesMock } from './mocks/pipelines.mock';

const { ApiProxy } = pluginLib;

describe('testing usePipelinesByType hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(ApiProxy, 'request').mockResolvedValue(pipelinesMock);

        const usePipelinesProps = { namespace: 'test-namespace', pipelineType: 'deploy' };
        const { result, waitForNextUpdate } = renderHook(() =>
            usePipelinesByType(usePipelinesProps)
        );

        await waitForNextUpdate();
        expect(result.current.pipelines).toEqual([
            {
                apiVersion: 'tekton.dev/v1beta1',
                kind: 'Pipeline',
                metadata: {
                    labels: {
                        'app.edp.epam.com/pipelinetype': 'deploy',
                    },
                    name: 'cdpipeline',
                    namespace: 'edp-delivery-tekton-dev',
                },
            },
        ]);
        await expect(
            result.current.pipelines[0].metadata.labels['app.edp.epam.com/pipelinetype']
        ).toEqual('deploy');
        await expect(result.current.error).toBeNull();
    });

    it(`should throw an error if something goes wrong`, async () => {
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const usePipelinesProps = { namespace: 'test-namespace', pipelineType: 'deploy' };
        const { result, waitForNextUpdate } = renderHook(() =>
            usePipelinesByType(usePipelinesProps)
        );

        await waitForNextUpdate();
        await expect(result.current.pipelines).toHaveLength(0);
        await expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
