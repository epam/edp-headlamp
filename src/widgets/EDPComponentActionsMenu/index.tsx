import React from 'react';
import { KubeObjectActions } from '../../components/KubeObjectActions';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { isSystemEDPComponent } from '../../k8s/EDPComponent/utils/isSystemEDPComponent';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { useResourceActionListContext } from '../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../types/actions';
import { FORM_MODES } from '../../types/forms';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { MANAGE_EDP_COMPONENT_DIALOG_NAME } from '../ManageEDPComponent/constants';
import { ManageEDPComponentDialogForwardedProps } from '../ManageEDPComponent/types';
import { EDPComponentActionsMenuProps } from './types';

export const EDPComponentActionsMenu = ({}: EDPComponentActionsMenuProps) => {
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
        ];
    }, [data, handleCloseResourceActionListMenu, setDialog]);

    return (
        <KubeObjectActions
            anchorEl={anchorEl}
            handleCloseActionsMenu={handleCloseResourceActionListMenu}
            actions={actions}
        />
    );
};
