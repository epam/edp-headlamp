import { Box, styled } from '@mui/material';
import { CHAT_ENTITY } from '../../constants';

export const StyledMessageWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'entityRole',
})<{
  entityRole?: string;
}>(
  () => `
        width: 100%;
        display: flex;
      `
);

export const StyledMessage = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'entityRole',
})<{
  entityRole?: string;
}>(
  ({ theme, entityRole }) => `
      min-width: 0;
      background-color: ${
        entityRole === CHAT_ENTITY.USER ? theme.palette.primary.main : theme.palette.action.hover
      };
      color: ${
        entityRole === CHAT_ENTITY.USER ? theme.palette.common.white : theme.palette.common.black
      };
      display: inline-flex;
      flex-direction: column;
      margin-left: ${entityRole === CHAT_ENTITY.USER ? 'auto' : 'initial'};
      margin-right: ${entityRole === CHAT_ENTITY.ASSISTANT ? 'auto' : 'initial'};
      padding: ${theme.typography.pxToRem(8)} ${theme.typography.pxToRem(16)};
      border-radius: ${theme.typography.pxToRem(theme.shape.borderRadius)};

      & p:only-child {
        margin: 0;
      }
    `
);
