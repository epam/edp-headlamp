import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Link as MuiLink } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import { EDPCDPipelineStageSpecQualityGatesInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { PipelineRunKubeObject } from '../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { SYSTEM_QUICK_LINKS } from '../../../../../k8s/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../../../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
import { LinkCreationService } from '../../../../../services/link-creation';
import { routeEDPComponentDetails } from '../../../../edp-component-details/route';
import { EDPStageDetailsRouteParams } from '../../../types';

export const useColumns = (): TableColumn<{
  qualityGate: EDPCDPipelineStageSpecQualityGatesInterface;
  autotestPipelineRun: PipelineRunKubeObjectInterface;
}>[] => {
  const { namespace } = useParams<EDPStageDetailsRouteParams>();
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery(namespace);

  return React.useMemo(
    () => [
      {
        id: 'status',
        label: 'Status',
        render: ({ autotestPipelineRun }) => {
          const status = PipelineRunKubeObject.parseStatus(autotestPipelineRun);
          const reason = PipelineRunKubeObject.parseStatusReason(autotestPipelineRun);

          const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(status, reason);

          return (
            <StatusIcon
              icon={icon}
              color={color}
              isRotating={isRotating}
              width={25}
              Title={`Status: ${status}. Reason: ${reason}`}
            />
          );
        },
        width: '10%',
      },
      {
        id: 'type',
        label: 'Type',
        render: ({ qualityGate: { qualityGateType } }) => qualityGateType,
        width: '15%',
      },
      {
        id: 'step',
        label: 'Step',
        render: ({ qualityGate: { stepName }, autotestPipelineRun }) => {
          const tektonLink =
            autotestPipelineRun &&
            LinkCreationService.tekton.createPipelineRunLink(
              QuickLinksURLS?.[SYSTEM_QUICK_LINKS.TEKTON],
              autotestPipelineRun?.metadata?.namespace,
              autotestPipelineRun?.metadata?.name
            );

          return tektonLink ? (
            <MuiLink href={tektonLink} target={'_blank'}>
              {stepName}
            </MuiLink>
          ) : (
            stepName
          );
        },
        width: '15%',
      },
      {
        id: 'autotest',
        label: 'Autotest',
        render: ({ qualityGate: { autotestName } }) => {
          return autotestName ? (
            <Link
              routeName={routeEDPComponentDetails.path}
              params={{
                name: autotestName,
                namespace,
              }}
            >
              {autotestName}
            </Link>
          ) : (
            autotestName
          );
        },
        width: '40%',
      },
      {
        id: 'branch',
        label: 'Branch',
        render: ({ qualityGate: { branchName } }) => branchName,
      },
    ],
    [QuickLinksURLS, namespace]
  );
};
