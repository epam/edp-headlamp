import { CODEBASE_BRANCH_NAMES } from '../../../../components/CreateCodebaseBranch/components/CreateCodebaseBranchForm/names';
import {
    createCodebaseBranchInstanceBasedOnFormValues,
    createDefaultCodebaseBranchInstance,
} from './index';

describe('testing createCodebaseBranchInstanceBasedOnFormValues', () => {
    it('should return valid kube object', () => {
        const object = createCodebaseBranchInstanceBasedOnFormValues(
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

describe('testing createDefaultCodebaseBranchInstance', () => {
    it('should return valid kube object with edp versioning', () => {
        const object = createDefaultCodebaseBranchInstance({
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Codebase',
            metadata: {
                name: 'test-release-branch',
                namespace: 'edp-delivery-vp-delivery-dev',
            },
            spec: {
                defaultBranch: 'master',
                versioning: {
                    startFrom: '0.0.0-SNAPSHOT',
                    type: 'edp',
                },
            },
        });

        expect(object).toEqual({
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseBranch',
            spec: {
                codebaseName: 'test-release-branch',
                branchName: 'master',
                fromCommit: '',
                release: false,
                version: '0.0.0-SNAPSHOT',
            },
            metadata: {
                name: 'test-release-branch-master',
                namespace: 'edp-delivery-vp-delivery-dev',
                labels: { 'app.edp.epam.com/codebaseName': 'test-release-branch' },
            },
            status: { versionHistory: ['0.0.0-SNAPSHOT'] },
        });
    });
    it('should return valid kube object with default versioning', () => {
        const object = createDefaultCodebaseBranchInstance({
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Codebase',
            metadata: {
                name: 'test-release-branch',
                namespace: 'edp-delivery-vp-delivery-dev',
            },
            spec: {
                defaultBranch: 'master',
                versioning: {
                    type: 'default',
                },
            },
        });

        expect(object).toEqual({
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseBranch',
            spec: {
                codebaseName: 'test-release-branch',
                branchName: 'master',
                fromCommit: '',
                release: false,
            },
            metadata: {
                name: 'test-release-branch-master',
                namespace: 'edp-delivery-vp-delivery-dev',
                labels: { 'app.edp.epam.com/codebaseName': 'test-release-branch' },
            },
        });
    });
});
