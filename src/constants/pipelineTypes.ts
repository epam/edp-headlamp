import { ValueOf } from '../types/global';

export const PIPELINE_TYPE = {
  ALL: 'all',
  BUILD: 'build',
  REVIEW: 'review',
  DEPLOY: 'deploy',
  CLEAN: 'clean',
  SECURITY: 'security',
  RELEASE: 'release',
  TESTS: 'tests',
} as const;

export type PipelineType = ValueOf<typeof PIPELINE_TYPE>;
