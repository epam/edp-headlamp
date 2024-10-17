export class ApiServiceBase {
  apiBaseURL: string;
  headers: Headers;

  constructor(apiGatewayUrl: string, token: string) {
    this.apiBaseURL = apiGatewayUrl;
    this.headers = new Headers({
      Authorization: `Bearer ${token}`,
    });
  }

  createFetcher(url: string) {
    return fetch(url, {
      method: 'GET',
      headers: this.headers,
    })
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
