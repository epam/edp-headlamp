import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';
import { isAutotest } from './index';

describe('cheking isAutotest', () => {
  it('should return true if spec type is autotests', () => {
    expect(
      isAutotest({
        spec: {
          type: 'autotest',
        },
      } as CodebaseKubeObjectInterface)
    ).toBeTruthy();
  });
  it('should return false if spec type is not autotests', () => {
    expect(
      isAutotest({
        spec: {
          type: 'library',
        },
      } as CodebaseKubeObjectInterface)
    ).toBeFalsy();
  });
});
