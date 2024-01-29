export const SonarQubeURLService = {
  createDashboardLink: (sonarURLOrigin: string, branchName: string, codebaseName: string) => {
    if (!sonarURLOrigin) {
      return undefined;
    }

    return `${sonarURLOrigin}/dashboard?branch=${branchName}&id=${codebaseName}`;
  },
  createLinkByIssueType: (sonarURLOrigin: string, issueType: string, projectID: string) => {
    if (!sonarURLOrigin) {
      return undefined;
    }

    return `${sonarURLOrigin}/project/issues?id=${projectID}&resolved=false&types=${issueType}`;
  },
  createLinkByMetricName: (sonarURLOrigin: string, metricName: string, projectID: string) => {
    if (!sonarURLOrigin) {
      return undefined;
    }

    return `${sonarURLOrigin}/component_measures?id=${projectID}&metric=${metricName}`;
  },
  createMetricsApiUrl: (sonarURLOrigin: string, codebaseName: string, branchName: string) => {
    if (!sonarURLOrigin) {
      return undefined;
    }

    return `${sonarURLOrigin}/api/measures/component?component=${window.encodeURIComponent(
      codebaseName
    )}&branch=${window.encodeURIComponent(
      branchName
    )}&metricKeys=bugs,code_smells,coverage,duplicated_lines_density,ncloc,sqale_rating,alert_status,reliability_rating,security_hotspots,security_rating,sqale_index,vulnerabilities`;
  },
};
