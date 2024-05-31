import { Icon } from '@iconify/react';
import { Box, Chip, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { QuickLink } from '../../../../../../../../components/QuickLink';
import { StatusIcon } from '../../../../../../../../components/StatusIcon';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../../../../constants/statuses';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { EDPCodebaseBranchKubeObject } from '../../../../../../../../k8s/EDPCodebaseBranch';
import { useGitServerByCodebaseQuery } from '../../../../../../../../k8s/EDPGitServer/hooks/useGitServerByCodebaseQuery';
import { PipelineRunKubeObject } from '../../../../../../../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../../../../../../../k8s/PipelineRun/constants';
import { useCreateBuildPipelineRun } from '../../../../../../../../k8s/PipelineRun/hooks/useCreateBuildPipelineRun';
import { useStorageSizeQuery } from '../../../../../../../../k8s/TriggerTemplate/hooks/useStorageSizeQuery';
import { rem } from '../../../../../../../../utils/styling/rem';
import { CodebaseBranchActionsMenu } from '../../../../../../../../widgets/CodebaseBranchActions';
import { usePermissionsContext } from '../../../../../../providers/Permissions/hooks';
import { isDefaultBranch } from '../../../../utils';
import { useStyles } from './styles';
import { SummaryProps } from './types';

export const Summary = ({
  codebaseData,
  codebaseBranchData,
  pipelineRuns,
  defaultBranch,
}: SummaryProps) => {
  const { pipelineRun: pipelineRunPermissions, codebaseBranch: codebaseBranchPermissions } =
    usePermissionsContext();
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
    <Stack
      spacing={2}
      alignItems="center"
      direction="row"
      width={'100%'}
      justifyContent="space-between"
    >
      <Stack spacing={2} alignItems="center" direction="row">
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
        <Stack spacing={1} alignItems="center" direction="row">
          <Typography fontSize={12}>Build status</Typography>
          <StatusIcon
            icon={lastPipelineRunIcon}
            color={lastPipelineRunColor}
            isRotating={lastPipelineRunIsRotating}
            width={20}
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
        </Stack>
        <Stack spacing={1} alignItems="center" direction="row">
          <Typography fontSize={12}>Build:</Typography>
          <Chip label={codebaseBranchData?.status?.build || 'NaN'} />
        </Stack>
        <Stack spacing={1} alignItems="center" direction="row">
          <Typography fontSize={12}>Successful build:</Typography>
          <Chip label={codebaseBranchData?.status?.lastSuccessfulBuild || 'NaN'} />
        </Stack>
        <Stack spacing={1} alignItems="center" direction="row">
          <Typography fontSize={12}>Version:</Typography>
          <Chip label={codebaseBranchData?.spec?.version || 'NaN'} />
        </Stack>
      </Stack>

      <Box sx={{ pr: rem(16) }}>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <QuickLink
              enabledText="Open in GIT"
              name={{ label: 'GIT' }}
              icon={ICONS.NEW_WINDOW}
              externalLink={codebaseData?.status?.gitWebUrl}
              variant="text"
              isTextButton
            />
          </Grid>
          <Grid item>
            <Tooltip title={'Trigger build pipeline run'}>
              <IconButton
                onClick={onBuildButtonClick}
                disabled={
                  pipelineRunPermissions.create === false ||
                  PipelineRunKubeObject.parseStatusReason(pipelineRuns.latestBuildPipelineRun) ===
                    PIPELINE_RUN_REASON.RUNNING ||
                  codebaseBranchData?.status?.status !== CUSTOM_RESOURCE_STATUSES.CREATED
                }
                size="medium"
              >
                <Icon icon={ICONS.PLAY} />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item>
            <CodebaseBranchActionsMenu
              variant="inline"
              data={{
                branch: codebaseBranchData,
                defaultBranch,
                codebaseData,
              }}
              permissions={codebaseBranchPermissions}
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};
