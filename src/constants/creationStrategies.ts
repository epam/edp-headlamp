import { ValueOf } from '../types/global';

export const CODEBASE_CREATION_STRATEGY = {
  CREATE: 'create',
  CLONE: 'clone',
  IMPORT: 'import',
} as const;

export type CodebaseCreationStrategy = ValueOf<typeof CODEBASE_CREATION_STRATEGY>;
