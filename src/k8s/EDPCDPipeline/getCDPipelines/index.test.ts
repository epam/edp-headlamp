import { describe, it, jest } from '@jest/globals';
import { pluginLib } from '../../../plugin.globals';
import { CDPipelinesListMock, emptyCDPipelinesListMock } from '../mocks/cdPipelines.mock';
import { getCDPipelines } from './index';

const { ApiProxy } = pluginLib;

describe('checking getCDPipelines', () => {
    const testNamespace = 'test-namespace';

    it('should append namespace to request URL if present', async () => {
        // Arrange
        const requestSpy = jest.spyOn(ApiProxy, 'request');
        // Act
        await getCDPipelines(testNamespace);
        // Assert
        const expectedURL = '/apis/v2.edp.epam.com/v1/namespaces/test-namespace/cdpipelines';
        expect(requestSpy).toHaveBeenCalledWith(expectedURL);
    });

    it('should return an array of pipelines', async () => {
        // Arrange
        jest.spyOn(ApiProxy, 'request').mockReturnValue(Promise.resolve(CDPipelinesListMock));
        // Act
        const result = await getCDPipelines(testNamespace);
        // Assert
        expect(result).toHaveProperty('items');
        expect(result.items).not.toHaveLength(0);
    });

    it('should return an empty array if there are no pipelines', async () => {
        // Arrange
        jest.spyOn(ApiProxy, 'request').mockReturnValue(Promise.resolve(emptyCDPipelinesListMock));
        // Act
        const result = await getCDPipelines(testNamespace);
        // Assert
        expect(result).toHaveProperty('items');
        expect(result.items).toHaveLength(0);
    });
});
