/**
 * @jest-environment jsdom
 */

import { SonarQubeURLService } from './index';

describe('testing link-creation SonarQubeURLService', () => {
  it('should successfully create sonar url based on given sonarURLOrigin and namespace params', () => {
    expect(
      SonarQubeURLService.createDashboardLink({
        baseURL: 'https://sonar-test.com',
        codebaseName: 'test-application',
      })
    ).toEqual('https://sonar-test.com/dashboard?id=test-application');
  });

  it('should successfully create metric url based on given sonarURLOrigin and metricName params', () => {
    expect(
      SonarQubeURLService.createLinkByMetricName({
        baseURL: 'https://sonar-test.com',
        codebaseName: 'test-application',
        metricName: 'bugs',
      })
    ).toEqual('https://sonar-test.com/component_measures?id=test-application&metric=bugs');
  });

  it('should successfully create issue url based on given sonarURLOrigin and issueType params', () => {
    expect(
      SonarQubeURLService.createLinkByIssueType({
        baseURL: 'https://sonar-test.com',
        codebaseName: 'test-application',
        issueType: 'coverage',
      })
    ).toEqual(
      'https://sonar-test.com/project/issues?id=test-application&resolved=false&types=coverage'
    );
  });

  it('should successfully create metrics api url based on given sonarURLOrigin and codebaseName params', () => {
    expect(
      SonarQubeURLService.createMetricsApiUrl({
        baseURL: 'https://sonar-test.com',
        codebaseName: 'test-application',
      })
    ).toEqual(
      'https://sonar-test.com/api/measures/component?component=test-application&metricKeys=bugs%2Ccode_smells%2Ccoverage%2Cduplicated_lines_density%2Cncloc%2Csqale_rating%2Calert_status%2Creliability_rating%2Csecurity_hotspots%2Csecurity_rating%2Csqale_index%2Cvulnerabilities'
    );
  });
});
