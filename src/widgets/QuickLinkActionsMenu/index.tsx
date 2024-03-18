import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
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

  return variant === 'inline' ? (
    <ActionsInlineList
      actions={[
        createKubeAction({
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
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
      ]}
    />
  ) : variant === 'menu' ? (
    <ActionsMenuList
      actions={[
        createKubeAction({
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
        createKubeAction({
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
      ]}
      anchorEl={anchorEl}
      handleCloseActionsMenu={handleCloseResourceActionListMenu}
    />
  ) : null;
};
