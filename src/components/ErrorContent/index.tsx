import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { Box, useTheme } from '@mui/material';
import React from 'react';

export const ErrorContent = ({ error, outlined }: { error: ApiError; outlined?: boolean }) => {
  const theme = useTheme();

  const renderError = React.useCallback(() => {
    switch (error?.status) {
      case 403:
        return 'Forbidden';
      default:
        return 'Not Found';
    }
  }, [error?.status]);

  return (
    <Box
      width="100%"
      sx={
        outlined
          ? {
              p: theme.typography.pxToRem(16),
              borderTop: `1px solid ${theme.palette.action.selected}`,
              borderBottom: `1px solid ${theme.palette.action.selected}`,
            }
          : null
      }
    >
      <EmptyContent>{renderError()}</EmptyContent>
    </Box>
  );
};
