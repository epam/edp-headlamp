import { makeStyles } from '@material-ui/core';

export const useStyles = (color: string) =>
    makeStyles(() => ({
        node: {
            padding: '0 10px !important',
            backgroundColor: 'inherit !important',
            fontFamily: 'inherit !important',
            borderLeft: `0.25rem solid ${color} !important`,
            borderRight: `1px solid ${color} !important`,
            borderTop: `1px solid ${color} !important`,
            borderBottom: `1px solid ${color} !important`,
            borderRadius: '4px',

            '& .bx--cc--card-node__column': {
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                padding: '0 0.3rem !important',
            },

            '& .bx--cc--card-node__title': {
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontWeight: 400,
            },
        },
    }))();
