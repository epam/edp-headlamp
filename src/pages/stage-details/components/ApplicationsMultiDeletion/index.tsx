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
import { APPLICATION_LABEL_SELECTOR_APP_NAME } from '../../../../k8s/groups/ArgoCD/Application/labels';
import { ApplicationMultiDeletionProps } from './types';

const CONFIRM_TEXT_VALUE = 'confirm';

export const ApplicationsMultiDeletion = ({
  applications,
  open,
  handleClose,
  selected,
  onDelete,
  deleteArgoApplication,
}: ApplicationMultiDeletionProps) => {
  const [value, setValue] = React.useState('');

  const deletionDisabled = value !== CONFIRM_TEXT_VALUE;

  const selectedApplications = React.useMemo(
    () =>
      applications?.filter((application) =>
        selected.includes(application?.metadata?.labels?.[APPLICATION_LABEL_SELECTOR_APP_NAME])
      ),
    [applications, selected]
  );

  const handleDelete = React.useCallback(() => {
    if (deletionDisabled || !selectedApplications || !selectedApplications.length) {
      return;
    }

    selectedApplications.forEach((application) => {
      deleteArgoApplication({ argoApplication: application });
    });

    setValue('');

    if (onDelete) {
      onDelete();
    }
  }, [deleteArgoApplication, deletionDisabled, onDelete, selectedApplications]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure you want to delete the selected applications?</DialogTitle>
      <DialogContent sx={{ pt: '20px !important' }}>
        <Table sx={{ mb: (t) => t.typography.pxToRem(20) }}>
          <TableHead>
            <TableRow>
              <TableCell>Application name</TableCell>
              <TableCell>ArgoCD Application name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedApplications &&
              selectedApplications?.map((application, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {application?.metadata?.labels?.[APPLICATION_LABEL_SELECTOR_APP_NAME]}
                  </TableCell>
                  <TableCell>{application?.metadata.name}</TableCell>
                </TableRow>
              ))}
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
