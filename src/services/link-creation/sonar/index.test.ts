import { SonarQubeURLService } from './index';

describe('testing link-creation SonarQubeURLService', () => {
    it('should successfully create sonar url based on given sonarURLOrigin and namespace params', () => {
        expect(
            SonarQubeURLService.createDashboardLink(
                'https://sonar-test.com',
                'test-codebaseBranch-name'
            )
        ).toEqual('https://sonar-test.com/dashboard?id=test-codebaseBranch-name');
    });

    it('should successfully create metric url based on given sonarURLOrigin and metricName params', () => {
        expect(
            SonarQubeURLService.createLinkByMetricName(
                'https://sonar-test.com',
                'bugs',
                'test-project'
            )
        ).toEqual('https://sonar-test.com/component_measures?id=test-project&metric=bugs');
    });

    it('should successfully create issue url based on given sonarURLOrigin and issueType params', () => {
        expect(
            SonarQubeURLService.createLinkByIssueType(
                'https://sonar-test.com',
                'coverage',
                'test-project'
            )
        ).toEqual(
            'https://sonar-test.com/project/issues?id=test-project&resolved=false&types=coverage'
        );
    });
});
