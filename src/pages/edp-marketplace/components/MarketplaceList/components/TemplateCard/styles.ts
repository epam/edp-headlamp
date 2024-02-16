import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../../../utils/styling/rem';

export const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: '100%',
    backgroundColor: theme.palette.action.hover,

    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  cardActions: {
    marginTop: 'auto',
  },
  cardContentHeader: {
    height: '3.2em',
    overflow: 'hidden',
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: rem(16),

    '&:last-child': {
      paddingBottom: rem(16),
    },
  },
  cardContentRow: {
    '&:not(:last-child)': {
      marginBottom: rem(15),
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
    fontSize: '1rem',
    fontWeight: 600,
  },
  templateDescription: {
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  templateIcon: {
    height: rem(40),
    verticalAlign: 'middle',
  },
}));
