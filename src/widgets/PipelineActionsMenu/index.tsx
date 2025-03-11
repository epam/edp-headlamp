import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { Snackbar } from '../../components/Snackbar';
import { ACTION_MENU_TYPE } from '../../constants/actionMenuTypes';
import { CRUD_TYPE } from '../../constants/crudTypes';
import { RESOURCE_ACTION } from '../../constants/resourceActions';
import { useResourceCRUDMutation } from '../../hooks/useResourceCRUDMutation';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { PipelineKubeObjectInterface } from '../../k8s/groups/Tekton/Pipeline/types';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { createPipelineRunInstanceFromPipeline } from '../../k8s/groups/Tekton/PipelineRun/utils/createPipelineRunInstanceFromPipeline';
import { routePipelineRunDetails } from '../../pages/pipelines/pages/pipeline-run-details/route';
import { createResourceAction } from '../../utils/actions/createResourceAction';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { CustomActionsInlineList } from './components/CustomActionsInlineList';
import { PipelineActionsMenuProps } from './types';

export const PipelineActionsMenu = ({
  variant,
  data: { pipeline: _pipeline },
  anchorEl,
  handleCloseResourceActionListMenu,
  permissions,
}: PipelineActionsMenuProps) => {
  const pipelineRunCreateMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    typeof CRUD_TYPE.CREATE
  >('pipelineCreateMutation', PipelineRunKubeObject, CRUD_TYPE.CREATE, {
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
    const pipeline = { ..._pipeline };
    delete pipeline.actionType;

    if (!pipeline) {
      return [];
    }

    return [
      createResourceAction({
        type: RESOURCE_ACTION.CREATE,
        label: 'Build with params',
        icon: ICONS.SETTINGS_REDO,
        item: pipeline,
        disabled: {
          status: !permissions?.create?.PipelineRun.allowed,
          reason: permissions?.create?.PipelineRun.reason,
        },
        callback: (pipeline: PipelineKubeObjectInterface) => {
          const newPipelineRun = createPipelineRunInstanceFromPipeline(pipeline);
          handleOpenEditor(newPipelineRun);
          handleCloseResourceActionListMenu();
        },
      }),
    ];
  }, [
    _pipeline,
    permissions?.create?.PipelineRun.allowed,
    permissions?.create?.PipelineRun.reason,
    handleCloseResourceActionListMenu,
  ]);

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
        <CustomActionsInlineList actions={actions} permissions={permissions} />
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
