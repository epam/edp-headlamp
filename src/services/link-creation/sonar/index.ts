export const SonarQubeURLService = {
    createDashboardLink: (sonarURLOrigin: string, codebaseBranchName: string) => {
        if (!sonarURLOrigin) {
            return undefined;
        }

        return `${sonarURLOrigin}/dashboard?id=${codebaseBranchName}`;
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
};
