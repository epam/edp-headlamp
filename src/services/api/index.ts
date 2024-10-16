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
    return `${this.apiService.apiBaseURL}/widgets/sonarqube/measures/component?component=${componentName}&metricKeys=bugs,code_smells,coverage,duplicated_lines_density,ncloc,sqale_rating,alert_status,reliability_rating,security_hotspots,security_rating,sqale_index,vulnerabilities`;
  }
}

export class DependencyTrackApiService {
  apiService: ApiServiceBase;

  constructor(apiService: ApiServiceBase) {
    this.apiService = apiService;
  }

  getProjectEndpoint(projectName: string) {
    return `${this.apiService.apiBaseURL}/widgets/deptrack/project?name=${projectName}`;
  }

  getProjectMetricsEndpoint(projectID: string) {
    return `${this.apiService.apiBaseURL}/widgets/deptrack/metrics/project/${projectID}/current`;
  }
}
