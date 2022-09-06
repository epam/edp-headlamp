import { describe, it, jest } from '@jest/globals';
import { pluginLib } from '../../../plugin.globals';
import { getCDPipelineByApplicationItUses } from '../getCDPipelineByApplicationItUses';
import { CDPipelinesListMock, emptyCDPipelinesListMock } from '../mocks/cdPipelines.mock';

const { ApiProxy } = pluginLib;

describe('checking getCDPipelineByApplicationItUses', () => {
    const testNamespace = 'test-namespace';
    const testCodebaseName = 'test-application';

    it('should return the cdpipeline that uses the application', async () => {
        // Arrange
        jest.spyOn(ApiProxy, 'request').mockReturnValue(Promise.resolve(CDPipelinesListMock));
        // Act
        const result = await getCDPipelineByApplicationItUses(testNamespace, testCodebaseName);
        // Assert
        expect(result.spec.name).toBe('test-cdpipeline-name');
    });
    it('should return null if cdpipeline that uses the application not found', async () => {
        // Arrange
        jest.spyOn(ApiProxy, 'request').mockReturnValue(Promise.resolve(emptyCDPipelinesListMock));
        // Act
        const result = await getCDPipelineByApplicationItUses(testNamespace, testCodebaseName);
        // Assert
        expect(result).toBeNull();
    });
});
