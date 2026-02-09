import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';
import { isApplication } from './index';

describe('cheking isApplication', () => {
  it('should return true if spec type is application', () => {
    expect(
      isApplication({
        spec: {
          type: 'application',
        },
      } as CodebaseKubeObjectInterface)
    ).toBeTruthy();
  });
  it('should return false if spec type is not application', () => {
    expect(
      isApplication({
        spec: {
          type: 'library',
        },
      } as CodebaseKubeObjectInterface)
    ).toBeFalsy();
  });
});
