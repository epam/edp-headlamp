import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';
import { CRUD_TYPE } from '../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';

const CONFIRM_TEXT_VALUE = 'confirm';

export const DeletionDialog = ({
  items,
  selected,
  handleClose,
  open,
  onDelete,
}: {
  items: PipelineRunKubeObjectInterface[];
  selected: string[];
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
}) => {
  const itemsByNameMap: Map<string, PipelineRunKubeObjectInterface> | null = React.useMemo(() => {
    if (items === null) {
      return null;
    }

    return new Map(items.map((item) => [item.metadata.name, item]));
  }, [items]);

  const selectedPipelineRuns = React.useMemo(() => {
    if (selected === null || !itemsByNameMap) {
      return null;
    }

    return selected.map((name) => itemsByNameMap.get(name));
  }, [itemsByNameMap, selected]);

  const [value, setValue] = React.useState('');

  const deletionDisabled = value !== CONFIRM_TEXT_VALUE;

  const { showBeforeRequestMessage } = useRequestStatusMessages();

  const handleDelete = () => {
    if (deletionDisabled || !selectedPipelineRuns) {
      return;
    }

    selectedPipelineRuns.forEach((item) => {
      const pipelineRun = item;

      PipelineRunKubeObject.apiEndpoint.delete(
        pipelineRun!.metadata.namespace,
        pipelineRun!.metadata.name
      );
    });

    showBeforeRequestMessage(CRUD_TYPE.DELETE, {
      customMessage: {
        message: 'Selected PipelineRuns have been deleted',
      },
    });

    setValue('');

    if (onDelete) {
      onDelete();
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure you want to delete the selected PipelineRuns?</DialogTitle>
      <DialogContent sx={{ pt: '20px !important' }}>
        <TextField
          label={`Enter "${CONFIRM_TEXT_VALUE}" to start deletion`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} disabled={deletionDisabled} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
