export const SonarQubeURLService = {
  createDashboardLink: ({
    baseURL,
    codebaseName,
    defaultBranchName,
  }: {
    baseURL: string;
    codebaseName: string;
    defaultBranchName: string;
  }) => {
    if (!baseURL) {
      return undefined;
    }

    const dashboardURL = new URL(`${baseURL}/dashboard`);

    dashboardURL.searchParams.append('id', codebaseName);
    dashboardURL.searchParams.append('branch', defaultBranchName);

    return dashboardURL.toString();
  },
  createLinkByIssueType: ({
    baseURL,
    codebaseName,
    issueType,
    defaultBranchName,
  }: {
    baseURL: string;
    codebaseName: string;
    issueType: string;
    defaultBranchName: string;
  }) => {
    if (!baseURL) {
      return undefined;
    }

    const dashboardURL = new URL(`${baseURL}/project/issues`);

    dashboardURL.searchParams.append('id', codebaseName);
    dashboardURL.searchParams.append('branch', defaultBranchName);
    dashboardURL.searchParams.append('resolved', 'false');
    dashboardURL.searchParams.append('types', issueType);

    return dashboardURL.toString();
  },
  createLinkByMetricName: ({
    baseURL,
    codebaseName,
    defaultBranchName,
    metricName,
  }: {
    baseURL: string;
    codebaseName: string;
    defaultBranchName: string;
    metricName: string;
  }) => {
    if (!baseURL) {
      return undefined;
    }

    const componentMeasuresURL = new URL(`${baseURL}/component_measures`);

    componentMeasuresURL.searchParams.append('id', codebaseName);
    componentMeasuresURL.searchParams.append('branch', defaultBranchName);
    componentMeasuresURL.searchParams.append('metric', metricName);

    return componentMeasuresURL.toString();
  },
  createMetricsApiUrl: ({
    baseURL,
    codebaseName,
    defaultBranchName,
  }: {
    baseURL: string;
    codebaseName: string;
    defaultBranchName: string;
  }) => {
    if (!baseURL) {
      return undefined;
    }

    const metricsApiUrl = new URL(`${baseURL}/api/measures/component`);

    metricsApiUrl.searchParams.append('component', codebaseName);
    metricsApiUrl.searchParams.append('branch', defaultBranchName);
    metricsApiUrl.searchParams.append(
      'metricKeys',
      'bugs,code_smells,coverage,duplicated_lines_density,ncloc,sqale_rating,alert_status,reliability_rating,security_hotspots,security_rating,sqale_index,vulnerabilities'
    );

    return metricsApiUrl.toString();
  },
};
