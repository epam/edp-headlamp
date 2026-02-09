export interface GitLabPipelineVariable {
  key: string;
  value: string;
}

export interface GitLabPipelineTriggerData {
  gitServer: string;
  gitUrlPath: string;
  branchName: string;
  gitWebUrl?: string;
  variables?: GitLabPipelineVariable[];
}

export interface GitLabPipelineResponse {
  id: number;
  web_url: string;
  status: string;
  ref: string;
  sha?: string;
}
