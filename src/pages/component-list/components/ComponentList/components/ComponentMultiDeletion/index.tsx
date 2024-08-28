import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
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
import { LoadingWrapper } from '../../../../../../components/LoadingWrapper';
import { useDeleteKubeObject } from '../../../../../../k8s/common/hooks/useDeleteKubeObject';
import { CodebaseKubeObject } from '../../../../../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Codebase/types';
import { routeCDPipelineDetails } from '../../../../../cdpipeline-details/route';
import { routeComponentDetails } from '../../../../../component-details/route';
import { routeStageDetails } from '../../../../../stage-details/route';
import { useDeletionConflicts } from '../../hooks/useDeletionConflicts';
import { ComponentsToDelete, ComponentsToDeleteConflicts } from '../../types';
import { ComponentMultiDeletionProps } from './types';

const CONFIRM_TEXT_VALUE = 'confirm';

const DeletedConflictsDialog = ({
  deletionConflicts,
  open,
  handleClose,
}: {
  deletionConflicts: ComponentsToDeleteConflicts;
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
      <DialogTitle>Cannot delete some of the selected components</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Component name</TableCell>
              <TableCell>Conflicting pipelines</TableCell>
              <TableCell>Conflicting stages</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(deletionConflicts.entries()).map(
              ([componentName, { component, pipelines, stages }], index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link
                      routeName={routeComponentDetails.path}
                      params={{
                        name: componentName,
                        namespace: component.metadata.namespace,
                      }}
                    >
                      {componentName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {pipelines
                      ? pipelines.map((pipeline, idx) => {
                          return (
                            <>
                              <Link
                                routeName={routeCDPipelineDetails.path}
                                params={{
                                  name: pipeline.metadata.name,
                                  namespace: pipeline.metadata.namespace,
                                }}
                              >
                                {pipeline.metadata.name}
                              </Link>
                              {idx !== pipelines.length - 1 ? ', ' : null}
                            </>
                          );
                        })
                      : null}
                  </TableCell>
                  <TableCell>
                    {stages
                      ? stages.map((stage, idx) => {
                          return (
                            <>
                              <Link
                                routeName={routeStageDetails.path}
                                params={{
                                  CDPipelineName: stage.metadata.name.replace(
                                    `-${stage.spec.name}`,
                                    ''
                                  ),
                                  stageName: stage.metadata.name,
                                  namespace: stage.metadata.namespace,
                                }}
                              >
                                {stage.metadata.name}
                              </Link>
                              {idx !== stages.length - 1 ? ', ' : null}
                            </>
                          );
                        })
                      : null}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeletionDialog = ({
  componentsToDelete,
  handleClose,
  open,
  deletionConflicts,
  onDelete,
}: {
  componentsToDelete: ComponentsToDelete;
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
  deletionConflicts: ComponentsToDeleteConflicts;
}) => {
  const [value, setValue] = React.useState('');

  const { deleteKubeObject } = useDeleteKubeObject({});

  const deletionDisabled = value !== CONFIRM_TEXT_VALUE;

  const handleDelete = () => {
    if (deletionDisabled) {
      return;
    }

    componentsToDelete.forEach((component, componentName) => {
      if (deletionConflicts.has(componentName)) {
        return;
      }

      deleteKubeObject({
        kubeObjectData: component,
        kubeObject: CodebaseKubeObject,
      });
    });

    setValue('');

    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure you want to delete the selected components?</DialogTitle>
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

export const ComponentMultiDeletion = ({
  components,
  open,
  handleClose,
  selected,
  onDelete,
}: ComponentMultiDeletionProps) => {
  const componentsByNameMap: Map<string, CodebaseKubeObjectInterface> = React.useMemo(() => {
    if (components === null) {
      return null;
    }

    return new Map(components.map((component) => [component.metadata.name, component]));
  }, [components]);

  const { componentsToDelete, componentsToDeleteConflicts } = useDeletionConflicts(
    selected,
    componentsByNameMap
  );

  const isLoaded = React.useMemo(() => {
    if (componentsToDelete !== null && componentsToDeleteConflicts !== null) {
      return true;
    }

    return false;
  }, [componentsToDelete, componentsToDeleteConflicts]);

  const hasConflicts = componentsToDeleteConflicts && componentsToDeleteConflicts.size > 0;

  return (
    <LoadingWrapper isLoading={!isLoaded}>
      {hasConflicts ? (
        <DeletedConflictsDialog
          deletionConflicts={componentsToDeleteConflicts}
          open={open}
          handleClose={handleClose}
        />
      ) : (
        <DeletionDialog
          componentsToDelete={componentsToDelete}
          open={open}
          handleClose={handleClose}
          deletionConflicts={componentsToDeleteConflicts}
          onDelete={onDelete}
        />
      )}
    </LoadingWrapper>
  );
};
