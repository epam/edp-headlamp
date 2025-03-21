import { DataProviderValue } from '../../types/pages';

export type DepTrackMetrics = {
  critical: number;
  high: number;
  medium: number;
  low: number;
  unassigned: number;
  vulnerabilities: number;
  [key: string]: number;
};

export interface DeeptrackVulnerabilitiesProps {
  depTrackData: DataProviderValue<{
    metrics: DepTrackMetrics | undefined;
    baseUrl: string | undefined;
    projectID: string | undefined;
  }>;
}
