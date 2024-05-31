import { DataProviderValue } from '../../../../types/pages';
import { DepTrackMetrics } from '../../../../widgets/DeeptrackVulnerabilities/types';
import { MetricKey } from '../../../../widgets/SonarQubeMetrics/types';

export interface DataContextProviderValue {
  depTrackData: DataProviderValue<{
    metrics: DepTrackMetrics;
    baseUrl: string;
  }>;
  sonarData: DataProviderValue<{
    metrics: Record<MetricKey, string>;
    baseUrl: string;
  }>;
}
