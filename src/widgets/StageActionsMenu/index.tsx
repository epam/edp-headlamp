import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPE } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTION } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { StageKubeObject } from '../../k8s/groups/EDP/Stage';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { KubeObjectAction } from '../../types/actions';
import { createResourceAction } from '../../utils/actions/createResourceAction';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
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
  permissions,
}: StageActionsMenuProps) => {
  const { setDialog } = useDialogContext();

  const getActions = React.useCallback(async () => {
    if (!stage) {
      return [];
    }

    return [
      createResourceAction({
        item: stage,
        type: RESOURCE_ACTION.EDIT,
        label: capitalizeFirstLetter(RESOURCE_ACTION.EDIT),
        icon: ICONS.PENCIL,
        disabled: {
          status: !permissions.update.Stage.allowed,
          reason: permissions.update.Stage.reason,
        },
        callback: (stage) => {
          if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

          setDialog(ManageStageDialog, {
            stage,
            otherStages: stages,
            CDPipelineData,
          });
        },
      }),
      (await createDeleteAction({
        allStages: stages,
        currentStage: stage,
        permissions,
        action: (stage) => {
          if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

          setDialog(DeleteKubeObjectDialog, {
            objectName: stage?.spec?.name,
            kubeObject: StageKubeObject,
            kubeObjectData: stage,
            description: `Confirm the deletion of the CD stage with all its components`,
            backRoute,
          });
        },
      })) as KubeObjectAction,
    ].filter(Boolean);
  }, [
    CDPipelineData,
    backRoute,
    handleCloseResourceActionListMenu,
    permissions,
    setDialog,
    stage,
    stages,
    variant,
  ]);

  const [actions, setActions] = React.useState<KubeObjectAction[]>([]);

  React.useEffect(() => {
    getActions().then((actions) => {
      if (actions.length === 0) {
        return;
      }

      setActions(actions);
    });
  }, [actions.length, getActions]);

  return variant === ACTION_MENU_TYPE.INLINE ? (
    <ActionsInlineList actions={actions} />
  ) : variant === ACTION_MENU_TYPE.MENU ? (
    <ActionsMenuList
      actions={actions}
      anchorEl={anchorEl}
      handleCloseActionsMenu={handleCloseResourceActionListMenu}
    />
  ) : null;
};
