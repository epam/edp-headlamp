import { makeStyles } from '@material-ui/core';
import { STATUS_COLOR } from '../../../../constants/colors';

export const useStyles = makeStyles(() => ({
    node: {
        padding: '0 !important',
        backgroundColor: 'inherit !important',
        fontFamily: 'inherit !important',

        '&.card-status-succeeded': {
            borderColor: STATUS_COLOR.SUCCESS,
        },
        '&.card-status-pending': {
            borderColor: STATUS_COLOR.IN_PROGRESS,
        },
        '&.card-status-running': {
            borderColor: STATUS_COLOR.IN_PROGRESS,
        },
        '&.card-status-failed': {
            borderColor: STATUS_COLOR.ERROR,
        },
        '&.card-status-unknown': {
            borderColor: STATUS_COLOR.UNKNOWN,
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
