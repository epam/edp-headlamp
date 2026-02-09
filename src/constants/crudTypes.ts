import { ValueOf } from '../types/global';

export const CRUD_TYPE = {
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
} as const;

export type CRUDType = ValueOf<typeof CRUD_TYPE>;
