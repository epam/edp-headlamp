import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPE } from '../../constants/actionMenuTypes';
import { CRUD_TYPE } from '../../constants/crudTypes';
import { RESOURCE_ACTION } from '../../constants/resourceActions';
import { useResourceCRUDMutation } from '../../hooks/useResourceCRUDMutation';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { TaskKubeObject } from '../../k8s/groups/Tekton/Task';
import { TaskKubeObjectInterface } from '../../k8s/groups/Tekton/Task/types';
import { createResourceAction } from '../../utils/actions/createResourceAction';
import { TaskActionsMenuProps } from './types';

export const TaskActionsMenu = ({
  variant,
  data: { task: _task },
  anchorEl,
  handleCloseResourceActionListMenu,
  permissions,
}: TaskActionsMenuProps) => {
  const taskEditMutation = useResourceCRUDMutation<TaskKubeObjectInterface, typeof CRUD_TYPE.EDIT>(
    'taskEditMutation',
    TaskKubeObject,
    CRUD_TYPE.EDIT
  );

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

  const handleEditEditorSave = (data: KubeObjectInterface[]) => {
    const [item] = data;

    if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
      handleCloseResourceActionListMenu();
    }

    taskEditMutation.mutate(item);

    handleCloseEditEditor();
  };

  const actions = React.useMemo(() => {
    const task = { ..._task };
    delete task.actionType;

    if (!task) {
      return [];
    }

    return [
      createResourceAction({
        type: RESOURCE_ACTION.EDIT,
        label: 'Edit',
        icon: ICONS.PENCIL,
        item: task,
        disabled: {
          status: !permissions?.update?.Task.allowed,
          reason: permissions?.update?.Task.reason,
        },
        callback: (task: TaskKubeObjectInterface) => {
          handleOpenEditEditor(task);
          handleCloseResourceActionListMenu();
        },
      }),
    ];
  }, [
    _task,
    permissions?.update?.Task.allowed,
    permissions?.update?.Task.reason,
    handleCloseResourceActionListMenu,
  ]);

  return (
    <>
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
