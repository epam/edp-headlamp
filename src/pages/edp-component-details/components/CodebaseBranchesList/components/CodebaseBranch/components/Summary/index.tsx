import { Icon } from '@iconify/react';
import { Chip, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EDPComponentLink } from '../../../../../../../../components/EDPComponentLink';
import { StatusIcon } from '../../../../../../../../components/StatusIcon';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../../../../constants/statuses';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { EDPCodebaseBranchKubeObject } from '../../../../../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../../../../k8s/EDPCodebaseBranch/types';
import {
  SYSTEM_EDP_COMPONENTS,
  SYSTEM_EDP_COMPONENTS_LABELS,
} from '../../../../../../../../k8s/EDPComponent/constants';
import { useEDPComponentsURLsQuery } from '../../../../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { useGitServerByCodebaseQuery } from '../../../../../../../../k8s/EDPGitServer/hooks/useGitServerByCodebaseQuery';
import { PipelineRunKubeObject } from '../../../../../../../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../../../../../../../k8s/PipelineRun/constants';
import { useCreateBuildPipelineRun } from '../../../../../../../../k8s/PipelineRun/hooks/useCreateBuildPipelineRun';
import { useStorageSizeQuery } from '../../../../../../../../k8s/TriggerTemplate/hooks/useStorageSizeQuery';
import { useResourceActionListContext } from '../../../../../../../../providers/ResourceActionList/hooks';
import { LinkCreationService } from '../../../../../../../../services/link-creation';
import { rem } from '../../../../../../../../utils/styling/rem';
import { routeEDPSonarIntegration } from '../../../../../../../edp-configuration/pages/edp-sonar-integration/route';
import { EDPComponentDetailsRouteParams } from '../../../../../../types';
import { isDefaultBranch } from '../../../../utils';
import { useStyles } from './styles';
import { SummaryProps } from './types';

