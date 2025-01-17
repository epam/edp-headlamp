import { Icon } from '@iconify/react';
import { Grid, Link as MuiLink, useTheme } from '@mui/material';
import React from 'react';
import { TableColumn } from '../../../../../../../components/Table/types';
import { ICONS } from '../../../../../../../icons/iconify-icons-mapping';
import { QuickLinkKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/QuickLink/types';
import { HeadlampKubeObject } from '../../../../../../../types/k8s';
import { useTypedPermissions } from '../../../hooks/useTypedPermissions';
import { Actions } from '../../Actions';
import { useStyles } from '../styles';

export const useColumns = (): TableColumn<HeadlampKubeObject<QuickLinkKubeObjectInterface>>[] => {
  const classes = useStyles();
  const theme = useTheme();

  const permissions = useTypedPermissions();

  return React.useMemo(
    () => [
      {
        id: 'icon',
        label: 'Icon',
        render: ({ spec: { icon } }) => (
          <span className={classes.serviceItemIcon}>
            <img src={`data:image/svg+xml;base64,${icon}`} alt="" />
          </span>
        ),
        width: '15%',
      },
      {
        id: 'name',
        label: 'Name',
        columnSortableValuePath: 'metadata.name',
        render: ({ metadata: { name } }) => name,
        width: '40%',
      },
      {
        id: 'componentUrl',
        label: 'URL',
        render: ({ spec: { url } }) => {
          const _url = !/^https?:\/\//i.test(url) ? `https://${url}` : url;

          return url ? (
            <MuiLink href={_url} target="_blank" rel="noopener">
              <Grid container alignItems={'center'} spacing={1}>
                <Grid item>Open in a new tab</Grid>
                <span> </span>
                <Grid item>
                  <Icon icon={ICONS.NEW_WINDOW} color={theme.palette.grey['500']} width="15" />
                </Grid>
              </Grid>
            </MuiLink>
          ) : null;
        },
        width: '40%',
      },
      {
        id: 'visible',
        label: 'Visible',
        columnSortableValuePath: 'spec.visible',
        render: ({ spec: { visible } }) => (
          <Icon icon={visible ? ICONS.ACCEPT_ARROW : ICONS.CROSS} width="20" />
        ),
      },
      {
        id: 'actions',
        label: '',
        render: ({ jsonData }) => <Actions resource={jsonData} permissions={permissions} />,
      },
    ],
    [classes.serviceItemIcon, permissions, theme.palette.grey]
  );
};
