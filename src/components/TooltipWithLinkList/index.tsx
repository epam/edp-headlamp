import { Icon } from '@iconify/react';
import { Box, Link, MenuItem, MenuList, Paper, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';

export const TooltipWithLinkList = ({
  urls,
  size,
}: {
  urls: string[];
  size?: 'medium' | 'small';
}) => {
  const iconSize = size === 'medium' ? 20 : 15;

  return (
    <Tooltip
      title={
        <Paper elevation={8}>
          <MenuList>
            {urls.map((el) => (
              <MenuItem
                key={el}
                component={Link}
                href={el}
                target={'_blank'}
                sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
              >
                {el}
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      }
      PopperProps={{
        sx: {
          '& .MuiTooltip-tooltip': { p: '0 !important' },
        },
        placement: 'top-end',
      }}
    >
      <Box sx={{ lineHeight: 0, mx: (t) => t.typography.pxToRem(32) }}>
        <Stack direction="row" alignItems="center">
          <Icon icon={ICONS.NEW_WINDOW} width={iconSize} height={iconSize} />
          <Icon icon={ICONS.ARROW_DROPDOWN} width={15} height={15} />
        </Stack>
      </Box>
    </Tooltip>
  );
};
