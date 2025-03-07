import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { Snackbar } from '../../components/Snackbar';
import { ACTION_MENU_TYPE } from '../../constants/actionMenuTypes';
import { CRUD_TYPE } from '../../constants/crudTypes';
import { RESOURCE_ACTION } from '../../constants/resourceActions';
import { useResourceCRUDMutation } from '../../hooks/useResourceCRUDMutation';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../k8s/groups/Tekton/PipelineRun/constants';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { createRerunPipelineRunInstance } from '../../k8s/groups/Tekton/PipelineRun/utils/createRerunPipelineRunInstance';
import { routePipelineRunDetails } from '../../pages/pipeline-details/route';
import { createResourceAction } from '../../utils/actions/createResourceAction';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
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

  const status = PipelineRunKubeObject.parseStatusReason(_pipelineRun)?.toLowerCase();

  const pipelineRunCreateMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    CRUD_TYPE.CREATE
  >('pipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPE.CREATE, {
    createCustomMessages: (item) => ({
      onMutate: {
        message: 'Creating a new PipelineRun',
      },
      onError: {
        message: 'Failed to create a new PipelineRun',
      },
      onSuccess: {
        message: 'PipelineRun created successfully',
        options: {
          autoHideDuration: 8000,
          content: (key, message) => (
            <Snackbar
              snackbarKey={key}
              text={String(message)}
              pushLocation={{
                href: {
                  routeName: routePipelineRunDetails.path,
                  params: {
                    namespace: item.metadata.namespace || getDefaultNamespace(),
                    name: item.metadata.name,
                  },
                },
                text: 'Check status',
              }}
              variant={'success'}
            />
          ),
        },
      },
    }),
  });

  const pipelineRunEditMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    CRUD_TYPE.EDIT
  >('pipelineRunEditMutation', PipelineRunKubeObject, CRUD_TYPE.EDIT, {
    createCustomMessages: () => ({
      onMutate: {
        message: 'Stopping PipelineRun',
      },
      onError: {
        message: 'Failed to update  PipelineRun',
      },
      onSuccess: {
        message: 'PipelineRun stopped successfully',
      },
    }),
  });

  const pipelineRunDeleteMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    CRUD_TYPE.DELETE
  >('pipelineRunDeleteMutation', PipelineRunKubeObject, CRUD_TYPE.DELETE, {
    createCustomMessages: () => ({
      onMutate: {
        message: 'Deleting PipelineRun',
      },
      onError: {
        message: 'Failed to delete PipelineRun',
      },
      onSuccess: {
        message: 'PipelineRun deleted successfully',
      },
    }),
  });

  const isInProgress =
    status === PIPELINE_RUN_REASON.STARTED || status === PIPELINE_RUN_REASON.RUNNING;

  const onDelete = React.useCallback(() => {
    history.push(backRoute);
  }, [backRoute, history]);

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

    if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
      handleCloseResourceActionListMenu();
    }

    pipelineRunCreateMutation.mutate(item);

    handleCloseEditor();
  };

  const actions = React.useMemo(() => {
    const pipelineRun = { ..._pipelineRun };
    delete pipelineRun.actionType;

    if (!pipelineRun) {
      return [];
    }

    return [
      createResourceAction({
        type: RESOURCE_ACTION.CREATE,
        label: 'Run again',
        icon: ICONS.REDO,
        item: pipelineRun,
        disabled: {
          status: !permissions?.create?.PipelineRun.allowed,
          reason: permissions?.create?.PipelineRun.reason,
        },
        callback: (pipelineRun) => {
          if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

          const newPipelineRun = createRerunPipelineRunInstance(pipelineRun);

          pipelineRunCreateMutation.mutate(newPipelineRun);
        },
      }),
      createResourceAction({
        type: RESOURCE_ACTION.CREATE,
        label: 'Run with params',
        icon: ICONS.SETTINGS_REDO,
        item: pipelineRun,
        disabled: {
          status: !permissions?.create?.PipelineRun.allowed,
          reason: permissions?.create?.PipelineRun.reason,
        },
        callback: (pipelineRun) => {
          const newPipelineRun = createRerunPipelineRunInstance(pipelineRun);
          handleOpenEditor(newPipelineRun);
          handleCloseResourceActionListMenu();
        },
      }),
      ...(isInProgress
        ? [
            createResourceAction({
              type: RESOURCE_ACTION.EDIT,
              label: 'Stop run',
              icon: ICONS.CANCEL,
              item: pipelineRun,
              disabled: {
                status: !permissions?.update?.PipelineRun.allowed || !isInProgress,
                reason: !permissions?.update?.PipelineRun.allowed
                  ? permissions?.update?.PipelineRun.reason
                  : !isInProgress
                  ? 'PipelineRun is no longer in progress'
                  : undefined,
              },
              callback: (pipelineRun) => {
                if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
                  handleCloseResourceActionListMenu();
                }

                const newPipelineRun = { ...pipelineRun };
                newPipelineRun.spec.status = 'Cancelled';

                pipelineRunEditMutation.mutate(newPipelineRun);
              },
            }),
          ]
        : []),
      createResourceAction({
        type: RESOURCE_ACTION.DELETE,
        label: capitalizeFirstLetter(RESOURCE_ACTION.DELETE),
        icon: ICONS.BUCKET,
        item: pipelineRun,
        disabled: {
          status: !permissions?.delete?.PipelineRun.allowed,
          reason: permissions?.delete?.PipelineRun.reason,
        },
        callback: (pipelineRun) => {
          if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

          pipelineRunDeleteMutation.mutate(pipelineRun, {
            onSuccess: onDelete,
          });
        },
      }),
    ];
  }, [
    _pipelineRun,
    permissions?.create?.PipelineRun.allowed,
    permissions?.create?.PipelineRun.reason,
    permissions?.update?.PipelineRun.allowed,
    permissions?.update?.PipelineRun.reason,
    permissions?.delete?.PipelineRun.allowed,
    permissions?.delete?.PipelineRun.reason,
    isInProgress,
    variant,
    handleCloseResourceActionListMenu,
    pipelineRunCreateMutation,
    pipelineRunEditMutation,
    pipelineRunDeleteMutation,
    onDelete,
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
      {variant === ACTION_MENU_TYPE.INLINE ? (
        <CustomActionsInlineList
          groupActions={groupActions}
          inlineActions={inlineActions}
          permissions={permissions}
        />
      ) : variant === ACTION_MENU_TYPE.MENU && anchorEl ? (
        <ActionsMenuList
          actions={actions}
          anchorEl={anchorEl}
          handleCloseActionsMenu={handleCloseResourceActionListMenu}
        />
      ) : null}
    </>
  );
};
