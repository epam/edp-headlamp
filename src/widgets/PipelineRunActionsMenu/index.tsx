import { Router } from '@kinvolk/headlamp-plugin/lib';
import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
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
import { CustomActionsInlineList } from './components/CustomActionsInlineList';
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

  const createGoToRoute = (params: any) =>
    Router.createRouteURL(routePipelineRunDetails.path, params);

  const [editor, setEditor] = React.useState<{
    open: boolean;
    data: KubeObjectInterface | undefined;
  }>({
    open: false,
    data: undefined,
  });

  const handleOpenEditor = (data: KubeObjectInterface) => {
    setEditor({ open: true, data });
  };

  const handleCloseEditor = () => {
    setEditor({ open: false, data: undefined });
  };

  const handleEditorSave = (data: KubeObjectInterface[]) => {
    const [item] = data;

    if (variant === ACTION_MENU_TYPES.MENU && handleCloseResourceActionListMenu) {
      handleCloseResourceActionListMenu();
    }

    PipelineRunKubeObject.apiEndpoint.post(item);

    enqueueSnackbar('The PipelineRun is successfully run.', {
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
                namespace: item.metadata.namespace || getDefaultNamespace(),
                name: item.metadata.name,
              })
            )
          }
          variant="success"
        />
      ),
    });

    handleCloseEditor();
  };

  const actions = React.useMemo(() => {
    const pipelineRun = { ..._pipelineRun };
    delete pipelineRun.actionType;

    if (!pipelineRun) {
      return [];
    }

    return [
      createKubeAction({
        name: 'Run again',
        icon: ICONS.REDO,
        disabled: {
          status: !permissions.create.PipelineRun.allowed,
          reason: permissions.create.PipelineRun.reason,
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
      createKubeAction({
        name: 'Run with params',
        icon: ICONS.SETTINGS_REDO,
        disabled: {
          status: !permissions.create.PipelineRun.allowed,
          reason: permissions.create.PipelineRun.reason,
        },
        action: () => {
          const newPipelineRun = createRerunPipelineRunInstance(pipelineRun);
          handleOpenEditor(newPipelineRun);
          handleCloseResourceActionListMenu();
        },
      }),
      ...(isInProgress
        ? [
            createKubeAction({
              name: 'Stop run',
              icon: ICONS.CANCEL,
              disabled: {
                status: !permissions.update.PipelineRun.allowed || !isInProgress,
                reason: !permissions.update.PipelineRun.allowed
                  ? permissions.update.PipelineRun.reason
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
          status: !permissions.delete.PipelineRun.allowed,
          reason: permissions.delete.PipelineRun.reason,
        },
        action: () => {
          if (variant === ACTION_MENU_TYPES.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

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

  const groupActions = actions.slice(0, 2);
  const inlineActions = actions.slice(2);

  return (
    <>
      {editor.open && editor.data && (
        <EditorDialog
          open={editor.open}
          item={editor.data}
          onClose={handleCloseEditor}
          onSave={handleEditorSave}
        />
      )}
      {variant === ACTION_MENU_TYPES.INLINE ? (
        <CustomActionsInlineList
          groupActions={groupActions}
          inlineActions={inlineActions}
          permissions={permissions}
        />
      ) : variant === ACTION_MENU_TYPES.MENU && anchorEl ? (
        <ActionsMenuList
          actions={actions}
          anchorEl={anchorEl}
          handleCloseActionsMenu={handleCloseResourceActionListMenu}
        />
      ) : null}
    </>
  );
};
