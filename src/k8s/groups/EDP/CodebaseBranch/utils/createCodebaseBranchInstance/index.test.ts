import { CODEBASE_BRANCH_FORM_NAMES } from '../../../../../../widgets/dialogs/ManageCodebaseBranch/names';
import { createCodebaseBranchInstance } from './index';

describe('testing createCodebaseBranchInstanceBasedOnFormValues', () => {
  it('should return valid kube object', () => {
    const object = createCodebaseBranchInstance(
      CODEBASE_BRANCH_FORM_NAMES,
      {
        fromCommit: 'com',
        release: false,
        branchName: 'test',
        reviewPipeline: 'test-review-pipeline',
        buildPipeline: 'test-build-pipeline',
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
        pipelines: {
          review: 'test-review-pipeline',
          build: 'test-build-pipeline',
        },
      },
      metadata: {
        name: 'test-codebase-name-test',
        labels: { 'app.edp.epam.com/codebaseName': 'test-codebase-name' },
      },
    });
  });
});
