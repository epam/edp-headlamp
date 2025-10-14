export class ApiServiceBase {
  apiBaseURL: string;
  headers: Headers;

  constructor(apiGatewayUrl: string, token: string) {
    this.apiBaseURL = apiGatewayUrl;
    this.headers = new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  createFetcher(url: string, body?: RequestInit['body'], method: RequestInit['method'] = 'GET') {
    const requestInit: RequestInit = {
      method: method,
      headers: this.headers,
    };

    if (body && method && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      requestInit.body = body;
    }

    return fetch(url, requestInit)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Request failed: ${response.status}`);
        }
      })
      .catch((error) => {
        throw new Error(`Request failed: ${error?.message}`);
      });
  }
}

export class SonarApiService {
  apiService: ApiServiceBase;

  constructor(apiService: ApiServiceBase) {
    this.apiService = apiService;
  }

  getMetricsEndpoint(componentName: string) {
    const params = new URLSearchParams({
      component: componentName,
      metricKeys:
        'bugs,code_smells,coverage,duplicated_lines_density,ncloc,sqale_rating,alert_status,reliability_rating,security_hotspots,security_rating,sqale_index,vulnerabilities',
    });

    return new URL(
      `/widgets/sonarqube/measures/component?${params.toString()}`,
      this.apiService.apiBaseURL
    ).toString();
  }
}

export class GitFusionApiService {
  apiService: ApiServiceBase;

  constructor(apiService: ApiServiceBase) {
    this.apiService = apiService;
  }

  getRepoListEndpoint(gitServer: string, owner: string) {
    const params = new URLSearchParams({
      gitServer: gitServer,
      owner,
    });

    return new URL(
      `/gitfusion/repositories?${params.toString()}`,
      this.apiService.apiBaseURL
    ).toString();
  }

  getOrganizationsEndpoint(gitServer: string) {
    const params = new URLSearchParams({
      gitServer: gitServer,
    });
    return new URL(
      `/gitfusion/organizations?${params.toString()}`,
      this.apiService.apiBaseURL
    ).toString();
  }

  getBranchListEndpoint(gitServer: string, owner: string, repoName: string) {
    const params = new URLSearchParams({
      gitServer: gitServer,
      owner,
      repoName,
    });

    return new URL(
      `/gitfusion/branches?${params.toString()}`,
      this.apiService.apiBaseURL
    ).toString();
  }

  getInvalidateBranchListCache() {
    const params = new URLSearchParams({
      endpoint: 'branches',
    });

    return new URL(
      `/gitfusion/invalidate?${params.toString()}`,
      this.apiService.apiBaseURL
    ).toString();
  }

  /**
   * Triggers a GitLab CI/CD pipeline via GitFusion backend
   * @param gitServer - Git server name from codebase (e.g., 'gitlab')
   * @param project - Project path from codebase.spec.gitUrlPath without leading slash
   * @param ref - Branch name from codebaseBranch.spec.branchName
   * @param variables - Optional pipeline variables (environment variables only)
   * @returns API endpoint URL for triggering pipeline
   */
  getTriggerGitLabPipelineEndpoint(
    gitServer: string,
    project: string,
    ref: string,
    variables?: Array<{ key: string; value: string }>
  ) {
    const params = new URLSearchParams({
      gitServer,
      project,
      ref,
    });

    // Optionally include variables as JSON string
    if (variables && variables.length > 0) {
      params.append('variables', JSON.stringify(variables));
    }

    return new URL(
      `/gitfusion/trigger-pipeline?${params.toString()}`,
      this.apiService.apiBaseURL
    ).toString();
  }
}

export class DependencyTrackApiService {
  apiService: ApiServiceBase;

  constructor(apiService: ApiServiceBase) {
    this.apiService = apiService;
  }

  getProjectEndpoint(projectName: string) {
    const params = new URLSearchParams({
      name: projectName,
    });
    return new URL(
      `/widgets/deptrack/project?${params.toString()}`,
      this.apiService.apiBaseURL
    ).toString();
  }

  getProjectMetricsEndpoint(projectID: string) {
    const params = new URLSearchParams({
      projectID: projectID,
    });
    return new URL(
      `/widgets/deptrack/metrics/project/${projectID}/current?${params.toString()}`,
      this.apiService.apiBaseURL
    ).toString();
  }
}

export class OpensearchApiService {
  apiService: ApiServiceBase;

  constructor(apiService: ApiServiceBase) {
    this.apiService = apiService;
  }

  getLogsEndpoint() {
    return new URL(`/search/logs`, this.apiService.apiBaseURL).toString();
  }
}
