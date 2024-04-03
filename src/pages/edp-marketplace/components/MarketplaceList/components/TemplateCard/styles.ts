import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: '100%',
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    borderRadius: theme.typography.pxToRem(4),
    backgroundColor: theme.palette.common.white,
    padding: theme.typography.pxToRem(24),
    boxShadow: '0px 1px 10px 0px #0024461F',

    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  chipWithRoundedAvatar: {
    '& .MuiChip-avatar': {
      borderRadius: '50%',
    },
  },
  templateName: {
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '1theme.typography.pxToRem',
    fontWeight: 600,
  },
  templateDescription: {
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  templateIcon: {
    height: theme.typography.pxToRem(24),
    verticalAlign: 'middle',
  },
}));
