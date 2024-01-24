import React from 'react';
import { KubeObjectActions } from '../../components/KubeObjectActions';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPComponentKubeObject } from '../../k8s/EDPComponent';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { isSystemEDPComponent } from '../../k8s/EDPComponent/utils/isSystemEDPComponent';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { useResourceActionListContext } from '../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../types/actions';
import { FORM_MODES } from '../../types/forms';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../DeleteKubeObject/types';
import { MANAGE_EDP_COMPONENT_DIALOG_NAME } from '../ManageEDPComponent/constants';
import { ManageEDPComponentDialogForwardedProps } from '../ManageEDPComponent/types';
import { EDPComponentActionsMenuProps } from './types';

export const EDPComponentActionsMenu = ({ backRoute }: EDPComponentActionsMenuProps) => {
  const { setDialog } = useDialogContext();

  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<EDPComponentKubeObjectInterface>();

  const actions: KubeObjectAction[] = React.useMemo(() => {
    if (!data) {
      return [];
    }

    const isSystemEDPComponentBool = isSystemEDPComponent(data);

    const manageEDPComponentDialogForwardedProps: ManageEDPComponentDialogForwardedProps = {
      EDPComponent: data,
      mode: FORM_MODES.EDIT,
      isSystem: isSystemEDPComponentBool,
    };

    const deleteKubeObjectDialogForwardedProps: DeleteKubeObjectDialogForwardedProps = {
      objectName: data?.metadata?.name,
      kubeObject: EDPComponentKubeObject,
      kubeObjectData: data,
      description: 'Confirm the deletion of the EDPComponent',
      backRoute,
    };

    return [
      createKubeAction({
        name: RESOURCE_ACTIONS.EDIT,
        icon: ICONS.PENCIL,
        action: () => {
          handleCloseResourceActionListMenu();
          setDialog({
            modalName: MANAGE_EDP_COMPONENT_DIALOG_NAME,
            forwardedProps: manageEDPComponentDialogForwardedProps,
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
          status: isSystemEDPComponentBool,
          reason: 'System EDPComponent cannot be deleted',
        },
      }),
    ];
  }, [backRoute, data, handleCloseResourceActionListMenu, setDialog]);

  return (
    <KubeObjectActions
      anchorEl={anchorEl}
      handleCloseActionsMenu={handleCloseResourceActionListMenu}
      actions={actions}
    />
  );
};
