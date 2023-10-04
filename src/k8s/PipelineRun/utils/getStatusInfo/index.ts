import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { STATUSES_COLORS } from '../../../../utils/styling/getCustomResourceStatusIconByStatusName';
import { PIPELINE_RUN_REASON, PIPELINE_RUN_STATUS } from '../../constants';

export const getStatusIcon = (status: string, reason: string): [string, string, boolean?] => {
    switch (status) {
        case PIPELINE_RUN_STATUS.UNKNOWN:
            if (reason === PIPELINE_RUN_REASON.STARTED) {
                return [ICONS.LOADER_CIRCLE, STATUSES_COLORS.IN_PROGRESS, true];
            }

            if (reason === PIPELINE_RUN_REASON.RUNNING) {
                return [ICONS.LOADER_CIRCLE, STATUSES_COLORS.IN_PROGRESS, true];
            }

            if (reason === PIPELINE_RUN_REASON.CANCELLED) {
                return [ICONS.CROSS_CIRCLE, STATUSES_COLORS.SUSPENDED];
            }
            break;
        case PIPELINE_RUN_STATUS.TRUE:
            return [ICONS.CHECK_CIRCLE, STATUSES_COLORS.SUCCESS];
        case PIPELINE_RUN_STATUS.FALSE:
            return [ICONS.CROSS_CIRCLE, STATUSES_COLORS.ERROR];
        default:
            return [ICONS.UNKNOWN, STATUSES_COLORS.UNKNOWN];
    }
};
