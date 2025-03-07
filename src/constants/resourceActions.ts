import { ValueOf } from '../types/global';

export const RESOURCE_ACTION = {
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
} as const;

export type ResourceAction = ValueOf<typeof RESOURCE_ACTION>;
