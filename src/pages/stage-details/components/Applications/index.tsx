import { Icon } from '@iconify/react';
import { Button, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ButtonWithPermission } from '../../../../components/ButtonWithPermission';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { Table } from '../../../../components/Table';
import { TableProps } from '../../../../components/Table/types';
import { TabSection } from '../../../../components/TabSection';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useArgoApplicationCRUD } from '../../../../k8s/groups/ArgoCD/Application/hooks/useArgoApplicationCRUD';
import { APPLICATIONS_TABLE_MODE } from '../../constants';
import { useTypedPermissions } from '../../hooks/useTypedPermissions';
import { EnrichedApplicationWithArgoApplication } from '../../types';
import { ApplicationsMultiDeletion } from '../ApplicationsMultiDeletion';
import { useButtonsEnabledMap } from './hooks/useButtonsEnabled';
import { useColumns } from './hooks/useColumns';
import { useConfigurationHandlers } from './hooks/useConfigurationHandlers';
import { useUpperColumns } from './hooks/useUpperColumns';
import { ApplicationsProps, ApplicationsTableMode } from './types';

export const Applications = ({
  enrichedApplicationsWithArgoApplications,
  latestDeployPipelineRunIsRunning,
  latestCleanPipelineRunIsRunning,
}: ApplicationsProps) => {
  const permissions = useTypedPermissions();

  const allArgoApplications = enrichedApplicationsWithArgoApplications?.map(
    ({ argoApplication }) => argoApplication
  );

  const enrichedApplicationsByApplicationName = React.useMemo(() => {
    return (
      enrichedApplicationsWithArgoApplications &&
      enrichedApplicationsWithArgoApplications.reduce((acc, cur) => {
        acc.set(cur.application.metadata.name, cur);
        return acc;
      }, new Map<string, EnrichedApplicationWithArgoApplication>())
    );
  }, [enrichedApplicationsWithArgoApplications]);

  const {
    deleteArgoApplication,
    mutations: { argoApplicationDeleteMutation },
  } = useArgoApplicationCRUD();

  const someArgoApplicationMutationIsLoading = React.useMemo(
    () => argoApplicationDeleteMutation.isLoading,
    [argoApplicationDeleteMutation]
  );

  const [selected, setSelected] = React.useState<string[]>([]);

  const [mode, setMode] = React.useState<ApplicationsTableMode>(APPLICATIONS_TABLE_MODE.PREVIEW);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const toggleMode = () =>
    mode === APPLICATIONS_TABLE_MODE.PREVIEW
      ? setMode(APPLICATIONS_TABLE_MODE.CONFIGURATION)
      : setMode(APPLICATIONS_TABLE_MODE.PREVIEW);
  const {
    watch,
    formState: { dirtyFields },
  } = useFormContext();
  const values = watch();

  const isDirty = Object.keys(dirtyFields).length > 0;

  const {
    handleClickDeploy,
    handleClickClean,
    handleClickLatest,
    handleClickOverrideValuesAll,
    handleClickSelectAll,
    handleClickSelectRow,
    handleClickStable,
    handleClickUninstall,
  } = useConfigurationHandlers({
    selected,
    setSelected,
    enrichedApplicationsByApplicationName,
    enrichedApplicationsWithArgoApplications,
    values,
    setDeleteDialogOpen,
  });

  const buttonsEnabledMap = useButtonsEnabledMap({
    enrichedApplicationsWithArgoApplications,
    enrichedApplicationsByApplicationName,
    latestDeployPipelineRunIsRunning,
    someArgoApplicationMutationIsLoading,
    values,
  });

  const columns = useColumns({
    mode,
  });

  const upperColumns = useUpperColumns({
    selected,
    buttonsEnabledMap,
    handleClickUninstall,
    handleClickLatest,
    handleClickStable,
    handleClickOverrideValuesAll,
    permissions,
    mode,
    values,
  });

  const _TableProps: TableProps<EnrichedApplicationWithArgoApplication> = React.useMemo(() => {
    return {
      data: enrichedApplicationsWithArgoApplications,
      isLoading: enrichedApplicationsWithArgoApplications === null,
      columns,
      upperColumns,
      handleSelectRowClick: mode === APPLICATIONS_TABLE_MODE.PREVIEW ? handleClickSelectRow : null,
      handleSelectAllClick: mode === APPLICATIONS_TABLE_MODE.PREVIEW ? handleClickSelectAll : null,
      selected,
      isSelected: (row) => selected.indexOf(row.application.metadata.name) !== -1,
    };
  }, [
    columns,
    enrichedApplicationsWithArgoApplications,
    handleClickSelectAll,
    handleClickSelectRow,
    mode,
    selected,
    upperColumns,
  ]);

  const timer = React.useRef<number | null>(null);
  const [deployBtnDisabled, setDeployBtnDisabled] = React.useState(false);
  const { reset } = useFormContext();
  const theme = useTheme();

  return (
    <TabSection
      title={
        <Stack spacing={2} alignItems="center" direction="row" justifyContent="space-between">
          <Typography fontSize={28} color="primary.dark">
            Applications
          </Typography>
          {mode === APPLICATIONS_TABLE_MODE.PREVIEW && (
            <Stack spacing={2} alignItems="center" direction="row">
              <ButtonWithPermission
                ButtonProps={{
                  variant: 'outlined',
                  size: 'medium',
                  onClick: handleClickClean,
                  startIcon: latestCleanPipelineRunIsRunning ? (
                    <Icon icon={'line-md:loading-loop'} />
                  ) : (
                    <Icon icon={ICONS.BUCKET} />
                  ),
                  disabled: latestDeployPipelineRunIsRunning || latestCleanPipelineRunIsRunning,
                }}
                disabled={!permissions?.create?.PipelineRun.allowed}
                reason={permissions?.create?.PipelineRun.reason}
              >
                Clean
              </ButtonWithPermission>
              <ButtonWithPermission
                ButtonProps={{
                  variant: 'contained',
                  color: 'primary',
                  size: 'medium',
                  onClick: toggleMode,
                  startIcon:
                    deployBtnDisabled || latestDeployPipelineRunIsRunning ? (
                      <Icon icon={'line-md:loading-loop'} />
                    ) : (
                      <Icon icon={ICONS.PENCIL} />
                    ),
                  disabled:
                    latestDeployPipelineRunIsRunning ||
                    latestCleanPipelineRunIsRunning ||
                    deployBtnDisabled,
                }}
                disabled={!permissions?.create?.PipelineRun.allowed}
                reason={permissions?.create?.PipelineRun.reason}
              >
                {deployBtnDisabled || latestDeployPipelineRunIsRunning
                  ? 'Deploying'
                  : 'Configure deploy'}
              </ButtonWithPermission>
            </Stack>
          )}
          {mode === APPLICATIONS_TABLE_MODE.CONFIGURATION && (
            <Stack spacing={3} alignItems="center" direction="row">
              <Tooltip title={'Reset selected image stream versions'}>
                <Button
                  onClick={() => reset()}
                  disabled={!isDirty}
                  sx={{ color: theme.palette.secondary.dark }}
                >
                  undo changes
                </Button>
              </Tooltip>
              <Button
                onClick={() => {
                  reset();
                  setMode(APPLICATIONS_TABLE_MODE.PREVIEW);
                }}
                variant="outlined"
              >
                cancel
              </Button>
              <ConditionalWrapper
                condition={permissions?.create?.PipelineRun.allowed}
                wrapper={(children) => (
                  <Tooltip
                    title={'Deploy selected applications with selected image stream version'}
                  >
                    {children}
                  </Tooltip>
                )}
              >
                <ButtonWithPermission
                  ButtonProps={{
                    startIcon:
                      deployBtnDisabled || latestDeployPipelineRunIsRunning ? (
                        <Icon icon={'line-md:loading-loop'} />
                      ) : (
                        <Icon icon={ICONS.CHECK} />
                      ),
                    onClick: () => {
                      handleClickDeploy();
                      setMode(APPLICATIONS_TABLE_MODE.PREVIEW);
                      setDeployBtnDisabled(true);

                      timer.current = window.setTimeout(() => {
                        setDeployBtnDisabled(false);
                      }, 10000);
                    },
                    disabled: deployBtnDisabled || !buttonsEnabledMap.deploy,
                    variant: 'contained',
                    color: 'primary',
                  }}
                  disabled={!permissions?.create?.PipelineRun.allowed}
                  reason={permissions?.create?.PipelineRun.reason}
                >
                  Start Deploy
                </ButtonWithPermission>
              </ConditionalWrapper>
            </Stack>
          )}
        </Stack>
      }
    >
      <Table<EnrichedApplicationWithArgoApplication> {..._TableProps} />
      <ApplicationsMultiDeletion
        applications={allArgoApplications}
        selected={selected}
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        onDelete={() => {
          setSelected([]);
          setDeleteDialogOpen(false);
        }}
        deleteArgoApplication={deleteArgoApplication}
      />
    </TabSection>
  );
};
