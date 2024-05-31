import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../CreateEditCDPipeline/constants';
import { CreateEditCDPipelineDialogForwardedProps } from '../CreateEditCDPipeline/types';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../DeleteKubeObject/types';
import { CDPipelineActionsMenuProps } from './types';

export const CDPipelineActionsMenu = ({
  backRoute,
  variant,
  data: { CDPipelineData },
  anchorEl,
  handleCloseResourceActionListMenu,
  permissions,
}: CDPipelineActionsMenuProps) => {
  const { setDialog } = useDialogContext();

  const actions = React.useMemo(() => {
    if (!CDPipelineData) {
      return [];
    }

    const createEditCDPipelineDialogForwardedProps: CreateEditCDPipelineDialogForwardedProps = {
      CDPipelineData: CDPipelineData,
      mode: FORM_MODES.EDIT,
    };

    const deleteKubeObjectDialogForwardedProps: DeleteKubeObjectDialogForwardedProps = {
      objectName: CDPipelineData?.metadata.name,
      kubeObject: EDPCDPipelineKubeObject,
      kubeObjectData: CDPipelineData,
      description: `Confirm the deletion of the CD Pipeline with all its components`,
      backRoute,
    };

    if (variant === ACTION_MENU_TYPES.INLINE) {
      return [
        createKubeAction({
          name: RESOURCE_ACTIONS.EDIT,
          disabled: {
            status: permissions.update === false,
            reason: 'You do not have permission to edit a CD Pipeline',
          },
          icon: ICONS.PENCIL,
          action: () => {
            setDialog({
              modalName: CREATE_EDIT_CD_PIPELINE_DIALOG_NAME,
              forwardedProps: createEditCDPipelineDialogForwardedProps,
            });
          },
        }),
        createKubeAction({
          name: RESOURCE_ACTIONS.DELETE,
          disabled: {
            status: permissions.delete === false,
            reason: 'You do not have permission to delete a CD Pipeline',
          },
          icon: ICONS.BUCKET,
          action: () => {
            setDialog({
              modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
              forwardedProps: deleteKubeObjectDialogForwardedProps,
            });
          },
        }),
      ];
    } else {
      return [
        createKubeAction({
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          disabled: {
            status: permissions.update === false,
            reason: 'You do not have permission to edit a CD Pipeline',
          },
          action: () => {
            handleCloseResourceActionListMenu();
            setDialog({
              modalName: CREATE_EDIT_CD_PIPELINE_DIALOG_NAME,
              forwardedProps: createEditCDPipelineDialogForwardedProps,
            });
          },
        }),
        createKubeAction({
          name: RESOURCE_ACTIONS.DELETE,
          icon: ICONS.BUCKET,
          disabled: {
            status: permissions.delete === false,
            reason: 'You do not have permission to delete a CD Pipeline',
          },
          action: () => {
            handleCloseResourceActionListMenu();
            setDialog({
              modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
              forwardedProps: deleteKubeObjectDialogForwardedProps,
            });
          },
        }),
      ];
    }
  }, [
    CDPipelineData,
    backRoute,
    handleCloseResourceActionListMenu,
    permissions.delete,
    permissions.update,
    setDialog,
    variant,
  ]);

  return variant === ACTION_MENU_TYPES.INLINE ? (
    <ActionsInlineList actions={actions} />
  ) : variant === ACTION_MENU_TYPES.MENU ? (
    <ActionsMenuList
      actions={actions}
      anchorEl={anchorEl}
      handleCloseActionsMenu={handleCloseResourceActionListMenu}
    />
  ) : null;
};
