import {
  PipelineRunData,
  PipelineRunKubeObjectInterface,
} from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { TaskRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/TaskRun/types';
import { DataProviderValue } from '../../../../types/pages';

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

export interface DynamicDataContextProviderValue {
  pipelineRun: DataProviderValue<PipelineRunKubeObjectInterface>;
  taskRuns: DataProviderValue<TaskRunKubeObjectInterface[]>;
  pipelineRunData: DataProviderValue<PipelineRunData>;
  fallbackLogs: DataProviderValue<OpensearchResponse>;
}
