import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Breadcrumbs, Button, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { PageWrapperProps } from './types';

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  breadcrumbs,
  headerSlot,
  breadcrumbsExtraContent,
}) => {
  const theme = useTheme();
  const hasBreadcrumbs = !!breadcrumbs && !!breadcrumbs.length;

  return (
    <Box
      sx={{
        pt: theme.typography.pxToRem(40),
        pb: theme.typography.pxToRem(120),
        px: theme.typography.pxToRem(16),
      }}
    >
      {hasBreadcrumbs ? (
        <Grid container spacing={1} alignItems={'center'} justifyContent={'space-between'}>
          <Grid item>
            <Grid container spacing={2} alignItems={'center'}>
              <Grid item>
                <Breadcrumbs>
                  {breadcrumbs?.map(({ label, url }) => {
                    const key = `breadcrumb-${label}`;

                    return url ? (
                      <Button
                        key={key}
                        size="small"
                        component={Link}
                        routeName={url.pathname}
                        params={url.params}
                        sx={{
                          minWidth: 0,
                          textTransform: 'none',
                          fontSize: theme.typography.pxToRem(14),
                        }}
                      >
                        {label}
                      </Button>
                    ) : (
                      <Typography
                        key={key}
                        color="textPrimary"
                        sx={{
                          marginBottom: theme.typography.pxToRem(1),
                          fontSize: theme.typography.pxToRem(14),
                        }}
                      >
                        {label}
                      </Typography>
                    );
                  })}
                </Breadcrumbs>
              </Grid>
              <Grid item>{breadcrumbsExtraContent}</Grid>
            </Grid>
          </Grid>
          <Grid item>{headerSlot}</Grid>
        </Grid>
      ) : null}
      {children}
    </Box>
  );
};
