import { ValueOf } from '../types/global';

export const PIPELINE_TYPE = {
  ALL: 'all',
  BUILD: 'build',
  REVIEW: 'review',
  DEPLOY: 'deploy',
  CLEAN: 'clean',
} as const;

export type PipelineType = ValueOf<typeof PIPELINE_TYPE>;
