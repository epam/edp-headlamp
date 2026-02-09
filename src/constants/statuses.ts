import { ValueOf } from '../types/global';

type StatusType = Record<string, number>;

export const CUSTOM_RESOURCE_STATUS = {
  CREATED: 'created',
  INITIALIZED: 'initialized',
  IN_PROGRESS: 'in-progress',
  FAILED: 'failed',
} as const;

export type CustomResourceStatus = ValueOf<typeof CUSTOM_RESOURCE_STATUS>;

export const CUSTOM_RESOURCE_ACTIVE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export type CustomResourceActiveStatus = ValueOf<typeof CUSTOM_RESOURCE_ACTIVE_STATUS>;

export const TEKTON_RESOURCE_STATUS = {
  SUCCEEDED: 'succeeded',
  RUNNING: 'running',
  PENDING: 'pending',
  FAILED: 'failed',
  TIMEOUT: 'pipelineruntimeout',
} as const;

export type TektonResourceStatus = ValueOf<typeof TEKTON_RESOURCE_STATUS>;

export const ARGO_APPLICATION_HEALTH_STATUS = {
  HEALTHY: 'healthy',
  PROGRESSING: 'progressing',
  DEGRADED: 'degraded',
  SUSPENDED: 'suspended',
  MISSING: 'missing',
  UNKNOWN: 'unknown',
} as const;

export type ArgoApplicationHealthStatus = ValueOf<typeof ARGO_APPLICATION_HEALTH_STATUS>;

export const ARGO_APPLICATION_SYNC_STATUS = {
  SYNCED: 'synced',
  OUT_OF_SYNC: 'outofsync',
} as const;

export type ArgoApplicationSyncStatus = ValueOf<typeof ARGO_APPLICATION_SYNC_STATUS>;

export const CUSTOM_RESOURCE_STATUS_SORT_ORDER: StatusType = {
  [CUSTOM_RESOURCE_STATUS.CREATED]: 0,
  [CUSTOM_RESOURCE_STATUS.INITIALIZED]: 0,
  [CUSTOM_RESOURCE_STATUS.IN_PROGRESS]: 1,
  [CUSTOM_RESOURCE_STATUS.FAILED]: 2,
};

export const CUSTOM_RESOURCE_ACTIVE_STATUS_SORT_ORDER: StatusType = {
  [CUSTOM_RESOURCE_ACTIVE_STATUS.ACTIVE]: 0,
  [CUSTOM_RESOURCE_ACTIVE_STATUS.INACTIVE]: 1,
};
