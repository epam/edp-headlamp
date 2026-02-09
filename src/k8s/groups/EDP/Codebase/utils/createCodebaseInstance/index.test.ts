import { CODEBASE_TYPE } from '../../../../../../constants/codebaseTypes';
import { CODEBASE_FORM_NAMES } from '../../../../../../widgets/dialogs/ManageCodebase/names';
import { createCodebaseInstance } from './index';

describe('testing createCodebaseExample', () => {
  describe('codebase type: application', () => {
    it('should return valid kube object', () => {
      const object = createCodebaseInstance(CODEBASE_FORM_NAMES, {
        strategy: 'create',
        gitServer: 'gerrit',
        ciTool: 'tekton',
        emptyProject: true,
        defaultBranch: 'master',
        lang: 'Java',
        framework: 'java11',
        buildTool: 'gradle',
        versioningType: 'edp',
        versioningStartFrom: '0.0.0-SNAPSHOT',
        deploymentScript: 'helm-chart',
        name: 'test',
        type: CODEBASE_TYPE.APPLICATION,
      });

      expect(object).toMatchObject({
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Codebase',
        spec: {
          type: 'application',
          strategy: 'create',
          gitServer: 'gerrit',
          ciTool: 'tekton',
          emptyProject: true,
          defaultBranch: 'master',
          lang: 'Java',
          framework: 'java11',
          buildTool: 'gradle',
          versioning: { type: 'edp', startFrom: '0.0.0-SNAPSHOT' },
          deploymentScript: 'helm-chart',
        },
        metadata: { name: 'test' },
      });
    });
  });
  describe('codebase type: library', () => {
    it('should return valid kube object', () => {
      const object = createCodebaseInstance(CODEBASE_FORM_NAMES, {
        strategy: 'create',
        gitServer: 'gerrit',
        ciTool: 'tekton',
        emptyProject: true,
        defaultBranch: 'master',
        lang: 'Java',
        framework: 'java11',
        buildTool: 'gradle',
        versioningType: 'edp',
        versioningStartFrom: '0.0.0-SNAPSHOT',
        deploymentScript: 'helm-chart',
        name: 'test',
        type: CODEBASE_TYPE.LIBRARY,
      });

      expect(object).toMatchObject({
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Codebase',
        spec: {
          type: 'library',
          strategy: 'create',
          gitServer: 'gerrit',
          ciTool: 'tekton',
          emptyProject: true,
          defaultBranch: 'master',
          lang: 'Java',
          framework: 'java11',
          buildTool: 'gradle',
          versioning: { type: 'edp', startFrom: '0.0.0-SNAPSHOT' },
          deploymentScript: 'helm-chart',
        },
        metadata: { name: 'test' },
      });
    });
  });
  describe('codebase type: autotest', () => {
    it('should return valid kube object', () => {
      const object = createCodebaseInstance(CODEBASE_FORM_NAMES, {
        strategy: 'clone',
        gitServer: 'gerrit',
        ciTool: 'tekton',
        name: 'test',
        repositoryUrl: 'https://github.com/kinvolk/headlamp.git',
        defaultBranch: 'master',
        description: 'autotest description',
        lang: 'Java',
        framework: 'java11',
        buildTool: 'maven',
        testReportFramework: 'allure',
        versioningType: 'edp',
        versioningStartFrom: '0.0.0-SNAPSHOT',
        type: CODEBASE_TYPE.AUTOTEST,
      });

      expect(object).toMatchObject({
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Codebase',
        spec: {
          type: 'autotest',
          strategy: 'clone',
          gitServer: 'gerrit',
          ciTool: 'tekton',
          repository: {
            url: 'https://github.com/kinvolk/headlamp.git',
          },
          defaultBranch: 'master',
          description: 'autotest description',
          lang: 'Java',
          framework: 'java11',
          buildTool: 'maven',
          testReportFramework: 'allure',
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
