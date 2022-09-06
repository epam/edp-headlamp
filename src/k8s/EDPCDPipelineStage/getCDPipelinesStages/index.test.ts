import { describe, it, jest } from '@jest/globals';
import { pluginLib } from '../../../plugin.globals';
import { emptyCDPipelinesStagesListMock } from '../../EDPCDPipeline/mocks/cdPipelinesStages.mock';
import { getCDPipelinesStages } from './index';

const { ApiProxy } = pluginLib;

describe('checking getCDPipelinesStages', () => {
    const testNamespace = 'test-namespace';

    it('should append namespace to request URL if present', async () => {
        // Arrange
        const requestSpy = jest.spyOn(ApiProxy, 'request');
        // Act
        await getCDPipelinesStages(testNamespace);
        // Assert
        const expectedURL = '/apis/v2.edp.epam.com/v1/namespaces/test-namespace/stages';
        expect(requestSpy).toHaveBeenCalledWith(expectedURL);
    });

    it('should return an array of pipeline stages, empty array if there are no pipeline stages', async () => {
        // Arrange
        jest.spyOn(ApiProxy, 'request').mockReturnValue(
            Promise.resolve(emptyCDPipelinesStagesListMock)
        );
        // Act
        const result = await getCDPipelinesStages(testNamespace);
        // Assert
        expect(result).toHaveProperty('items');
    });
});
