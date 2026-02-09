import { v4 as uuidv4 } from 'uuid';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../../../../widgets/dialogs/ManageCodebaseBranch/names';
import { createCodebaseBranchInstance } from './index';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

const MOCKED_UUID = '1234';
(uuidv4 as jest.Mock).mockReturnValue(MOCKED_UUID);
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
      'java8-gr-create-branch6-def-ui'
    );
    expect(object).toEqual({
      apiVersion: 'v2.edp.epam.com/v1',
      kind: 'CodebaseBranch',
      spec: {
        codebaseName: 'java8-gr-create-branch6-def-ui',
        branchName: 'test',
        fromCommit: 'com',
        release: false,
        pipelines: {
          review: 'test-review-pipeline',
          build: 'test-build-pipeline',
        },
      },
      metadata: {
        name: 'java8-gr-create-branch6-def-ui-test-1234',
        labels: { 'app.edp.epam.com/codebaseName': 'java8-gr-create-branch6-def-ui' },
      },
    });
  });
});
