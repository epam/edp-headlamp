import { Icon } from '@iconify/react';
import { Card, IconButton, Link as MuiLink, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { QuickLinkKubeObjectInterface } from '../../../../../../k8s/QuickLink/types';
import { useResourceActionListContext } from '../../../../../../providers/ResourceActionList/hooks';
import { useStyles } from './styles';
import { ComponentCardProps } from './types';

export const ComponentCard = ({ component }: ComponentCardProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const {
    spec: { url, icon },
    metadata: { name },
  } = component;

  const _url = !/^https?:\/\//i.test(url) ? `https://${url}` : url;
  const buttonRef = React.createRef<HTMLButtonElement>();
  const { handleOpenResourceActionListMenu } =
    useResourceActionListContext<QuickLinkKubeObjectInterface>();

  return (
    <Card className={classes.cardRoot}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <MuiLink href={_url} target="_blank" rel="noopener" style={{ minWidth: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <span className={classes.serviceItemIcon}>
              <img src={`data:image/svg+xml;base64,${icon}`} alt="" />
            </span>
            <Typography
              fontSize="14px"
              fontWeight={500}
              color="primary"
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {name}
            </Typography>
          </Stack>
        </MuiLink>
        <IconButton
          ref={buttonRef}
          aria-label={'Options'}
          onClick={() => handleOpenResourceActionListMenu(buttonRef.current, component)}
          size="medium"
        >
          <Icon icon={ICONS.THREE_DOTS} color={theme.palette.secondary.dark} width="20" />
        </IconButton>
      </Stack>
    </Card>
  );
};
