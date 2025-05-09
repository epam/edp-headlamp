import {
  PipelineRunData,
  PipelineRunKubeObjectInterface,
} from '../../../../../../k8s/groups/Tekton/PipelineRun/types';
import { TaskRunKubeObjectInterface } from '../../../../../../k8s/groups/Tekton/TaskRun/types';
import { DataProviderValue } from '../../../../../../types/pages';

export interface OpensearchResponse {
  _shards: {
    failed: number;
    skipped: number;
    successful: number;
    total: number;
  };
  hits: {
    hits: {
      _id: string;
      _index: string;
      _score: any;
      _source: {
        kubernetes: {
          labels: Record<string, string>;
        };
        log: string;
      };
      sort: number[];
    }[];
    max_score: any;
    total: {
      relation: string;
      value: string;
    };
  };
  timed_out: boolean;
  took: number;
}

export interface NormalizedLogs {
  map: Record<string, string[]>;
  order: string[];
  all: string[];
}

export interface DynamicDataContextProviderValue {
  pipelineRun: DataProviderValue<PipelineRunKubeObjectInterface | null | undefined>;
  taskRuns: DataProviderValue<TaskRunKubeObjectInterface[] | null>;
  pipelineRunData: DataProviderValue<PipelineRunData | undefined>;
  logs: DataProviderValue<NormalizedLogs | undefined>;
}
