import { CODEBASE_BRANCH_NAMES } from '../../../../components/CreateCodebaseBranch/components/CreateCodebaseBranchForm/names';
import { createCodebaseBranchInstance } from './index';

describe('testing createCodebaseBranchInstance', () => {
    it('should return valid kube object', () => {
        const object = createCodebaseBranchInstance(
            CODEBASE_BRANCH_NAMES,
            {
                fromCommit: 'com',
                release: false,
                branchName: 'test',
            },
            'test-codebase-name',
            'test-namespace'
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
                namespace: 'test-namespace',
                labels: { 'app.edp.epam.com/codebaseName': 'test-codebase-name' },
            },
        });
    });
});
