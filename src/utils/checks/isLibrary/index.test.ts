import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';
import { isLibrary } from './index';

describe('cheking isAutotest', () => {
  it('should return true if spec type is library', () => {
    expect(
      isLibrary({
        spec: {
          type: 'library',
        },
      } as CodebaseKubeObjectInterface)
    ).toBeTruthy();
  });
  it('should return false if spec type is not library', () => {
    expect(
      isLibrary({
        spec: {
          type: 'application',
        },
      } as CodebaseKubeObjectInterface)
    ).toBeFalsy();
  });
});
