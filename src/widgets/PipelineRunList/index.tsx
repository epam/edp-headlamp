import React from 'react';
import { EmptyList } from '../../components/EmptyList';
import { Table } from '../../components/Table';
import { PipelineRunKubeObjectInterface } from '../../k8s/PipelineRun/types';
import { useResourceActionListContext } from '../../providers/ResourceActionList/hooks';
import { PipelineRunActionsMenu } from '../PipelineRunActionsMenu';
import { DeletionDialog } from './components/DeleteDialog';
import { useColumns } from './hooks/useColumns';
import { useUpperColumns } from './hooks/useUpperColumns';
import { PipelineRunListProps } from './types';

export const PipelineRunList = ({
  pipelineRuns,
  isLoading,
  filterFunction,
  error,
}: PipelineRunListProps) => {
  const columns = useColumns();

  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelectAllClick = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      paginatedItems: PipelineRunKubeObjectInterface[]
    ) => {
      if (event.target.checked) {
        const newSelected = paginatedItems.map(({ metadata: { name } }) => name);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    []
  );

  const handleSelectRowClick = React.useCallback(
    (event: React.MouseEvent<unknown>, row: PipelineRunKubeObjectInterface) => {
      const name = row.metadata.name;
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const upperColumns = useUpperColumns({
    selected,
    onDeleteClick: () => setDeleteDialogOpen(true),
  });

  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<PipelineRunKubeObjectInterface>();

  const onDelete = React.useCallback(() => {
    setSelected([]);
  }, []);

  return (
    <>
      <Table
        error={error}
        columns={columns}
        upperColumns={upperColumns}
        data={pipelineRuns}
        isLoading={isLoading}
        emptyListComponent={<EmptyList missingItemName={'pipeline runs'} />}
        filterFunction={filterFunction}
        handleSelectRowClick={handleSelectRowClick}
        handleSelectAllClick={handleSelectAllClick}
        selected={selected}
        isSelected={(row) => selected.indexOf(row.metadata.name) !== -1}
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
      <PipelineRunActionsMenu
        variant="menu"
        data={{
          pipelineRun: data,
        }}
        anchorEl={anchorEl}
        handleCloseResourceActionListMenu={handleCloseResourceActionListMenu}
      />
    </>
  );
};
