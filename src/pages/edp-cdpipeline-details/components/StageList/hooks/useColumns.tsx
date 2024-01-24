import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Chip, Grid, IconButton, Typography } from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EDPComponentLink } from '../../../../../components/EDPComponentLink';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { TRIGGER_TYPES } from '../../../../../constants/triggerTypes';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { EDPCDPipelineStageKubeObject } from '../../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import {
  SYSTEM_EDP_COMPONENTS,
  SYSTEM_EDP_COMPONENTS_LABELS,
} from '../../../../../k8s/EDPComponent/constants';
import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { useResourceActionListContext } from '../../../../../providers/ResourceActionList/hooks';
import { LinkCreationService } from '../../../../../services/link-creation';
import { rem } from '../../../../../utils/styling/rem';
import { routeEDPArgoCDIntegration } from '../../../../edp-configuration/pages/edp-argocd-integration/route';
import { routeEDPComponentDetails } from '../../../../edp-configuration/pages/edp-component-details/route';
import { routeEDPStageDetails } from '../../../../edp-stage-details/route';
import { EDPCDPipelineRouteParams } from '../../../types';

export const useColumns = (
  classes: ClassNameMap<'labelChip' | 'labelChipBlue' | 'labelChipGreen'>
): TableColumn<EDPCDPipelineStageKubeObjectInterface>[] => {
  const { handleOpenResourceActionListMenu } =
    useResourceActionListContext<EDPCDPipelineStageKubeObjectInterface>();
  const { name: CDPipelineName, namespace } = useParams<EDPCDPipelineRouteParams>();
  const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

  return React.useMemo(
    () => [
      {
        id: 'status',
        label: 'Status',
        render: (CDPipeline) => {
          const status = CDPipeline?.status?.status;
          const detailedMessage = CDPipeline?.status?.detailed_message;

          const [icon, color, isRotating] = EDPCDPipelineStageKubeObject.getStatusIcon(status);
          return (
            <StatusIcon
              icon={icon}
              color={color}
              isRotating={isRotating}
              Title={
                <>
                  <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                    {`Status: ${status || 'Unknown'}`}
                  </Typography>
                  {status === CUSTOM_RESOURCE_STATUSES.FAILED && (
                    <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                      {detailedMessage}
                    </Typography>
                  )}
                </>
              }
            />
          );
        },
        width: '10%',
      },
      {
        id: 'stage',
        label: 'Stage',
        render: ({ spec: { name: specName }, metadata: { name: metadataName } }) => {
          return (
            <Link
              routeName={routeEDPStageDetails.path}
              params={{
                CDPipelineName,
                namespace,
                stageName: metadataName,
              }}
            >
              {specName}
            </Link>
          );
        },
        width: '20%',
      },
      {
        id: 'triggerType',
        label: 'Trigger Type',
        render: ({ spec: { triggerType } }) => {
          const isManualTriggerType = triggerType === TRIGGER_TYPES.MANUAL;

          return isManualTriggerType ? (
            <Chip label="manual" className={clsx([classes.labelChip, classes.labelChipBlue])} />
          ) : (
            <Chip label="auto" className={clsx([classes.labelChip, classes.labelChipGreen])} />
          );
        },
        width: '20%',
      },
      {
        id: 'cluster',
        label: 'Cluster',
        render: (stage) => stage?.spec.clusterName,
        width: '25%',
      },
      {
        id: 'links',
        label: 'Links',
        render: (stage) => {
          return (
            <Grid container spacing={1}>
              <Grid item>
                <EDPComponentLink
                  name={{
                    label: SYSTEM_EDP_COMPONENTS_LABELS[SYSTEM_EDP_COMPONENTS.ARGOCD],
                    value: SYSTEM_EDP_COMPONENTS.ARGOCD,
                  }}
                  icon={ICONS.ARGOCD}
                  externalLink={LinkCreationService.argocd.createStageLink(
                    EDPComponentsURLS?.[SYSTEM_EDP_COMPONENTS.ARGOCD],
                    stage.spec.namespace,
                    stage.spec.name
                  )}
                  configurationLink={{
                    routeName: routeEDPArgoCDIntegration.path,
                  }}
                />
              </Grid>
              <Grid item>
                <EDPComponentLink
                  name={{
                    label: SYSTEM_EDP_COMPONENTS_LABELS[SYSTEM_EDP_COMPONENTS.GRAFANA],
                    value: SYSTEM_EDP_COMPONENTS.GRAFANA,
                  }}
                  icon={ICONS.GRAFANA}
                  externalLink={LinkCreationService.grafana.createDashboardLink(
                    EDPComponentsURLS?.[SYSTEM_EDP_COMPONENTS.GRAFANA],
                    stage.spec.namespace
                  )}
                  configurationLink={{
                    routeName: routeEDPComponentDetails.path,
                    routeParams: {
                      name: SYSTEM_EDP_COMPONENTS.GRAFANA,
                      namespace,
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <EDPComponentLink
                  name={{
                    label: SYSTEM_EDP_COMPONENTS_LABELS[SYSTEM_EDP_COMPONENTS.KIBANA],
                    value: SYSTEM_EDP_COMPONENTS.KIBANA,
                  }}
                  icon={ICONS.KIBANA}
                  externalLink={LinkCreationService.kibana.createDashboardLink(
                    EDPComponentsURLS?.[SYSTEM_EDP_COMPONENTS.KIBANA],
                    stage.spec.namespace
                  )}
                  configurationLink={{
                    routeName: routeEDPComponentDetails.path,
                    routeParams: {
                      name: SYSTEM_EDP_COMPONENTS.KIBANA,
                      namespace,
                    },
                  }}
                />
              </Grid>
            </Grid>
          );
        },
        width: '25%',
      },
      {
        id: 'actions',
        label: '',
        render: (stage) => {
          const buttonRef = React.createRef<HTMLButtonElement>();

          return (
            <IconButton
              ref={buttonRef}
              aria-label={'Options'}
              onClick={() => handleOpenResourceActionListMenu(buttonRef.current, stage)}
              size="large"
            >
              <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
            </IconButton>
          );
        },
        textAlign: 'right',
      },
    ],
    [CDPipelineName, EDPComponentsURLS, classes, handleOpenResourceActionListMenu, namespace]
  );
};
