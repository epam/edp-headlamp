import { Icon } from '@iconify/react';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../../../../components/ButtonWithPermission';
import { ConditionalWrapper } from '../../../../../../components/ConditionalWrapper';
import { Table } from '../../../../../../components/Table';
import { TABLE } from '../../../../../../constants/tables';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useTypedPermissions } from '../../../../hooks/useTypedPermissions';
import { EnrichedApplicationWithArgoApplication } from '../../../../types';
import { ApplicationsMultiDeletion } from '../../../ApplicationsMultiDeletion';
import { useSelection } from '../../hooks/useSelection';

export const PreviewTable = ({
  data,
  columns,
  allArgoApplications,
  deleteDialogOpen,
  setDeleteDialogOpen,
  deleteArgoApplication,
  deployBtnDisabled,
  latestDeployPipelineRunIsRunning,
  latestCleanPipelineRunIsRunning,
  toggleMode,
  handleClickClean,
  buttonsEnabledMap,
}) => {
  const permissions = useTypedPermissions();

  const { selected, setSelected, handleClickSelectAll, handleClickSelectRow } = useSelection();

  return (
    <>
      <Stack spacing={2} alignItems="center" direction="row" justifyContent="flex-end">
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
          {deployBtnDisabled || latestDeployPipelineRunIsRunning ? 'Deploying' : 'Configure deploy'}
        </ButtonWithPermission>
      </Stack>
      <Table<EnrichedApplicationWithArgoApplication>
        id={TABLE.STAGE_APPLICATION_LIST_PREVIEW.id}
        name={TABLE.STAGE_APPLICATION_LIST_PREVIEW.name}
        data={data}
        columns={columns}
        selection={{
          selected,
          isRowSelected: (row) => selected.indexOf(row.application.metadata.name) !== -1,
          handleSelectAll: handleClickSelectAll,
          handleSelectRow: handleClickSelectRow,
          renderSelectionInfo: (selectionLength) => (
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box
                sx={{
                  visibility: !!selectionLength ? 'visible' : 'hidden',
                  pointerEvents: !!selectionLength ? 'auto' : 'none',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ minWidth: (t) => t.typography.pxToRem(150) }}>
                    <Typography variant="body1">{selectionLength} item(s) selected</Typography>
                  </Box>
                  <ConditionalWrapper
                    condition={permissions?.delete?.Application.allowed}
                    wrapper={(children) => (
                      <Tooltip title="Uninstall selected applications">
                        <div>{children}</div>
                      </Tooltip>
                    )}
                  >
                    <Box sx={{ color: (t) => t.palette.secondary.dark }}>
                      <ButtonWithPermission
                        ButtonProps={{
                          size: 'small',
                          variant: 'outlined',
                          color: 'inherit',
                          startIcon: <Icon icon={ICONS.BUCKET} />,
                          onClick: () => setDeleteDialogOpen(true),
                          disabled: !selectionLength || !buttonsEnabledMap.uninstall,
                        }}
                        disabled={!permissions?.delete?.Application.allowed}
                        reason={permissions?.delete?.Application.reason}
                      >
                        delete
                      </ButtonWithPermission>
                    </Box>
                  </ConditionalWrapper>
                </Stack>
              </Box>
            </Stack>
          ),
        }}
        isLoading={data === null}
        settings={{
          show: false,
        }}
      />
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
    </>
  );
};
