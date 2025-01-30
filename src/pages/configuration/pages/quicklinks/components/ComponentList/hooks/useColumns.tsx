import { Icon } from '@iconify/react';
import { Link as MuiLink, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useTableSettings } from '../../../../../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSavedColumnData } from '../../../../../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../../../../../components/Table/types';
import { TABLES } from '../../../../../../../constants/tables';
import { ICONS } from '../../../../../../../icons/iconify-icons-mapping';
import { QuickLinkKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/QuickLink/types';
import { HeadlampKubeObject } from '../../../../../../../types/k8s';
import { useTypedPermissions } from '../../../hooks/useTypedPermissions';
import { Actions } from '../../Actions';
import { columnNames } from '../constants';
import { useStyles } from '../styles';

export const useColumns = (): TableColumn<HeadlampKubeObject<QuickLinkKubeObjectInterface>>[] => {
  const classes = useStyles();
  const theme = useTheme();

  const { loadSettings } = useTableSettings(TABLES.QUICKLINK_LIST.id);
  const tableSettings = loadSettings();

  const permissions = useTypedPermissions();

  return React.useMemo(
    () => [
      {
        id: columnNames.ICON,
        label: 'Icon',
        data: {
          render: ({
            data: {
              spec: { icon },
            },
          }) => (
            <span className={classes.serviceItemIcon}>
              <img src={`data:image/svg+xml;base64,${icon}`} alt="" />
            </span>
          ),
        },
        cell: {
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.ICON)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.ICON)?.show ?? true,
          isFixed: true,
        },
      },
      {
        id: columnNames.NAME,
        label: 'Name',
        data: {
          columnSortableValuePath: 'metadata.name',
          render: ({
            data: {
              metadata: { name },
            },
          }) => name,
        },
        cell: {
          baseWidth: 25,
          width: getSavedColumnData(tableSettings, columnNames.NAME)?.width ?? 25,
          show: getSavedColumnData(tableSettings, columnNames.NAME)?.show ?? true,
        },
      },
      {
        id: columnNames.URL,
        label: 'URL',
        data: {
          render: ({
            data: {
              spec: { url },
            },
          }) => {
            const _url = !/^https?:\/\//i.test(url) ? `https://${url}` : url;

            return url ? (
              <MuiLink href={_url} target="_blank" rel="noopener">
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{_url} </span>
                  <Icon icon={ICONS.NEW_WINDOW} color={theme.palette.grey['500']} width="15" />
                </Stack>
              </MuiLink>
            ) : null;
          },
        },
        cell: {
          baseWidth: 60,
          width: getSavedColumnData(tableSettings, columnNames.URL)?.width ?? 60,
          show: getSavedColumnData(tableSettings, columnNames.URL)?.show ?? true,
        },
      },
      {
        id: columnNames.VISIBLE,
        label: 'Visible',
        data: {
          columnSortableValuePath: 'spec.visible',
          render: ({
            data: {
              spec: { visible },
            },
          }) => <Icon icon={visible ? ICONS.ACCEPT_ARROW : ICONS.CROSS} width="20" />,
        },
        cell: {
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.VISIBLE)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.VISIBLE)?.show ?? true,
        },
      },
      {
        id: columnNames.ACTIONS,
        label: 'Actions',
        data: {
          render: ({ data }) => (
            <Actions resource={data?.jsonData ?? data} permissions={permissions} />
          ),
        },
        cell: {
          isFixed: true,
          customizable: false,
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.VISIBLE)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.VISIBLE)?.show ?? true,
        },
      },
    ],
    [classes.serviceItemIcon, permissions, tableSettings, theme.palette.grey]
  );
};
