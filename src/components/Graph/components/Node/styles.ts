import makeStyles from '@mui/styles/makeStyles';

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
      transition: 'box-shadow 300ms ease',

      '&:hover': {
        boxShadow: `0 0 0px 2px ${color}`,
      },
    },
  }))();
