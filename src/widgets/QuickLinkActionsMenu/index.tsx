import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { QuickLinkKubeObject } from '../../k8s/QuickLink';
import { isSystemQuickLink } from '../../k8s/QuickLink/utils/isSystemQuickLink';
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
}: QuickLinkActionsMenuProps) => {
  const { setDialog } = useDialogContext();

  const isSystemQuickLinkBool = isSystemQuickLink(data);

  const getActions = React.useCallback(async () => {
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
        await createKubeAction({
          item: new QuickLinkKubeObject(data) as unknown as KubeObjectInterface,
          authActionName: 'update',
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          action: () => {
            setDialog({
              modalName: MANAGE_QUICK_LINK_DIALOG_NAME,
              forwardedProps: manageQuickLinkDialogForwardedProps,
            });
          },
        }),
        await createKubeAction({
          item: new QuickLinkKubeObject(data) as unknown as KubeObjectInterface,
          authActionName: 'delete',
          name: RESOURCE_ACTIONS.DELETE,
          icon: ICONS.BUCKET,
          action: () => {
            setDialog({
              modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
              forwardedProps: deleteKubeObjectDialogForwardedProps,
            });
          },
          disabled: {
            status: isSystemQuickLinkBool,
            reason: 'System QuickLink cannot be deleted',
          },
        }),
      ];
    } else {
      return [
        await createKubeAction({
          item: new QuickLinkKubeObject(data) as unknown as KubeObjectInterface,
          authActionName: 'update',
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          action: () => {
            handleCloseResourceActionListMenu();
            setDialog({
              modalName: MANAGE_QUICK_LINK_DIALOG_NAME,
              forwardedProps: manageQuickLinkDialogForwardedProps,
            });
          },
        }),
        await createKubeAction({
          item: new QuickLinkKubeObject(data) as unknown as KubeObjectInterface,
          authActionName: 'delete',
          name: RESOURCE_ACTIONS.DELETE,
          icon: ICONS.BUCKET,
          action: () => {
            handleCloseResourceActionListMenu();
            setDialog({
              modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
              forwardedProps: deleteKubeObjectDialogForwardedProps,
            });
          },
          disabled: {
            status: isSystemQuickLinkBool,
            reason: 'System QuickLink cannot be deleted',
          },
        }),
      ];
    }
  }, [
    backRoute,
    data,
    handleCloseResourceActionListMenu,
    isSystemQuickLinkBool,
    setDialog,
    variant,
  ]);

  const [actions, setActions] = React.useState([]);

  React.useEffect(() => {
    getActions().then((actions) => {
      if (actions.length === 0) {
        return;
      }

      setActions(actions);
    });
  }, [actions.length, getActions]);

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
