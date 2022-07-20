import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { isAutotest } from './index';

describe('cheking isAutotest', () => {
    it('should return true if spec type is autotests', () => {
        expect(
            isAutotest({
                spec: {
                    type: 'autotests',
                },
            } as EDPCodebaseKubeObjectInterface)
        ).toBeTruthy();
    });
    it('should return false if spec type is not autotests', () => {
        expect(
            isAutotest({
                spec: {
                    type: 'library',
                },
            } as EDPCodebaseKubeObjectInterface)
        ).toBeFalsy();
    });
});
