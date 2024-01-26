import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Button, Grid, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { editResource } from '../../../../k8s/common/editResource';
import { EDPComponentKubeObject } from '../../../../k8s/EDPComponent';
import { useEDPComponentCRUD } from '../../../../k8s/EDPComponent/hooks/useEDPComponentCRUD';
import { routeEDPComponentList } from '../../../../pages/edp-configuration/pages/edp-component-list/route';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../providers/Form/hooks';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../../DeleteKubeObject/constants';
import { EDP_COMPONENT_FORM_NAMES } from '../../names';
import { ManageEDPComponentDataContext, ManageEDPComponentValues } from '../../types';

export const FormActions = () => {
  const { setDialog } = useDialogContext();

  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useReactHookFormContext<ManageEDPComponentValues>();

  const {
    formData: { EDPComponent, isSystem },
  } = useFormContext<ManageEDPComponentDataContext>();

  const handleClose = React.useCallback(() => {
    reset();
  }, [reset]);

  const handleResetFields = React.useCallback(() => {
    reset();
  }, [reset]);

  const {
    editEDPComponent,
    mutations: { EDPComponentEditMutation },
  } = useEDPComponentCRUD({
    onSuccess: handleClose,
  });

  const isLoading = EDPComponentEditMutation.isLoading;

  const onSubmit = React.useCallback(
    async (values: ManageEDPComponentValues) => {
      const editedEDPComponent = editResource(EDP_COMPONENT_FORM_NAMES, EDPComponent, {
        ...values,
        visible: JSON.parse(values.visible),
      });

      await editEDPComponent({
        EDPComponentData: editedEDPComponent,
      });
    },
    [editEDPComponent, EDPComponent]
  );

  const handleDelete = React.useCallback(async () => {
    setDialog({
      modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
      forwardedProps: {
        kubeObject: EDPComponentKubeObject,
        kubeObjectData: EDPComponent,
        objectName: EDPComponent?.metadata.name,
        description: 'Confirm the deletion of the EDPComponent',
        backRoute: Router.createRouteURL(routeEDPComponentList.path),
      },
    });
  }, [EDPComponent, setDialog]);

  return (
    <Grid container spacing={2} justifyContent={'space-between'}>
      <Grid item>
        <ConditionalWrapper
          condition={!!isSystem}
          wrapper={(children) => (
            <Tooltip title={'You cannot delete system EDP Component'}>
              <div>{children}</div>
            </Tooltip>
          )}
        >
          <IconButton onClick={handleDelete} disabled={!!isSystem} size="large">
            <Icon icon={ICONS.BUCKET} width="20" />
          </IconButton>
        </ConditionalWrapper>
      </Grid>
      <Grid item>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item>
            <Button
              onClick={handleResetFields}
              size="small"
              component={'button'}
              disabled={!isDirty}
            >
              undo changes
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              color={'primary'}
              size="small"
              disabled={!isDirty || isLoading}
            >
              apply
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
