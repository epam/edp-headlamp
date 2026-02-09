import { Box, Stack, styled } from '@mui/material';

export const StyledChatHeader = styled(Box)(
  ({ theme }) => `
    flex-shrink: 0;
    padding: ${theme.typography.pxToRem(16)};
    background-color: ${theme.palette.primary.dark};
    color: ${theme.palette.common.white};
`
);

export const StyledChatBody = styled(Stack)(
  ({ theme }) => `
  padding: 0 ${theme.typography.pxToRem(16)};
`
);

export const StyledChatFooter = styled(Box)(
  ({ theme }) => `
    padding: ${theme.typography.pxToRem(16)};
    flex-shrink: 0;
`
);

export const StyledMessageList = styled(Box)(
  ({ theme }) => `
    flex-shrink: 1;
    flex-grow: 1;
    padding: ${theme.typography.pxToRem(32)} ${theme.typography.pxToRem(16)};
    overflow-y: auto;
    overflow-x: hidden;
`
);

export const StyledLoadingDot = styled('div')(({ theme }) => ({
  width: theme.typography.pxToRem(8),
  height: theme.typography.pxToRem(8),
  borderRadius: '50%',
  display: 'inline-block',
  backgroundColor: theme.palette.secondary.dark,

  '&:nth-last-child(1)': {
    marginLeft: theme.typography.pxToRem(5),
    animation: 'loading .6s .3s linear infinite',
  },
  '&:nth-last-child(2)': {
    marginLeft: theme.typography.pxToRem(5),
    animation: 'loading .6s .2s linear infinite',
  },
  '&:nth-last-child(3)': {
    animation: 'loading .6s .1s linear infinite',
  },

  '@keyframes loading': {
    '0%': {
      transform: 'translate(0, 0)',
    },
    '25%': {
      transform: 'translate(0, -3px)',
    },
    '50%': {
      transform: 'translate(0, 0)',
    },
    '75%': {
      transform: 'translate(0, 3px)',
    },
    '100%': {
      transform: 'translate(0, 0)',
    },
  },
}));
