import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React from 'react';
import { useDeleteKubeObject } from '../../../../k8s/common/hooks/useDeleteKubeObject';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { GitServerKubeObject } from '../../../../k8s/groups/EDP/GitServer';
import { DeletionDialogProps } from './types';

const CONFIRM_TEXT_VALUE = 'confirm';

export const DeletionDialog = ({
  gitServer,
  gitServerSecret,
  open,
  handleClose,
}: DeletionDialogProps) => {
  const [value, setValue] = React.useState('');

  const deletionDisabled = value !== CONFIRM_TEXT_VALUE;

  const { deleteKubeObject } = useDeleteKubeObject({
    onSuccess: () =>
      gitServerSecret &&
      deleteKubeObject({ kubeObject: SecretKubeObject, variables: gitServerSecret }),
  });

  const handleDelete = React.useCallback(() => {
    setValue('');

    if (!gitServer) {
      return;
    }

    deleteKubeObject({ kubeObject: GitServerKubeObject, variables: gitServer });
  }, [deleteKubeObject, gitServer]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure you want to delete these?</DialogTitle>
      <DialogContent sx={{ pt: '20px !important' }}>
        <Table sx={{ mb: (t) => t.typography.pxToRem(20) }}>
          <TableHead>
            <TableRow>
              <TableCell>GitServer</TableCell>
              <TableCell>Secret</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{gitServer?.metadata.name}</TableCell>
              <TableCell>{gitServerSecret?.metadata.name}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
