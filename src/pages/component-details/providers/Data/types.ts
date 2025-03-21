import { DataProviderValue } from '../../../../types/pages';
import { DepTrackMetrics } from '../../../../widgets/DeeptrackVulnerabilities/types';
import { MetricKey } from '../../../../widgets/SonarQubeMetrics/types';

export interface DataContextProviderValue {
  depTrackData: DataProviderValue<{
    metrics: DepTrackMetrics | undefined;
    baseUrl: string | undefined;
    projectID: string | undefined;
  }>;
  sonarData: DataProviderValue<{
    metrics: Record<MetricKey, string> | undefined;
    baseUrl: string | undefined;
  }>;
}
