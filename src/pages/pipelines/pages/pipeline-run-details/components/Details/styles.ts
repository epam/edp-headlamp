import { Box, styled } from '@mui/material';

export const StyledDetailsHeader = styled(Box)(({ theme }) => ({
  padding: theme.typography.pxToRem(24),
}));

export const StyledDetailsBody = styled(Box)(({ theme }) => ({
  padding: `0 ${theme.typography.pxToRem(24)} ${theme.typography.pxToRem(24)}`,
}));
