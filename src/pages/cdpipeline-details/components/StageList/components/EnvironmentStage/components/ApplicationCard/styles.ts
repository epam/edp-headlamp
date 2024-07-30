import { Chip, Paper, styled } from '@mui/material';

export const StyledCard = styled(Paper)(
  ({ theme }) => `
    padding: ${theme.typography.pxToRem(16)} ${theme.typography.pxToRem(24)};
    box-shadow: 0px 1px 10px 0px #0024461F;
    border-radius: ${theme.typography.pxToRem(4)};
`
);

export const StyledVersionChip = styled(Chip)(
  ({ theme }) => `
    height: ${theme.typography.pxToRem(20)};
    line-height: 1; 
    padding-top: ${theme.typography.pxToRem(2)};
    min-width: ${theme.typography.pxToRem(80)};
    max-width: ${theme.typography.pxToRem(140)}
`
);
