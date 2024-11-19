import { PercentageCircle } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, IconButton, Popover, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ResourceQuotaKubeObject } from '../../k8s/groups/default/ResourceQuota';
import { RESOURCE_QUOTA_LABEL_TENANT } from '../../k8s/groups/default/ResourceQuota/labels';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { CircleProgress } from './components/CircleProgress';
import { getColorByLoadPercentage, parseResourceQuota } from './utils';

export const ResourceQuotas = () => {
  const [items] = ResourceQuotaKubeObject.useList({
    labelSelector: `${RESOURCE_QUOTA_LABEL_TENANT}=${getDefaultNamespace()}`,
  });

  const { quotas, highestUsedQuota } = React.useMemo(() => {
    if (items === null || items?.length === 0) {
      return { quotas: null, highestUsedQuota: null };
    }

    const concatAnnotations = items.reduce((acc, item) => {
      return { ...acc, ...item.metadata.annotations };
    }, {});

    return parseResourceQuota(concatAnnotations);
  }, [items]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (quotas === null) {
    return null;
  }

  const highestUsedQuotaColor = getColorByLoadPercentage(theme, highestUsedQuota.usedPercentage);

  return (
    <>
      <Tooltip title="Resource Quotas">
        <IconButton onClick={handleClick} size="large">
          <CircleProgress
            loadPercentage={highestUsedQuota.usedPercentage}
            color={highestUsedQuotaColor}
          />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        keepMounted
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ py: theme.typography.pxToRem(20), px: theme.typography.pxToRem(30) }}>
          <Stack direction="row" spacing={5}>
            {Object.entries(quotas).map(([entity, details]) => {
              const { hard, used } = details;
              const loadPercentage = Math.floor((used / hard) * 100);
              const color = getColorByLoadPercentage(theme, loadPercentage);

              return (
                <Box sx={{ flex: '1 1 0', minWidth: theme.typography.pxToRem(100) }}>
                  <Stack alignItems="center" spacing={1}>
                    <Typography color="primary.dark" variant="subtitle2">
                      {entity}
                    </Typography>
                    <Box sx={{ width: '40px', height: '40px' }}>
                      <PercentageCircle
                        data={[
                          {
                            name: 'OK',
                            value: loadPercentage,
                            fill: color,
                          },
                        ]}
                        total={100}
                        size={50}
                        thickness={6}
                      />
                    </Box>
                    <Typography color="primary.dark" variant="caption">
                      {details?.['used_initial']} / {details?.['hard_initial']}
                    </Typography>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Popover>
    </>
  );
};
