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
    labelChip: {
        height: rem(20),
        lineHeight: 1,
        paddingTop: rem(2),
    },
    labelChipBlue: {
        backgroundColor: '#cbe1f9',
        color: '#1261af',
    },
    labelChipGreen: {
        backgroundColor: '#c3e6cd',
        color: '#2f6f45',
    },
}));
