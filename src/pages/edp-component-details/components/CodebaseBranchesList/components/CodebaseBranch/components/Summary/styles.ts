import makeStyles from '@mui/styles/makeStyles';
import { STATUS_COLOR } from '../../../../../../../../constants/colors';

export const useStyles = makeStyles((theme) => ({
  pipelineRunStatus: {
    paddingTop: theme.typography.pxToRem(1),
    display: 'flex',
    justifyContent: 'center',
    width: theme.typography.pxToRem(44),
  },
  labelChip: {
    height: theme.typography.pxToRem(24),
    lineHeight: 1,
    paddingTop: theme.typography.pxToRem(2),
  },
  labelChipBlue: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  labelChipGreen: {
    backgroundColor: STATUS_COLOR.SUCCESS,
    color: '#fff',
  },
}));
