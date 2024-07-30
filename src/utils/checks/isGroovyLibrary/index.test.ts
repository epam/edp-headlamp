import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';
import { isGroovyLibrary } from './index';

test('cheking isGroovyLibrary', () => {
  expect(
    isGroovyLibrary({
      spec: {
        type: 'library',
        lang: 'groovy-pipeline',
      },
    } as CodebaseKubeObjectInterface)
  ).toBeTruthy();
});

describe('cheking isGroovyLibrary', () => {
  it('should return true if spec type is library and lang is groovy-pipeline', () => {
    expect(
      isGroovyLibrary({
        spec: {
          type: 'library',
          lang: 'groovy-pipeline',
        },
      } as CodebaseKubeObjectInterface)
    ).toBeTruthy();
  });
  it('should return false if spec type is not library and lang is not groovy-pipeline', () => {
    expect(
      isGroovyLibrary({
        spec: {
          type: 'library',
        },
      } as CodebaseKubeObjectInterface)
    ).toBeFalsy();
  });
});
