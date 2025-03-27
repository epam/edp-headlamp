import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { Snackbar } from '../../components/Snackbar';
import { ACTION_MENU_TYPE } from '../../constants/actionMenuTypes';
import { CRUD_TYPE } from '../../constants/crudTypes';
import { RESOURCE_ACTION } from '../../constants/resourceActions';
import { useResourceCRUDMutation } from '../../hooks/useResourceCRUDMutation';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { PipelineKubeObject } from '../../k8s/groups/Tekton/Pipeline';
import { PIPELINE_LABEL_SELECTOR_TRIGGER_TEMPLATE } from '../../k8s/groups/Tekton/Pipeline/labels';
import { PipelineKubeObjectInterface } from '../../k8s/groups/Tekton/Pipeline/types';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { createPipelineRunInstanceFromPipeline } from '../../k8s/groups/Tekton/PipelineRun/utils/createPipelineRunInstanceFromPipeline';
import { routePipelineRunDetails } from '../../pages/pipelines/pages/pipeline-run-details/route';
import { createResourceAction } from '../../utils/actions/createResourceAction';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { PipelineActionsMenuProps } from './types';

export const PipelineActionsMenu = ({
  variant,
  data: { pipeline: _pipeline, triggerTemplates },
  anchorEl,
  handleCloseResourceActionListMenu,
  permissions,
}: PipelineActionsMenuProps) => {
  const pipelineTriggerTemplate =
    _pipeline.metadata?.labels?.[PIPELINE_LABEL_SELECTOR_TRIGGER_TEMPLATE];

  const pipelineTriggerTemplateByName =
    pipelineTriggerTemplate && triggerTemplates !== null
      ? (triggerTemplates || []).find(
          (triggerTemplate) => triggerTemplate.metadata.name === pipelineTriggerTemplate
        )
      : null;

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

  const pipelineEditMutation = useResourceCRUDMutation<
    PipelineKubeObjectInterface,
    typeof CRUD_TYPE.EDIT
  >('pipelineEditMutation', PipelineKubeObject, CRUD_TYPE.EDIT);

  const [createEditor, setCreateEditor] = React.useState<{
    open: boolean;
    data: KubeObjectInterface | undefined;
  }>({
    open: false,
    data: undefined,
  });

  const handleOpenCreateEditor = (data: KubeObjectInterface) => {
    setCreateEditor({ open: true, data });
  };

  const handleCloseCreateEditor = () => {
    setCreateEditor({ open: false, data: undefined });
  };

  const [editEditor, setEditEditor] = React.useState<{
    open: boolean;
    data: KubeObjectInterface | undefined;
  }>({
    open: false,
    data: undefined,
  });

  const handleOpenEditEditor = (data: KubeObjectInterface) => {
    setEditEditor({ open: true, data });
  };

  const handleCloseEditEditor = () => {
    setEditEditor({ open: false, data: undefined });
  };

  const handleCreateEditorSave = (data: KubeObjectInterface[]) => {
    const [item] = data;

    if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
      handleCloseResourceActionListMenu();
    }

    pipelineRunCreateMutation.mutate(item);

    handleCloseCreateEditor();
  };

  const handleEditEditorSave = (data: KubeObjectInterface[]) => {
    const [item] = data;

    if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
      handleCloseResourceActionListMenu();
    }

    pipelineEditMutation.mutate(item);

    handleCloseEditEditor();
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
        label: 'Run with params',
        icon: ICONS.PLAY,
        item: pipeline,
        disabled: {
          status: !permissions.create.PipelineRun.allowed,
          reason: permissions.create.PipelineRun.reason,
        },
        callback: (pipeline: PipelineKubeObjectInterface) => {
          if (!pipelineTriggerTemplateByName) {
            return;
          }

          const newPipelineRun = createPipelineRunInstanceFromPipeline(
            pipelineTriggerTemplateByName,
            pipeline
          );
          handleOpenCreateEditor(newPipelineRun);
          handleCloseResourceActionListMenu && handleCloseResourceActionListMenu();
        },
      }),
      createResourceAction({
        type: RESOURCE_ACTION.EDIT,
        label: 'Edit',
        icon: ICONS.PENCIL,
        item: pipeline,
        disabled: {
          status: !permissions.update.Pipeline.allowed,
          reason: permissions.update.Pipeline.reason,
        },
        callback: (pipeline: PipelineKubeObjectInterface) => {
          handleOpenEditEditor(pipeline);
          handleCloseResourceActionListMenu && handleCloseResourceActionListMenu();
        },
      }),
    ];
  }, [
    _pipeline,
    permissions.create.PipelineRun.allowed,
    permissions.create.PipelineRun.reason,
    permissions.update.Pipeline.allowed,
    permissions.update.Pipeline.reason,
    pipelineTriggerTemplateByName,
    handleCloseResourceActionListMenu,
  ]);

  return (
    <>
      {createEditor.open && createEditor.data && (
        <EditorDialog
          open={createEditor.open}
          item={createEditor.data}
          onClose={handleCloseCreateEditor}
          onSave={handleCreateEditorSave}
        />
      )}
      {editEditor.open && editEditor.data && (
        <EditorDialog
          open={editEditor.open}
          item={editEditor.data}
          onClose={handleCloseEditEditor}
          onSave={handleEditEditorSave}
        />
      )}
      {variant === ACTION_MENU_TYPE.INLINE ? (
        <ActionsInlineList actions={actions} />
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
