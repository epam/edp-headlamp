import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { IconButton, useTheme } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { routeQuickLinkList } from '../../../../../edp-configuration/pages/edp-quick-link-list/route';
import { useStyles } from './styles';

export const AddNewQuickLinkCard = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <IconButton component={Link} routeName={routeQuickLinkList.path} className={classes.cardRoot}>
      <Icon icon={ICONS.PLUS} color={theme.palette.text.primary} />
    </IconButton>
  );
};
