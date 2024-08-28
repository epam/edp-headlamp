import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { StageKubeObject } from '../../k8s/groups/EDP/Stage';
import { useDialogContext } from '../../providers/NewDialog/hooks';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DeleteKubeObjectDialog } from '../dialogs/DeleteKubeObject';
import { ManageStageDialog } from '../dialogs/ManageStage';
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

    const deleteKubeObjectDialogProps = {
      objectName: stage?.spec?.name,
      kubeObject: StageKubeObject,
      kubeObjectData: stage,
      description: `Confirm the deletion of the CD stage with all its components`,
      backRoute,
    };

    const manageStageDialogProps = {
      stage,
      otherStages: stages,
      CDPipelineData,
    };

    if (variant === ACTION_MENU_TYPES.INLINE) {
      return [
        createKubeAction({
          item: new StageKubeObject(stage) as unknown as KubeObjectInterface,
          actionCheckName: 'update',
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          action: () => {
            setDialog(ManageStageDialog, manageStageDialogProps);
          },
        }),
        await createDeleteAction(stages, stage, () => {
          setDialog(DeleteKubeObjectDialog, deleteKubeObjectDialogProps);
        }),
      ];
    } else {
      return [
        createKubeAction({
          item: new StageKubeObject(stage) as unknown as KubeObjectInterface,
          actionCheckName: 'update',
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          action: () => {
            handleCloseResourceActionListMenu();

            setDialog(ManageStageDialog, manageStageDialogProps);
          },
        }),
        await createDeleteAction(stages, stage, () => {
          handleCloseResourceActionListMenu();

          setDialog(DeleteKubeObjectDialog, deleteKubeObjectDialogProps);
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
