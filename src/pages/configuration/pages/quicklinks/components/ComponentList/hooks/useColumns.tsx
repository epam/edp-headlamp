import { Icon } from '@iconify/react';
import { Link as MuiLink, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useTableSettings } from '../../../../../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSyncedColumnData } from '../../../../../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../../../../../components/Table/types';
import { TABLE } from '../../../../../../../constants/tables';
import { ICONS } from '../../../../../../../icons/iconify-icons-mapping';
import { QuickLinkKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/QuickLink/types';
import { sanitizeSvgBase64 } from '../../../../../../../utils/sanitizeSvg';
import { useTypedPermissions } from '../../../hooks/useTypedPermissions';
import { Actions } from '../../Actions';
import { columnNames } from '../constants';
import { useStyles } from '../styles';

export const useColumns = (): TableColumn<QuickLinkKubeObjectInterface>[] => {
  const classes = useStyles();
  const theme = useTheme();

  const { loadSettings } = useTableSettings(TABLE.QUICKLINK_LIST.id);
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
          }) => {
            const sanitizedIcon = sanitizeSvgBase64(icon);
            return (
              <span className={classes.serviceItemIcon}>
                <img src={`data:image/svg+xml;base64,${sanitizedIcon}`} alt="" />
              </span>
            );
          },
        },
        cell: {
          isFixed: true,
          ...getSyncedColumnData(tableSettings, columnNames.ICON, 5),
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
          ...getSyncedColumnData(tableSettings, columnNames.NAME, 25),
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
          ...getSyncedColumnData(tableSettings, columnNames.URL, 60),
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
          ...getSyncedColumnData(tableSettings, columnNames.VISIBLE, 5),
        },
      },
      {
        id: columnNames.ACTIONS,
        label: 'Actions',
        data: {
          render: ({ data }) => (
            //@ts-ignore
            <Actions resource={data?.jsonData ?? data} permissions={permissions} />
          ),
        },
        cell: {
          isFixed: true,
          customizable: false,
          ...getSyncedColumnData(tableSettings, columnNames.ACTIONS, 5),
        },
      },
    ],
    [classes.serviceItemIcon, permissions, tableSettings, theme.palette.grey]
  );
};
