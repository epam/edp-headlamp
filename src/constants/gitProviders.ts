import { ValueOf } from '../types/global';

export const GIT_PROVIDER = {
  GERRIT: 'gerrit',
  GITLAB: 'gitlab',
  GITHUB: 'github',
  BITBUCKET: 'bitbucket',
} as const;

export type GitProvider = ValueOf<typeof GIT_PROVIDER>;