export const Summary = ({ codebaseData, codebaseBranchData, pipelineRuns }: SummaryProps) => {
  const { namespace } = useParams<EDPComponentDetailsRouteParams>();
  const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

  const buttonRef = React.createRef<HTMLButtonElement>();

  const { handleOpenResourceActionListMenu } =
    useResourceActionListContext<EDPCodebaseBranchKubeObjectInterface>();
  const { createBuildPipelineRun } = useCreateBuildPipelineRun({});
  const { data: storageSize } = useStorageSizeQuery(codebaseData);
  const { data: gitServerByCodebase } = useGitServerByCodebaseQuery({
    props: { codebaseGitServer: codebaseData?.spec.gitServer },
  });

  const classes = useStyles();
  const status = codebaseBranchData?.status?.status;
  const detailedMessage = codebaseBranchData?.status?.detailedMessage;

  const [codebaseBranchIcon, codebaseBranchColor, codebaseBranchIsRotating] =
    EDPCodebaseBranchKubeObject.getStatusIcon(status);

  const [lastPipelineRunIcon, lastPipelineRunColor, lastPipelineRunIsRotating] =
    PipelineRunKubeObject.getStatusIcon(
      PipelineRunKubeObject.parseStatus(pipelineRuns.latestBuildPipelineRun),
      PipelineRunKubeObject.parseStatusReason(pipelineRuns.latestBuildPipelineRun)
    );

  const onBuildButtonClick = React.useCallback(
    async (e) => {
      e.stopPropagation();

      if (!storageSize) {
        throw new Error(`Trigger template's storage property has not been found`);
      }

      if (!gitServerByCodebase) {
        throw new Error(`Codebase Git Server has not been found`);
      }

      await createBuildPipelineRun({
        namespace: codebaseData.metadata.namespace,
        codebaseBranchData: {
          codebaseBranchName: codebaseBranchData?.spec.branchName,
          codebaseBranchMetadataName: codebaseBranchData?.metadata.name,
        },
        codebaseData: {
          codebaseName: codebaseData.metadata.name,
          codebaseBuildTool: codebaseData.spec.buildTool,
          codebaseVersioningType: codebaseData.spec.versioning.type,
          codebaseType: codebaseData.spec.type,
          codebaseFramework: codebaseData.spec.framework,
          codebaseGitUrlPath: codebaseData.spec.gitUrlPath,
        },
        gitServerData: {
          gitUser: gitServerByCodebase.spec.gitUser,
          gitHost: gitServerByCodebase.spec.gitHost,
          gitProvider: gitServerByCodebase.spec.gitProvider,
          sshPort: gitServerByCodebase.spec.sshPort,
          nameSshKeySecret: gitServerByCodebase.spec.nameSshKeySecret,
        },
        storageSize: storageSize,
      });
    },
    [codebaseBranchData, codebaseData, createBuildPipelineRun, gitServerByCodebase, storageSize]
  );

  return (
    <div className={classes.branchHeader}>
      <StatusIcon
        icon={codebaseBranchIcon}
        color={codebaseBranchColor}
        isRotating={codebaseBranchIsRotating}
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
      <Typography variant={'h6'} style={{ lineHeight: 1, marginTop: rem(2) }}>
        {codebaseBranchData.spec.branchName}
      </Typography>
      {isDefaultBranch(codebaseData, codebaseBranchData) && (
        <Chip label="default" className={clsx([classes.labelChip, classes.labelChipBlue])} />
      )}
      {codebaseBranchData.spec.release && (
        <Chip label="release" className={clsx([classes.labelChip, classes.labelChipGreen])} />
      )}
      <div style={{ marginLeft: 'auto' }}>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <div className={classes.pipelineRunStatus}>
              <StatusIcon
                icon={lastPipelineRunIcon}
                color={lastPipelineRunColor}
                isRotating={lastPipelineRunIsRotating}
                width={18}
                Title={
                  <>
                    <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                      {`Last Build PipelineRun status: ${PipelineRunKubeObject.parseStatus(
                        pipelineRuns.latestBuildPipelineRun
                      )}. Reason: ${PipelineRunKubeObject.parseStatusReason(
                        pipelineRuns.latestBuildPipelineRun
                      )}`}
                    </Typography>
                  </>
                }
              />
            </div>
          </Grid>
          <Grid item>
            <EDPComponentLink
              name={{
                label: SYSTEM_EDP_COMPONENTS_LABELS[SYSTEM_EDP_COMPONENTS.SONAR],
                value: SYSTEM_EDP_COMPONENTS.SONAR,
              }}
              enabledText="Open the Quality Gates"
              icon={ICONS.SONAR}
              externalLink={LinkCreationService.sonar.createDashboardLink(
                EDPComponentsURLS?.[SYSTEM_EDP_COMPONENTS.SONAR],
                codebaseData.metadata.name,
                codebaseBranchData.spec.branchName
              )}
              configurationLink={{
                routeName: routeEDPSonarIntegration.path,
              }}
            />
          </Grid>
          <Grid item>
            <EDPComponentLink
              enabledText="Open the Source Code"
              name={{ label: 'the Source Code' }}
              icon={ICONS.GIT_BRANCH}
              externalLink={codebaseData?.status?.gitWebUrl}
            />
          </Grid>
          <Grid item>
            <Tooltip title={'Trigger build pipeline run'}>
              <IconButton
                onClick={onBuildButtonClick}
                disabled={
                  PipelineRunKubeObject.parseStatusReason(pipelineRuns.latestBuildPipelineRun) ===
                    PIPELINE_RUN_REASON.RUNNING ||
                  codebaseBranchData?.status?.status !== CUSTOM_RESOURCE_STATUSES.CREATED
                }
                size="large"
              >
                <Icon icon={ICONS.PLAY} />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title={'Actions'}>
              <IconButton
                aria-label={'Actions'}
                ref={buttonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenResourceActionListMenu(buttonRef.current, codebaseBranchData);
                }}
                size="large"
              >
                <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
