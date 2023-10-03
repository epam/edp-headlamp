import { SelectOption } from '../../types/forms';

export const PIPELINE_RUN_REASON = {
    STARTED: 'Started',
    RUNNING: 'Running',
    CANCELLED: 'Cancelled',
    SUCCEEDED: 'Succeeded',
    COMPLETED: 'Completed',
    FAILED: 'Failed',
    PIPELINE_RUN_TIMEOUT: 'PipelineRunTimeout',
    CREATE_RUN_FAILED: 'CreateRunFailed',
} as const;

export const PIPELINE_RUN_STATUS = {
    TRUE: 'True',
    FALSE: 'False',
    UNKNOWN: 'Unknown',
} as const;

export const PIPELINE_RUN_STATUS_SELECT_OPTIONS: SelectOption[] = [
    {
        label: 'Success',
        value: PIPELINE_RUN_STATUS.TRUE,
    },
    {
        label: 'Failure',
        value: PIPELINE_RUN_STATUS.FALSE,
    },
    {
        label: PIPELINE_RUN_STATUS.UNKNOWN,
        value: PIPELINE_RUN_STATUS.UNKNOWN,
    },
];
