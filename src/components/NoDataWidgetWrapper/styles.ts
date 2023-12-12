import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles(() => {
    return {
        wrapper: {
            position: 'relative',
            overflow: 'hidden',
            minWidth: rem(500),
            minHeight: rem(90),
        },
        wrapperWithPadding: {
            padding: `${rem(10)} ${rem(20)}`,
        },
        overlap: {
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: `${rem(10)} ${rem(30)}`,
        },
        noContent: {
            opacity: 0.15,
        },
    };
});
