import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Table } from '../../components/Table';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { ApplicationKubeObject } from '../../k8s/groups/ArgoCD/Application';
import { APPLICATION_LABEL_SELECTOR_APP_NAME } from '../../k8s/groups/ArgoCD/Application/labels';
import { ApplicationKubeObjectInterface } from '../../k8s/groups/ArgoCD/Application/types';
import { routeComponentDetails } from '../../pages/component-details/route';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { WidgetConfig } from '../dialogs/AddNewWidget/types';
import { useColumns } from './hooks/useColumns';

export const AppVersion = ({
  widgetConfig,
  userWidgets,
  setUserWidgets,
}: {
  widgetConfig: WidgetConfig<{ appName: string }>;
  userWidgets: WidgetConfig[];
  setUserWidgets: (widgets: WidgetConfig[]) => void;
}) => {
  const [_argoApplications, argoApplicationsError] = ApplicationKubeObject.useList({
    labelSelector: `${APPLICATION_LABEL_SELECTOR_APP_NAME}=${widgetConfig.data.appName}`,
  });

  const argoApplications: ApplicationKubeObjectInterface[] = _argoApplications || [];

  const columns = useColumns();

  const handleDeleteWidget = React.useCallback(() => {
    setUserWidgets(userWidgets.filter((el) => el.id !== widgetConfig.id));
  }, [setUserWidgets, userWidgets, widgetConfig.id]);

  const [showActions, setShowActions] = React.useState(false);

  return (
    <Box
      onMouseOver={() => {
        setShowActions(true);
      }}
      onMouseLeave={() => {
        setShowActions(false);
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" color="primary.dark">
            Deployed versions for:{' '}
            <Link
              routeName={routeComponentDetails.path}
              params={{ name: widgetConfig.data.appName, namespace: getDefaultNamespace() }}
            >
              {widgetConfig.data.appName}
            </Link>
          </Typography>
          <Box
            sx={{
              visibility: showActions ? 'visible' : 'hidden',
              opacity: showActions ? 1 : 0,
              transition: 'visibility 0.3s, opacity 0.3s',
            }}
          >
            <Tooltip title="Remove this widget from your dashboard.">
              <IconButton size="small" onClick={handleDeleteWidget}>
                <Icon icon={ICONS.BUCKET} />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
        <Box sx={{ maxHeight: (t) => t.typography.pxToRem(140), overflowY: 'auto' }}>
          <Table
            minimal
            outlined={false}
            id={'appVersion'}
            data={argoApplications}
            isLoading={argoApplications === null && !argoApplicationsError}
            columns={columns}
            settings={{
              show: false,
            }}
            pagination={{
              show: false,
              rowsPerPage: 100,
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};
