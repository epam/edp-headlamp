import { Chip, Paper, styled } from '@mui/material';
import { TRIGGER_TYPES } from '../../constants/triggerTypes';

export const StyledCardHeader = styled(Paper, {
  shouldForwardProp: prop => prop !== 'stageStatusColor',
})<{
  stageStatusColor?: string;
}>(
  ({ theme, stageStatusColor }) => `
  padding: ${theme.typography.pxToRem(10)};
  border-left: ${stageStatusColor ? `5px solid ${stageStatusColor}` : undefined};
  border-right: 0;
`
);

export const StyledCardBody = styled(Paper)(
  ({ theme }) => `
  padding: ${theme.typography.pxToRem(40)};
  background-color: ${theme.palette.squareButton.background};
`
);

export const StyledChip = styled(Chip)(
  ({ theme, label }) => `
    height: ${theme.typography.pxToRem(20)};
    line-height: 1;
    padding-top: ${theme.typography.pxToRem(2)};
    background-color: ${
      label === TRIGGER_TYPES.MANUAL ? '#cbe1f9' : TRIGGER_TYPES.AUTO ? '#c3e6cd' : 'inherit'
    };
    color: ${
      label === TRIGGER_TYPES.MANUAL ? '#1261af' : TRIGGER_TYPES.AUTO ? '#2f6f45' : 'inherit'
    };
  `
);
