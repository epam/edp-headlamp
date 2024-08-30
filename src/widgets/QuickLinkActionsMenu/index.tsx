import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { QuickLinkKubeObject } from '../../k8s/groups/EDP/QuickLink';
import { isSystemQuickLink } from '../../k8s/groups/EDP/QuickLink/utils/isSystemQuickLink';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DeleteKubeObjectDialog } from '../dialogs/DeleteKubeObject';
import { ManageQuickLinkDialog } from '../dialogs/ManageQuickLink';
import { QuickLinkActionsMenuProps } from './types';

export const QuickLinkActionsMenu = ({
  backRoute,
  variant,
  data,
  anchorEl,
  handleCloseResourceActionListMenu,
  permissions,
}: QuickLinkActionsMenuProps) => {
  const { setDialog } = useDialogContext();

  const isSystemQuickLinkBool = isSystemQuickLink(data);

  const actions = React.useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      createKubeAction({
        name: RESOURCE_ACTIONS.EDIT,
        icon: ICONS.PENCIL,
        disabled: {
          status: permissions?.update === false,
          reason: 'You do not have permission to edit QuickLink',
        },
        action: () => {
          if (variant === ACTION_MENU_TYPES.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

          setDialog(ManageQuickLinkDialog, {
            quickLink: data,
            isSystem: isSystemQuickLinkBool,
          });
        },
      }),
      createKubeAction({
        name: RESOURCE_ACTIONS.DELETE,
        icon: ICONS.BUCKET,
        disabled: {
          status: permissions?.delete === false || isSystemQuickLinkBool,
          reason:
            permissions?.delete === false
              ? 'You do not have permission to delete QuickLink'
              : isSystemQuickLinkBool
              ? 'System QuickLink cannot be deleted'
              : undefined,
        },
        action: () => {
          setDialog(DeleteKubeObjectDialog, {
            objectName: data?.metadata?.name,
            kubeObject: QuickLinkKubeObject,
            kubeObjectData: data,
            description: 'Confirm the deletion of the link',
            backRoute,
          });
          handleCloseResourceActionListMenu();
        },
      }),
    ];
  }, [
    backRoute,
    data,
    handleCloseResourceActionListMenu,
    isSystemQuickLinkBool,
    permissions?.delete,
    permissions?.update,
    setDialog,
    variant,
  ]);

  return variant === 'inline' ? (
    <ActionsInlineList actions={actions} />
  ) : variant === 'menu' ? (
    <ActionsMenuList
      actions={actions}
      anchorEl={anchorEl}
      handleCloseActionsMenu={handleCloseResourceActionListMenu}
    />
  ) : null;
};
