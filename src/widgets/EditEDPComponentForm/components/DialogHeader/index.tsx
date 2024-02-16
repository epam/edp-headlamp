import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Button, Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { editResource } from '../../../../k8s/common/editResource';
import { EDPComponentKubeObject } from '../../../../k8s/EDPComponent';
import { routeEDPComponentList } from '../../../../pages/edp-component-list/route';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../providers/Form/hooks';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../../DeleteKubeObject/constants';
import { EDP_COMPONENT_FORM_NAMES } from '../../names';
import { ManageEDPComponentDataContext, ManageEDPComponentValues } from '../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorData, setEditorOpen }: DialogHeaderProps) => {
  const { getValues } = useReactHookFormContext<ManageEDPComponentValues>();
  const { setDialog } = useDialogContext();

  const {
    formData: { EDPComponent, isSystem },
  } = useFormContext<ManageEDPComponentDataContext>();

  const handleOpenEditor = React.useCallback(() => {
    if (isSystem) {
      return;
    }

    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, EDP_COMPONENT_FORM_NAMES);
    const editedEDPComponent = editResource(EDP_COMPONENT_FORM_NAMES, EDPComponent, usedValues);
    setEditorData(editedEDPComponent);
  }, [EDPComponent, getValues, isSystem, setEditorData, setEditorOpen]);

  const handleDelete = React.useCallback(async () => {
    setDialog({
      modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
      forwardedProps: {
        kubeObject: EDPComponentKubeObject,
        kubeObjectData: EDPComponent,
        objectName: 'the Link',
        description: 'Confirm the deletion of the link',
        backRoute: Router.createRouteURL(routeEDPComponentList.path),
      },
    });
  }, [EDPComponent, setDialog]);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
      <Grid item>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h5'}>Edit</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Button
              startIcon={<Icon icon={ICONS.PENCIL} />}
              size="small"
              component={'button'}
              onClick={handleOpenEditor}
              style={{ flexShrink: 0 }}
              disabled={isSystem}
            >
              Edit YAML
            </Button>
          </Grid>
          <Grid item>
            <ConditionalWrapper
              condition={isSystem}
              wrapper={(children) => (
                <Tooltip title={'You cannot delete system EDP Component'}>
                  <div>{children}</div>
                </Tooltip>
              )}
            >
              <Button
                startIcon={<Icon icon={ICONS.BUCKET} />}
                size="small"
                component={'button'}
                onClick={handleDelete}
                style={{ flexShrink: 0 }}
                disabled={isSystem}
              >
                Delete
              </Button>
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
