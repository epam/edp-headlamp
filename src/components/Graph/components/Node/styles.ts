import { MuiCore } from '../../../../plugin.globals';
import { STATUSES_COLORS } from '../../../../utils/styling/getCustomResourceStatusIconByStatusName';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    node: {
        padding: '0 !important',
        backgroundColor: 'inherit !important',
        fontFamily: 'inherit !important',

        '&.card-status-succeeded': {
            borderColor: STATUSES_COLORS.SUCCESS,
        },
        '&.card-status-pending': {
            borderColor: STATUSES_COLORS.IN_PROGRESS,
        },
        '&.card-status-running': {
            borderColor: STATUSES_COLORS.IN_PROGRESS,
        },
        '&.card-status-failed': {
            borderColor: STATUSES_COLORS.ERROR,
        },
        '&.card-status-unknown': {
            borderColor: STATUSES_COLORS.UNKNOWN,
        },

        '& .bx--cc--card-node__column': {
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
        },

        '& .bx--cc--card-node__title': {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontWeight: 400,
        },
    },
}));
