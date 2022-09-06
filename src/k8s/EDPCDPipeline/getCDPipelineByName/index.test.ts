import { describe, it, jest } from '@jest/globals';
import { pluginLib } from '../../../plugin.globals';
import { CDPipelinesListMock, emptyCDPipelinesListMock } from '../mocks/cdPipelines.mock';
import { getCDPipelineByName } from './index';

const { ApiProxy } = pluginLib;

describe('checking getCDPipelineByName', () => {
    it('should append namespace to request URL if present', async () => {
        // Arrange
        const testNamespace = 'test-namespace';
        const testCDPipelineName = 'test-cdpipeline-name';
        const requestSpy = jest
            .spyOn(ApiProxy, 'request')
            .mockReturnValue(Promise.resolve(emptyCDPipelinesListMock));
        // Act
        await getCDPipelineByName(testNamespace, testCDPipelineName);
        // Assert
        const expectedURL = '/apis/v2.edp.epam.com/v1/namespaces/test-namespace/cdpipelines';
        expect(requestSpy).toHaveBeenCalledWith(expectedURL);
    });
    it('should return cdpipeline with wanted name', async () => {
        // Arrange
        const testNamespace = 'test-namespace';
        const testCDPipelineName = 'test-cdpipeline-name';
        jest.spyOn(ApiProxy, 'request').mockReturnValue(Promise.resolve(CDPipelinesListMock));
        // Act
        const result = await getCDPipelineByName(testNamespace, testCDPipelineName);
        // Assert
        expect(result.spec.name).toBe('test-cdpipeline-name');
    });
    it('should return null if cdpipeline with wanted name not found', async () => {
        // Arrange
        const testNamespace = 'test-namespace';
        const testCDPipelineName = 'test-cdpipeline-name';
        jest.spyOn(ApiProxy, 'request').mockReturnValue(Promise.resolve(emptyCDPipelinesListMock));
        // Act
        const result = await getCDPipelineByName(testNamespace, testCDPipelineName);
        // Assert
        expect(result).toBeNull();
    });
});
