import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPE } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTION } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { CDPipelineKubeObject } from '../../k8s/groups/EDP/CDPipeline';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { createResourceAction } from '../../utils/actions/createResourceAction';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { DeleteKubeObjectDialog } from '../dialogs/DeleteKubeObject';
import { ManageCDPipelineDialog } from '../dialogs/ManageCDPipeline';
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

    return [
      createResourceAction({
        type: RESOURCE_ACTION.EDIT,
        label: capitalizeFirstLetter(RESOURCE_ACTION.EDIT),
        item: CDPipelineData,
        icon: ICONS.PENCIL,
        disabled: {
          status: !permissions.update.CDPipeline.allowed,
          reason: permissions.update.CDPipeline.reason,
        },
        callback: (CDPipelineData) => {
          if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }
          setDialog(ManageCDPipelineDialog, { CDPipelineData });
        },
      }),
      createResourceAction({
        type: RESOURCE_ACTION.DELETE,
        label: capitalizeFirstLetter(RESOURCE_ACTION.DELETE),
        item: CDPipelineData,
        icon: ICONS.BUCKET,
        disabled: {
          status: !permissions?.delete?.CDPipeline.allowed,
          reason: permissions?.delete?.CDPipeline.reason,
        },
        callback: (CDPipelineData) => {
          if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

          setDialog(DeleteKubeObjectDialog, {
            objectName: CDPipelineData?.metadata.name,
            kubeObject: CDPipelineKubeObject,
            kubeObjectData: CDPipelineData,
            description: `Confirm the deletion of the Deployment Flow with all its environments.`,
            backRoute,
            createCustomMessages: (item) => ({
              onMutate: {
                message: `${item.metadata.name} has been marked for deletion`,
              },
              onError: {
                message: `Failed to initiate ${item.metadata.name}'s deletion`,
              },
              onSuccess: {
                message: 'The deletion process has been started',
              },
            }),
          });
        },
      }),
    ];
  }, [
    CDPipelineData,
    backRoute,
    handleCloseResourceActionListMenu,
    permissions.delete,
    permissions.update,
    setDialog,
    variant,
  ]);

  return variant === ACTION_MENU_TYPE.INLINE ? (
    <ActionsInlineList actions={actions} />
  ) : variant === ACTION_MENU_TYPE.MENU ? (
    <ActionsMenuList
      actions={actions}
      anchorEl={anchorEl!}
      handleCloseActionsMenu={handleCloseResourceActionListMenu!}
    />
  ) : null;
};
