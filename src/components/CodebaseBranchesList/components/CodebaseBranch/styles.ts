import { MuiCore } from '../../../../plugin.globals';
import { rem } from '../../../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    branchHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(20),
        lineHeight: 0,
        width: '100%',
    },
    pipelineRunStatus: {
        paddingTop: rem(1),
        display: 'flex',
        justifyContent: 'center',
        width: rem(44),
    },
}));
