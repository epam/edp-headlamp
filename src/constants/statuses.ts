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

export enum PIPELINE_RUN_STATUSES {
    SUCCEEDED = 'succeeded',
    RUNNING = 'running',
    FAILED = 'failed',
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

export const PIPELINE_RUN_STATUS_SORT_ORDER: StatusType = {
    [PIPELINE_RUN_STATUSES['SUCCEEDED']]: 0,
    [PIPELINE_RUN_STATUSES['RUNNING']]: 1,
    [PIPELINE_RUN_STATUSES['FAILED']]: 2,
};
