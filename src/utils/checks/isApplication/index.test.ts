import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { isApplication } from './index';

describe('cheking isApplication', () => {
    it('should return true if spec type is application', () => {
        expect(
            isApplication({
                spec: {
                    type: 'application',
                },
            } as EDPCodebaseKubeObjectInterface)
        ).toBeTruthy();
    });
    it('should return false if spec type is not application', () => {
        expect(
            isApplication({
                spec: {
                    type: 'library',
                },
            } as EDPCodebaseKubeObjectInterface)
        ).toBeFalsy();
    });
});
