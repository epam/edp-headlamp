export const APPLICATION_HEALTH_STATUS = {
    HEALTHY: 'healthy',
    PROGRESSING: 'progressing',
    DEGRADED: 'degraded',
    SUSPENDED: 'suspended',
    MISSING: 'missing',
    UNKNOWN: 'unknown',
} as const;

export const APPLICATION_SYNC_STATUS = {
    SYNCED: 'synced',
    OUT_OF_SYNC: 'outofsync',
} as const;
