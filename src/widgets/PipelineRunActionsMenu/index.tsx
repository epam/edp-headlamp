import { Icon } from '@iconify/react';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../k8s/PipelineRun/constants';
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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const status = PipelineRunKubeObject.parseStatusReason(_pipelineRun)?.toLowerCase();

  const isInProgress =
    status === PIPELINE_RUN_REASON.STARTED || status === PIPELINE_RUN_REASON.RUNNING;

  const onDelete = React.useCallback(() => {
    history.push(backRoute);
  }, [backRoute, history]);

  const getActions = React.useCallback(async () => {
    const pipelineRun = { ..._pipelineRun };
    delete pipelineRun.actionType;

    if (!pipelineRun) {
      return [];
    }

    if (variant === ACTION_MENU_TYPES.INLINE) {
      return [
        await createKubeAction({
          item: new PipelineRunKubeObject(pipelineRun) as unknown as KubeObjectInterface,
          actionCheckName: 'create',
          name: 'Rerun',
          icon: ICONS.REDO,
          action: () => {
            PipelineRunKubeObject.apiEndpoint.post(createRerunPipelineRunInstance(pipelineRun));

            enqueueSnackbar('The PipelineRun is rerun', {
              autoHideDuration: 2000,
              variant: 'info',
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              action: (key) => (
                <IconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={ICONS.CROSS} />
                </IconButton>
              ),
            });
          },
        }),
        await createKubeAction({
          item: new PipelineRunKubeObject(pipelineRun) as unknown as KubeObjectInterface,
          actionCheckName: 'update',
          name: 'Cancel',
          icon: ICONS.CANCEL,
          action: () => {
            const copyPipelineRun = { ...pipelineRun };
            copyPipelineRun.spec.status = 'Cancelled';
            PipelineRunKubeObject.apiEndpoint.put(copyPipelineRun);
            enqueueSnackbar('The PipelineRun is cancelled', {
              autoHideDuration: 2000,
              variant: 'info',
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              action: (key) => (
                <IconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={ICONS.CROSS} />
                </IconButton>
              ),
            });
          },
          disabled: {
            status: !isInProgress,
            reason: 'PipelineRun is no longer in progress',
          },
        }),
        await createKubeAction({
          item: new PipelineRunKubeObject(pipelineRun) as unknown as KubeObjectInterface,
          actionCheckName: 'delete',
          name: RESOURCE_ACTIONS.DELETE,
          icon: ICONS.BUCKET,
          action: () => {
            PipelineRunKubeObject.apiEndpoint.delete(
              pipelineRun.metadata.namespace,
              pipelineRun.metadata.name
            );
            enqueueSnackbar('The PipelineRun is deleted', {
              autoHideDuration: 2000,
              variant: 'info',
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              action: (key) => (
                <IconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={ICONS.CROSS} />
                </IconButton>
              ),
            });
            onDelete();
          },
        }),
      ];
    } else {
      return [
        await createKubeAction({
          item: new PipelineRunKubeObject(pipelineRun) as unknown as KubeObjectInterface,
          actionCheckName: 'create',
          name: 'Rerun',
          icon: ICONS.REDO,
          action: () => {
            handleCloseResourceActionListMenu();
            PipelineRunKubeObject.apiEndpoint.post(createRerunPipelineRunInstance(pipelineRun));
          },
        }),
        await createKubeAction({
          item: new PipelineRunKubeObject(pipelineRun) as unknown as KubeObjectInterface,
          actionCheckName: 'update',
          name: 'Cancel',
          icon: ICONS.CANCEL,
          action: () => {
            handleCloseResourceActionListMenu();
            const copyPipelineRun = { ...pipelineRun };
            copyPipelineRun.spec.status = 'Cancelled';
            PipelineRunKubeObject.apiEndpoint.put(copyPipelineRun);
          },
          disabled: {
            status: !isInProgress,
            reason: 'PipelineRun is no longer in progress',
          },
        }),
        await createKubeAction({
          item: new PipelineRunKubeObject(pipelineRun) as unknown as KubeObjectInterface,
          actionCheckName: 'delete',
          name: RESOURCE_ACTIONS.DELETE,
          icon: ICONS.BUCKET,
          action: () => {
            handleCloseResourceActionListMenu();
            PipelineRunKubeObject.apiEndpoint.delete(
              pipelineRun.metadata.namespace,
              pipelineRun.metadata.name
            );
            onDelete();
          },
        }),
      ];
    }
  }, [
    _pipelineRun,
    variant,
    isInProgress,
    enqueueSnackbar,
    closeSnackbar,
    onDelete,
    handleCloseResourceActionListMenu,
  ]);

  const [actions, setActions] = React.useState([]);

  React.useEffect(() => {
    getActions().then((actions) => {
      if (actions.length === 0) {
        return;
      }

      setActions(actions);
    });
  }, [getActions]);

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
