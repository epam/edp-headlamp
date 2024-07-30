import { Chip, Paper, styled } from '@mui/material';

export const StyledCardHeader = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'stageStatusColor',
})<{
  stageStatusColor?: string;
}>(
  ({ theme, stageStatusColor }) => `
  position: relative;
  padding: ${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(24)} ;
  border-left: ${stageStatusColor ? `5px solid ${stageStatusColor}` : undefined};
  border-right: 0;
  width: calc(100% - ${theme.typography.pxToRem(16)});
  filter: drop-shadow(0px 0 5px #0024461F);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    bottom: 0;
    width: ${theme.typography.pxToRem(16)};
    height: 100%;
    background-color: inherit;
    clip-path: polygon(0 0, 0% 100%, 100% 50%);
    margin-left: -1px;
  }
`
);

export const StyledCardWrapper = styled('div')(
  ({ theme }) => `
  padding: ${theme.typography.pxToRem(16)};
  background-color: ${theme.palette.secondary.main};
  border-radius: ${theme.typography.pxToRem(4)};
`
);

export const StyledCardBody = styled('div')(
  ({ theme }) => `
  padding: 0 ${theme.typography.pxToRem(18)};
`
);

export const StyledChip = styled(Chip)(
  ({ theme }) => `
    min-width: 0;
    height: ${theme.typography.pxToRem(20)};
    line-height: 1;
    padding-top: ${theme.typography.pxToRem(2)};
    background-color: ${theme.palette.secondary.main};
  `
);
