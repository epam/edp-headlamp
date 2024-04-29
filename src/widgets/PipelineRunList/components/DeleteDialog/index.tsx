import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { useDeleteKubeObject } from '../../../DeleteKubeObject/hooks/useDeleteKubeObject';

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
  const itemsByNameMap: Map<string, PipelineRunKubeObjectInterface> = React.useMemo(() => {
    if (items === null) {
      return null;
    }

    return new Map(items.map((item) => [item.metadata.name, item]));
  }, [items]);

  const selectedPipelineRuns = React.useMemo(() => {
    if (selected === null) {
      return null;
    }

    return selected.map((name) => itemsByNameMap.get(name));
  }, [itemsByNameMap, selected]);

  const [value, setValue] = React.useState('');

  const { deleteKubeObject } = useDeleteKubeObject({});

  const deletionDisabled = value !== CONFIRM_TEXT_VALUE;

  const handleDelete = () => {
    if (deletionDisabled) {
      return;
    }

    selectedPipelineRuns.forEach((item) => {
      const pipelineRun = item?.jsonData;

      deleteKubeObject({
        kubeObjectData: pipelineRun,
        kubeObject: PipelineRunKubeObject,
      });
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
