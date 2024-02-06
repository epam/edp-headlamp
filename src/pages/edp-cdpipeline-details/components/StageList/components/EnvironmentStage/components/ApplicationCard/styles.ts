import { Chip, Paper, styled } from '@mui/material';

export const StyledCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'argoAppHealthStatusColor',
})<{
  argoAppHealthStatusColor?: string;
}>(
  ({ theme, argoAppHealthStatusColor }) => `
    padding: ${theme.typography.pxToRem(20)};
    border-left: 5px solid ${argoAppHealthStatusColor};
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
