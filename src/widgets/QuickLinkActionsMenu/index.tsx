import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPE } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTION } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { QuickLinkKubeObject } from '../../k8s/groups/EDP/QuickLink';
import { isSystemQuickLink } from '../../k8s/groups/EDP/QuickLink/utils/isSystemQuickLink';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { createResourceAction } from '../../utils/actions/createResourceAction';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
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
      createResourceAction({
        type: RESOURCE_ACTION.EDIT,
        label: capitalizeFirstLetter(RESOURCE_ACTION.EDIT),
        icon: ICONS.PENCIL,
        item: data,
        disabled: {
          status: !permissions.update.QuickLink.allowed,
          reason: permissions.update.QuickLink.reason,
        },
        callback: (data) => {
          if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

          setDialog(ManageQuickLinkDialog, {
            quickLink: data,
            isSystem: isSystemQuickLinkBool,
          });
        },
      }),
      createResourceAction({
        type: RESOURCE_ACTION.DELETE,
        label: capitalizeFirstLetter(RESOURCE_ACTION.DELETE),
        icon: ICONS.BUCKET,
        item: data,
        disabled: {
          status: !permissions?.delete?.QuickLink.allowed || isSystemQuickLinkBool,
          reason: !permissions?.delete?.QuickLink.allowed
            ? permissions?.delete?.QuickLink.reason
            : isSystemQuickLinkBool
            ? 'System QuickLink cannot be deleted'
            : '',
        },
        callback: (data) => {
          setDialog(DeleteKubeObjectDialog, {
            objectName: data?.metadata?.name,
            kubeObject: QuickLinkKubeObject,
            kubeObjectData: data,
            description: 'Confirm the deletion of the link',
            backRoute,
          });
          handleCloseResourceActionListMenu && handleCloseResourceActionListMenu();
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
