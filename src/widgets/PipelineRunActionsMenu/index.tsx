import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { Snackbar } from '../../components/Snackbar';
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
  permissions,
}: PipelineRunActionsMenuProps) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const status = PipelineRunKubeObject.parseStatusReason(_pipelineRun)?.toLowerCase();

  const isInProgress =
    status === PIPELINE_RUN_REASON.STARTED || status === PIPELINE_RUN_REASON.RUNNING;

  const onDelete = React.useCallback(() => {
    history.push(backRoute);
  }, [backRoute, history]);

  const actions = React.useMemo(() => {
    const pipelineRun = { ..._pipelineRun };
    delete pipelineRun.actionType;

    if (!pipelineRun) {
      return [];
    }

    if (variant === ACTION_MENU_TYPES.INLINE) {
      return [
        ...(!isInProgress
          ? [
              createKubeAction({
                name: 'Run again',
                icon: ICONS.REDO,
                disabled: {
                  status: permissions.create === false,
                  reason: 'You do not have permission to create PipelineRun',
                },
                action: () => {
                  const newPipelineRun = createRerunPipelineRunInstance(pipelineRun);

                  PipelineRunKubeObject.apiEndpoint.post(newPipelineRun);

                  enqueueSnackbar('The PipelineRun is rerun', {
                    autoHideDuration: 2000,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    content: (key, message) => (
                      <Snackbar text={String(message)} id={String(key)} variant="info" />
                    ),
                  });
                },
                isTextButton: true,
              }),
            ]
          : []),
        ...(isInProgress
          ? [
              createKubeAction({
                name: 'Stop run',
                icon: 'ph:stop-fill',
                action: () => {
                  const copyPipelineRun = { ...pipelineRun };
                  copyPipelineRun.spec.status = 'Cancelled';
                  PipelineRunKubeObject.apiEndpoint.put(copyPipelineRun);
                  enqueueSnackbar('The PipelineRun is cancelled', {
                    autoHideDuration: 2000,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    content: (key, message) => (
                      <Snackbar text={String(message)} id={String(key)} variant="info" />
                    ),
                  });
                },
                disabled: {
                  status: permissions.update === false,
                  reason:
                    permissions.update === false
                      ? 'You do not have permission to update PipelineRun'
                      : !isInProgress
                      ? 'PipelineRun is no longer in progress'
                      : undefined,
                },
                isTextButton: true,
              }),
            ]
          : []),
        ,
        createKubeAction({
          name: RESOURCE_ACTIONS.DELETE,
          icon: ICONS.BUCKET,
          disabled: {
            status: permissions.delete === false,
            reason: 'You do not have permission to delete PipelineRun',
          },
          action: () => {
            PipelineRunKubeObject.apiEndpoint.delete(
              pipelineRun.metadata.namespace,
              pipelineRun.metadata.name
            );
            enqueueSnackbar('The PipelineRun is deleted', {
              autoHideDuration: 2000,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              content: (key, message) => (
                <Snackbar text={String(message)} id={String(key)} variant="info" />
              ),
            });
            onDelete();
          },
        }),
      ];
    } else {
      return [
        createKubeAction({
          name: 'Run again',
          icon: ICONS.REDO,
          disabled: {
            status: permissions.create === false,
            reason: 'You do not have permission to create PipelineRun',
          },
          action: () => {
            handleCloseResourceActionListMenu();
            PipelineRunKubeObject.apiEndpoint.post(createRerunPipelineRunInstance(pipelineRun));
          },
        }),
        ...(isInProgress
          ? [
              createKubeAction({
                name: 'Stop run',
                icon: ICONS.CANCEL,
                disabled: {
                  status: permissions.update === false || !isInProgress,
                  reason:
                    permissions.update === false
                      ? 'You do not have permission to update PipelineRun'
                      : !isInProgress
                      ? 'PipelineRun is no longer in progress'
                      : undefined,
                },
                action: () => {
                  handleCloseResourceActionListMenu();
                  const copyPipelineRun = { ...pipelineRun };
                  copyPipelineRun.spec.status = 'Cancelled';
                  PipelineRunKubeObject.apiEndpoint.put(copyPipelineRun);
                },
              }),
            ]
          : []),
        createKubeAction({
          name: RESOURCE_ACTIONS.DELETE,
          icon: ICONS.BUCKET,
          disabled: {
            status: permissions.delete === false,
            reason: 'You do not have permission to delete PipelineRun',
          },
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
    permissions.create,
    permissions.update,
    permissions.delete,
    isInProgress,
    enqueueSnackbar,
    onDelete,
    handleCloseResourceActionListMenu,
  ]);

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
