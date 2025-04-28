import { Icon } from '@iconify/react';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../components/ButtonWithPermission';
import { ConditionalWrapper } from '../../components/ConditionalWrapper';
import { EmptyList } from '../../components/EmptyList';
import { Table } from '../../components/Table';
import { PIPELINE_TYPE } from '../../constants/pipelineTypes';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { Filter } from '../../providers/Filter/components/Filter';
import { sortKubeObjectByCreationTimestamp } from '../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { DeletionDialog } from './components/DeleteDialog';
import { pipelineRunFilterControlNames } from './constants';
import { useColumns } from './hooks/useColumns';
import { useFilter } from './hooks/useFilter';
import { useSelection } from './hooks/useSelection';
import { PipelineRunFilterAllControlNames, PipelineRunListProps } from './types';

export const PipelineRunList = ({
  tableId,
  tableName,
  pipelineRuns,
  isLoading,
  blockerError,
  errors,
  permissions,
  pipelineRunTypes = [
    PIPELINE_TYPE.ALL,
    PIPELINE_TYPE.REVIEW,
    PIPELINE_TYPE.BUILD,
    PIPELINE_TYPE.DEPLOY,
    PIPELINE_TYPE.CLEAN,
  ],
  filterControls = [
    pipelineRunFilterControlNames.CODEBASES,
    pipelineRunFilterControlNames.STATUS,
    pipelineRunFilterControlNames.PIPELINE_TYPE,
  ],
  tableSettings,
}: PipelineRunListProps) => {
  const sortedPipelineRuns = React.useMemo(() => {
    return pipelineRuns?.sort(sortKubeObjectByCreationTimestamp);
  }, [pipelineRuns]);

  const { selected, setSelected, handleSelectRowClick, handleSelectAllClick } = useSelection();

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const onDelete = React.useCallback(() => {
    setSelected([]);
  }, [setSelected]);

  const columns = useColumns({
    permissions,
    tableSettings,
  });

  const onDeleteClick = React.useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const { controls, filterFunction } = useFilter({
    pipelineRuns,
    pipelineRunTypes,
    filterControls,
  });

  return (
    <>
      <Table
        id={tableId}
        name={tableName}
        blockerError={blockerError}
        errors={errors}
        columns={columns}
        data={sortedPipelineRuns}
        isLoading={isLoading}
        emptyListComponent={<EmptyList missingItemName={'pipeline runs'} />}
        filterFunction={filterFunction}
        selection={{
          selected,
          handleSelectAll: handleSelectAllClick,
          handleSelectRow: handleSelectRowClick,
          isRowSelected: (row) => selected.indexOf(row.metadata.name) !== -1,
          renderSelectionInfo: (selectedCount) => (
            <Box
              sx={{
                visibility: !!selectedCount ? 'visible' : 'hidden',
                pointerEvents: !!selectedCount ? 'auto' : 'none',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ minWidth: (t) => t.typography.pxToRem(150) }}>
                  <Typography variant={'body1'}>{selectedCount} item(s) selected</Typography>
                </Box>
                <ConditionalWrapper
                  condition={permissions?.delete?.PipelineRun.allowed}
                  wrapper={(children) => (
                    <Tooltip title={'Delete selected PipelineRuns'}>
                      <div>{children}</div>
                    </Tooltip>
                  )}
                >
                  <Box sx={{ color: (t) => t.palette.secondary.dark }}>
                    <ButtonWithPermission
                      ButtonProps={{
                        size: 'small',
                        startIcon: <Icon icon={ICONS.BUCKET} />,
                        onClick: onDeleteClick,
                        disabled: !selectedCount,
                        variant: 'outlined',
                        color: 'inherit',
                      }}
                      reason={permissions?.delete?.PipelineRun.reason}
                      disabled={!permissions?.delete?.PipelineRun.allowed}
                    >
                      delete
                    </ButtonWithPermission>
                  </Box>
                </ConditionalWrapper>
              </Stack>
            </Box>
          ),
        }}
        slots={{
          header: <Filter<PipelineRunFilterAllControlNames> controls={controls} />,
        }}
      />
      {deleteDialogOpen && (
        <DeletionDialog
          items={pipelineRuns}
          selected={selected}
          open={deleteDialogOpen}
          handleClose={() => setDeleteDialogOpen(false)}
          onDelete={onDelete}
        />
      )}
    </>
  );
};
