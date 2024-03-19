import { Box, styled } from '@mui/material';

export const StyledTileChartWrapper = styled(Box)`
  padding: ${({ theme }) => theme.typography.pxToRem(24)};
  box-shadow: 0px 1px 10px 0px #0024461f;
  border-left: 4px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 4px;
  overflow: hidden;

  & .recharts-sector {
    stroke: none;
  }

  & .recharts-wrapper {
    width: 100% !important;
    height: 100% !important;
    line-height: 0;
  }

  & .recharts-surface {
    width: 100%;
    height: 100%;
  }
`;
