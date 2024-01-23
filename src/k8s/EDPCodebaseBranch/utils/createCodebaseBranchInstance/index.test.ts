import { CODEBASE_BRANCH_FORM_NAMES } from '../../../../widgets/CreateCodebaseBranch/names';
import { createCodebaseBranchInstance } from './index';

describe('testing createCodebaseBranchInstanceBasedOnFormValues', () => {
  it('should return valid kube object', () => {
    const object = createCodebaseBranchInstance(
      CODEBASE_BRANCH_FORM_NAMES,
      {
        fromCommit: 'com',
        release: false,
        branchName: 'test',
      },
      'test-codebase-name'
    );
    expect(object).toEqual({
      apiVersion: 'v2.edp.epam.com/v1',
      kind: 'CodebaseBranch',
      spec: {
        codebaseName: 'test-codebase-name',
        branchName: 'test',
        fromCommit: 'com',
        release: false,
      },
      metadata: {
        name: 'test-codebase-name-test',
        labels: { 'app.edp.epam.com/codebaseName': 'test-codebase-name' },
      },
    });
  });
});
