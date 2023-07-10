import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { CODEBASE_NAMES } from '../../../../widgets/CreateCodebase/names';
import { createCodebaseInstance } from './index';

describe('testing createCodebaseExample', () => {
    describe('codebase type: application', () => {
        it('should return valid kube object', () => {
            const object = createCodebaseInstance(CODEBASE_NAMES, CODEBASE_TYPES['APPLICATION'], {
                strategy: 'create',
                gitServer: 'gerrit',
                ciTool: 'jenkins',
                emptyProject: true,
                jenkinsSlave: 'gradle-java11',
                defaultBranch: 'master',
                lang: 'Java',
                framework: 'java11',
                buildTool: 'gradle',
                jobProvisioning: 'default',
                versioningType: 'edp',
                versioningStartFrom: '0.0.0-SNAPSHOT',
                deploymentScript: 'helm-chart',
                name: 'test',
            });

            expect(object).toMatchObject({
                apiVersion: 'v2.edp.epam.com/v1',
                kind: 'Codebase',
                spec: {
                    type: 'application',
                    strategy: 'create',
                    gitServer: 'gerrit',
                    ciTool: 'jenkins',
                    emptyProject: true,
                    jenkinsSlave: 'gradle-java11',
                    defaultBranch: 'master',
                    lang: 'Java',
                    framework: 'java11',
                    buildTool: 'gradle',
                    jobProvisioning: 'default',
                    versioning: { type: 'edp', startFrom: '0.0.0-SNAPSHOT' },
                    deploymentScript: 'helm-chart',
                },
                metadata: { name: 'test' },
            });
        });
    });
    describe('codebase type: library', () => {
        it('should return valid kube object', () => {
            const object = createCodebaseInstance(CODEBASE_NAMES, CODEBASE_TYPES['LIBRARY'], {
                strategy: 'create',
                gitServer: 'gerrit',
                ciTool: 'jenkins',
                emptyProject: true,
                jenkinsSlave: 'gradle-java11',
                defaultBranch: 'master',
                lang: 'Java',
                framework: 'java11',
                buildTool: 'gradle',
                jobProvisioning: 'default',
                versioningType: 'edp',
                versioningStartFrom: '0.0.0-SNAPSHOT',
                deploymentScript: 'helm-chart',
                name: 'test',
            });

            expect(object).toMatchObject({
                apiVersion: 'v2.edp.epam.com/v1',
                kind: 'Codebase',
                spec: {
                    type: 'library',
                    strategy: 'create',
                    gitServer: 'gerrit',
                    ciTool: 'jenkins',
                    emptyProject: true,
                    jenkinsSlave: 'gradle-java11',
                    defaultBranch: 'master',
                    lang: 'Java',
                    framework: 'java11',
                    buildTool: 'gradle',
                    jobProvisioning: 'default',
                    versioning: { type: 'edp', startFrom: '0.0.0-SNAPSHOT' },
                    deploymentScript: 'helm-chart',
                },
                metadata: { name: 'test' },
            });
        });
    });
    describe('codebase type: autotest', () => {
        it('should return valid kube object', () => {
            const object = createCodebaseInstance(CODEBASE_NAMES, CODEBASE_TYPES['AUTOTEST'], {
                strategy: 'clone',
                gitServer: 'gerrit',
                ciTool: 'jenkins',
                jenkinsSlave: 'maven-java11',
                name: 'test',
                repositoryUrl: 'https://github.com/kinvolk/headlamp.git',
                defaultBranch: 'master',
                description: 'autotest description',
                lang: 'Java',
                framework: 'java11',
                buildTool: 'maven',
                testReportFramework: 'allure',
                jobProvisioning: 'default',
                versioningType: 'edp',
                versioningStartFrom: '0.0.0-SNAPSHOT',
            });

            expect(object).toMatchObject({
                apiVersion: 'v2.edp.epam.com/v1',
                kind: 'Codebase',
                spec: {
                    type: 'autotest',
                    strategy: 'clone',
                    gitServer: 'gerrit',
                    ciTool: 'jenkins',
                    jenkinsSlave: 'maven-java11',
                    repository: {
                        url: 'https://github.com/kinvolk/headlamp.git',
                    },
                    defaultBranch: 'master',
                    description: 'autotest description',
                    lang: 'Java',
                    framework: 'java11',
                    buildTool: 'maven',
                    testReportFramework: 'allure',
                    jobProvisioning: 'default',
                    versioning: {
                        type: 'edp',
                        startFrom: '0.0.0-SNAPSHOT',
                    },
                },
                metadata: {
                    name: 'test',
                },
            });
        });
    });
});
