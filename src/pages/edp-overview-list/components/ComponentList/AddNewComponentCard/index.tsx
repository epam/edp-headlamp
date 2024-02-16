import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { IconButton } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { routeEDPComponentList } from '../../../../edp-configuration/pages/edp-component-list/route';
import { useStyles } from './styles';

export const AddNewComponentCard = () => {
  const classes = useStyles();

  return (
    <IconButton
      component={Link}
      routeName={routeEDPComponentList.path}
      className={classes.cardRoot}
    >
      <Icon icon={ICONS.PLUS} />
    </IconButton>
  );
};
