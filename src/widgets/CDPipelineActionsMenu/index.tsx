import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { CDPipelineKubeObject } from '../../k8s/groups/EDP/CDPipeline';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { useDialogContext as useNewDialogContext } from '../../providers/NewDialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../CreateEditCDPipeline/constants';
import { CreateEditCDPipelineDialogForwardedProps } from '../CreateEditCDPipeline/types';
import { DeleteKubeObjectDialog } from '../dialogs/DeleteKubeObject';
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
  const { setDialog: setNewDialog } = useNewDialogContext();

  const actions = React.useMemo(() => {
    if (!CDPipelineData) {
      return [];
    }

    const createEditCDPipelineDialogForwardedProps: CreateEditCDPipelineDialogForwardedProps = {
      CDPipelineData: CDPipelineData,
      mode: FORM_MODES.EDIT,
    };

    const deleteKubeObjectDialogProps = {
      objectName: CDPipelineData?.metadata.name,
      kubeObject: CDPipelineKubeObject,
      kubeObjectData: CDPipelineData,
      description: `Confirm the deletion of the Deployment Flow with all its environments.`,
      backRoute,
    };

    if (variant === ACTION_MENU_TYPES.INLINE) {
      return [
        createKubeAction({
          name: RESOURCE_ACTIONS.EDIT,
          disabled: {
            status: permissions.update === false,
            reason: 'You do not have permission to edit a Deployment Flow',
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
            reason: 'You do not have permission to delete a Deployment Flow',
          },
          icon: ICONS.BUCKET,
          action: () => {
            setNewDialog(DeleteKubeObjectDialog, deleteKubeObjectDialogProps);
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
            reason: 'You do not have permission to edit a Deployment Flow',
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
            reason: 'You do not have permission to delete a Deployment Flow',
          },
          action: () => {
            handleCloseResourceActionListMenu();
            setNewDialog(DeleteKubeObjectDialog, deleteKubeObjectDialogProps);
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
    setNewDialog,
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
