import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { isLibrary } from './index';

describe('cheking isAutotest', () => {
  it('should return true if spec type is library', () => {
    expect(
      isLibrary({
        spec: {
          type: 'library',
        },
      } as EDPCodebaseKubeObjectInterface)
    ).toBeTruthy();
  });
  it('should return false if spec type is not library', () => {
    expect(
      isLibrary({
        spec: {
          type: 'application',
        },
      } as EDPCodebaseKubeObjectInterface)
    ).toBeFalsy();
  });
});
