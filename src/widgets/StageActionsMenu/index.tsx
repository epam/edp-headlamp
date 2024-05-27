import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCDPipelineStageKubeObject } from '../../k8s/EDPCDPipelineStage';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../CreateEditStage/constants';
import { CreateEditStageDialogForwardedProps } from '../CreateEditStage/types';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../DeleteKubeObject/types';
import { StageActionsMenuProps } from './types';
import { createDeleteAction } from './utils';

export const StageActionsMenu = ({
  data: { stage, stages, CDPipelineData },
  backRoute,
  handleCloseResourceActionListMenu,
  anchorEl,
  variant,
}: StageActionsMenuProps) => {
  const { setDialog } = useDialogContext();

  const getActions = React.useCallback(async () => {
    if (!stage) {
      return [];
    }

    const createEditStageDialogForwardedProps: CreateEditStageDialogForwardedProps = {
      stage: stage,
      mode: FORM_MODES.EDIT,
      otherStages: stages,
      CDPipelineData,
    };

    const deleteKubeObjectDialogForwardedProps: DeleteKubeObjectDialogForwardedProps = {
      objectName: stage?.spec?.name,
      kubeObject: EDPCDPipelineStageKubeObject,
      kubeObjectData: stage,
      description: `Confirm the deletion of the CD stage with all its components`,
      backRoute,
    };

    if (variant === ACTION_MENU_TYPES.INLINE) {
      return [
        await createKubeAction({
          item: new EDPCDPipelineStageKubeObject(stage) as unknown as KubeObjectInterface,
          actionCheckName: 'update',
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          action: () => {
            setDialog({
              modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
              forwardedProps: createEditStageDialogForwardedProps,
            });
          },
        }),
        await createDeleteAction(stages, stage, () => {
          setDialog({
            modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
            forwardedProps: deleteKubeObjectDialogForwardedProps,
          });
        }),
      ];
    } else {
      return [
        await createKubeAction({
          item: new EDPCDPipelineStageKubeObject(stage) as unknown as KubeObjectInterface,
          actionCheckName: 'update',
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          action: () => {
            handleCloseResourceActionListMenu();

            setDialog({
              modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
              forwardedProps: createEditStageDialogForwardedProps,
            });
          },
        }),
        await createDeleteAction(stages, stage, () => {
          handleCloseResourceActionListMenu();

          setDialog({
            modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
            forwardedProps: deleteKubeObjectDialogForwardedProps,
          });
        }),
      ];
    }
  }, [
    CDPipelineData,
    backRoute,
    handleCloseResourceActionListMenu,
    setDialog,
    stage,
    stages,
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
