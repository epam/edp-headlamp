import { describe, it, jest } from '@jest/globals';
import { pluginLib } from '../../../plugin.globals';
import { getCDPipelineByCodebaseBranchItUses } from '../getCDPipelineByCodebaseBranchItUses';
import { CDPipelinesListMock, emptyCDPipelinesListMock } from '../mocks/cdPipelines.mock';

const { ApiProxy } = pluginLib;

describe('checking getCDPipelineByCodebaseBranchItUses', () => {
    const testNamespace = 'test-namespace';
    const testCodebaseBranchName = 'test-application-branch';

    it('should return the cdpipeline that uses the application', async () => {
        // Arrange
        jest.spyOn(ApiProxy, 'request').mockReturnValue(Promise.resolve(CDPipelinesListMock));
        // Act
        const result = await getCDPipelineByCodebaseBranchItUses(
            testNamespace,
            testCodebaseBranchName
        );
        // Assert
        expect(result.spec.name).toBe('test-cdpipeline-name');
    });
    it('should return null if cdpipeline that uses the application not found', async () => {
        // Arrange
        jest.spyOn(ApiProxy, 'request').mockReturnValue(Promise.resolve(emptyCDPipelinesListMock));
        // Act
        const result = await getCDPipelineByCodebaseBranchItUses(
            testNamespace,
            testCodebaseBranchName
        );
        // Assert
        expect(result).toBeNull();
    });
});
