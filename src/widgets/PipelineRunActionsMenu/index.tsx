import { Router } from '@kinvolk/headlamp-plugin/lib';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { Snackbar } from '../../components/Snackbar';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../k8s/groups/Tekton/PipelineRun/constants';
import { createRerunPipelineRunInstance } from '../../k8s/groups/Tekton/PipelineRun/utils/createRerunPipelineRunInstance';
import { routePipelineRunDetails } from '../../pages/pipeline-details/route';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

    const createGoToRoute = (params: any) =>
      Router.createRouteURL(routePipelineRunDetails.path, params);

    return [
      createKubeAction({
        name: 'Run again',
        icon: ICONS.REDO,
        disabled: {
          status: permissions.create === false,
          reason: 'You do not have permission to create PipelineRun',
        },
        action: () => {
          if (variant === ACTION_MENU_TYPES.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

          const newPipelineRun = createRerunPipelineRunInstance(pipelineRun);

          PipelineRunKubeObject.apiEndpoint.post(newPipelineRun);

          enqueueSnackbar('The PipelineRun is successfully rerun.', {
            persist: true,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            content: (key, message) => (
              <Snackbar
                text={String(message)}
                handleClose={() => closeSnackbar(key)}
                pushLocation={() =>
                  history.push(
                    createGoToRoute({
                      namespace: newPipelineRun.metadata.namespace || getDefaultNamespace(),
                      name: newPipelineRun.metadata.name,
                    })
                  )
                }
                variant="success"
              />
            ),
          });
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
                if (variant === ACTION_MENU_TYPES.MENU && handleCloseResourceActionListMenu) {
                  handleCloseResourceActionListMenu();
                }

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
  }, [
    _pipelineRun,
    variant,
    isInProgress,
    permissions.create,
    permissions.update,
    permissions.delete,
    enqueueSnackbar,
    closeSnackbar,
    history,
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
