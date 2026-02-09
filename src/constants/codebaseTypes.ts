import { ValueOf } from '../types/global';

export const CODEBASE_TYPE = {
  APPLICATION: 'application',
  AUTOTEST: 'autotest',
  LIBRARY: 'library',
  INFRASTRUCTURE: 'infrastructure',
  SYSTEM: 'system',

  ALL: 'all',
} as const;

export type CodebaseType = ValueOf<typeof CODEBASE_TYPE>;
