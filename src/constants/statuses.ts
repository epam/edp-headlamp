interface StatusType {
    [key: string]: number;
}

export enum CUSTOM_RESOURCE_STATUSES {
    // K8s Custom Resources statuses

    CREATED = 'created',
    INITIALIZED = 'initialized',
    IN_PROGRESS = 'in-progress',
    FAILED = 'failed',

    // User custom statuses
    UNKNOWN = 'unknown',
}

export enum CUSTOM_RESOURCE_ACTIVE_STATUSES {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export enum TEKTON_RESOURCE_STATUSES {
    SUCCEEDED = 'succeeded',
    RUNNING = 'running',
    PENDING = 'pending',
    FAILED = 'failed',
    TIMEOUT = 'pipelineruntimeout',
}

export enum ARGO_APPLICATION_HEALTH_STATUSES {
    HEALTHY = 'healthy',
    PROGRESSING = 'progressing',
    DEGRADED = 'degraded',
    SUSPENDED = 'suspended',
    MISSING = 'missing',
    UNKNOWN = 'unknown',
}

export enum ARGO_APPLICATION_SYNC_STATUSES {
    SYNCED = 'synced',
    OUT_OF_SYNC = 'outofsync',
}

export const CUSTOM_RESOURCE_STATUS_SORT_ORDER: StatusType = {
    [CUSTOM_RESOURCE_STATUSES['CREATED']]: 0,
    [CUSTOM_RESOURCE_STATUSES['INITIALIZED']]: 0,
    [CUSTOM_RESOURCE_STATUSES['IN_PROGRESS']]: 1,
    [CUSTOM_RESOURCE_STATUSES['FAILED']]: 2,
    [CUSTOM_RESOURCE_STATUSES['UNKNOWN']]: 3,
};

export const CUSTOM_RESOURCE_ACTIVE_STATUS_SORT_ORDER: StatusType = {
    [CUSTOM_RESOURCE_ACTIVE_STATUSES['ACTIVE']]: 0,
    [CUSTOM_RESOURCE_ACTIVE_STATUSES['INACTIVE']]: 1,
};
