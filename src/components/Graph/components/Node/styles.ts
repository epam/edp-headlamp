import { makeStyles } from '@material-ui/core';

export const useStyles = (color: string) =>
    makeStyles(() => ({
        node: {
            padding: '0 !important',
            backgroundColor: 'inherit !important',
            fontFamily: 'inherit !important',
            borderLeft: `0.25rem solid ${color} !important`,

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
