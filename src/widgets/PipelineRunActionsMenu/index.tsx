import React from 'react';
import { useHistory } from 'react-router-dom';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { CRUD_TYPES } from '../../constants/crudTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { useResourceCRUDMutation } from '../../hooks/useResourceCRUDMutation';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../k8s/PipelineRun/constants';
import { PipelineRunKubeObjectInterface } from '../../k8s/PipelineRun/types';
import { createRerunPipelineRunInstance } from '../../k8s/PipelineRun/utils/createRerunPipelineRunInstance';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { PipelineRunActionsMenuProps } from './types';

export const PipelineRunActionsMenu = ({
  backRoute,
  variant,
  data: { pipelineRun: _pipelineRun },
  anchorEl,
  handleCloseResourceActionListMenu,
}: PipelineRunActionsMenuProps) => {
  const history = useHistory();
  const pipelineRunCreateMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('pipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPES.CREATE);

  const pipelineRunEditMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('pipelineRunEditMutation', PipelineRunKubeObject, CRUD_TYPES.EDIT);

  const pipelineRunDeleteMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    CRUD_TYPES.DELETE
  >('pipelineRunDeleteMutation', PipelineRunKubeObject, CRUD_TYPES.DELETE);

  const status = PipelineRunKubeObject.parseStatusReason(_pipelineRun)?.toLowerCase();

  const isInProgress =
    status === PIPELINE_RUN_REASON.STARTED || status === PIPELINE_RUN_REASON.RUNNING;

  const pipelineRun = React.useMemo(() => {
    const copy = { ..._pipelineRun };
    delete copy.actionType;
    return copy;
  }, [_pipelineRun]);

  const onDelete = () => {
    history.push(backRoute);
  };

  return variant === ACTION_MENU_TYPES.INLINE ? (
    <ActionsInlineList
      actions={[
        createKubeAction({
          name: 'Rerun',
          icon: ICONS.REDO,
          action: () => {
            pipelineRunCreateMutation.mutate(createRerunPipelineRunInstance(pipelineRun));
          },
        }),
        createKubeAction({
          name: 'Cancel',
          icon: ICONS.CANCEL,
          action: () => {
            const copyPipelineRun = { ...pipelineRun };
            copyPipelineRun.spec.status = 'Cancelled';

            pipelineRunEditMutation.mutate(copyPipelineRun);
          },
          disabled: {
            status: !isInProgress,
            reason: 'PipelineRun is no longer in progress',
          },
        }),
        createKubeAction({
          name: RESOURCE_ACTIONS.DELETE,
          icon: ICONS.BUCKET,
          action: () => {
            pipelineRunDeleteMutation.mutate(pipelineRun, {
              onSuccess: onDelete,
            });
          },
        }),
      ]}
    />
  ) : variant === ACTION_MENU_TYPES.MENU ? (
    <ActionsMenuList
      actions={[
        createKubeAction({
          name: 'Rerun',
          icon: ICONS.REDO,
          action: () => {
            handleCloseResourceActionListMenu();
            pipelineRunCreateMutation.mutate(createRerunPipelineRunInstance(pipelineRun));
          },
        }),
        createKubeAction({
          name: 'Cancel',
          icon: ICONS.CANCEL,
          action: () => {
            handleCloseResourceActionListMenu();

            const copyPipelineRun = { ...pipelineRun };
            copyPipelineRun.spec.status = 'Cancelled';

            pipelineRunEditMutation.mutate(copyPipelineRun);
          },
          disabled: {
            status: !isInProgress,
            reason: 'PipelineRun is no longer in progress',
          },
        }),
        createKubeAction({
          name: RESOURCE_ACTIONS.DELETE,
          icon: ICONS.BUCKET,
          action: () => {
            handleCloseResourceActionListMenu();
            pipelineRunDeleteMutation.mutate(pipelineRun, {
              onSuccess: onDelete,
            });
          },
        }),
      ]}
      anchorEl={anchorEl}
      handleCloseActionsMenu={handleCloseResourceActionListMenu}
    />
  ) : null;
};
