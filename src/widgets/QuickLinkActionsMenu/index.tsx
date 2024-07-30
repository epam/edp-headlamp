import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { QuickLinkKubeObject } from '../../k8s/groups/EDP/QuickLink';
import { isSystemQuickLink } from '../../k8s/groups/EDP/QuickLink/utils/isSystemQuickLink';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../DeleteKubeObject/types';
import { MANAGE_QUICK_LINK_DIALOG_NAME } from '../ManageQuickLink/constants';
import { ManageQuickLinkDialogForwardedProps } from '../ManageQuickLink/types';
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

    const manageQuickLinkDialogForwardedProps: ManageQuickLinkDialogForwardedProps = {
      QuickLink: data,
      mode: FORM_MODES.EDIT,
      isSystem: isSystemQuickLinkBool,
    };

    const deleteKubeObjectDialogForwardedProps: DeleteKubeObjectDialogForwardedProps = {
      objectName: data?.metadata?.name,
      kubeObject: QuickLinkKubeObject,
      kubeObjectData: data,
      description: 'Confirm the deletion of the link',
      backRoute,
    };

    if (variant === ACTION_MENU_TYPES.INLINE) {
      return [
        createKubeAction({
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          disabled: {
            status: permissions?.update === false,
            reason: 'You do not have permission to edit QuickLink',
          },
          action: () => {
            setDialog({
              modalName: MANAGE_QUICK_LINK_DIALOG_NAME,
              forwardedProps: manageQuickLinkDialogForwardedProps,
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
            status: permissions?.update === false,
            reason: 'You do not have permission to edit QuickLink',
          },
          action: () => {
            handleCloseResourceActionListMenu();
            setDialog({
              modalName: MANAGE_QUICK_LINK_DIALOG_NAME,
              forwardedProps: manageQuickLinkDialogForwardedProps,
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
    backRoute,
    data,
    handleCloseResourceActionListMenu,
    isSystemQuickLinkBool,
    permissions,
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
