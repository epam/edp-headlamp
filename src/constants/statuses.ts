export enum CUSTOM_RESOURCE_STATUSES {
    // K8s Custom Resources statuses

    CREATED = 'created',
    INITIALIZED = 'initialized',
    IN_PROGRESS = 'in-progress',
    FAILED = 'failed',

    // User custom statuses
    UNKNOWN = 'unknown',
}

interface StatusType {
    [key: string]: number;
}
export const CUSTOM_RESOURCE_STATUS_SORT_ORDER: StatusType = {
    [CUSTOM_RESOURCE_STATUSES['CREATED']]: 0,
    [CUSTOM_RESOURCE_STATUSES['INITIALIZED']]: 0,
    [CUSTOM_RESOURCE_STATUSES['IN_PROGRESS']]: 1,
    [CUSTOM_RESOURCE_STATUSES['FAILED']]: 2,
    [CUSTOM_RESOURCE_STATUSES['UNKNOWN']]: 3,
};
