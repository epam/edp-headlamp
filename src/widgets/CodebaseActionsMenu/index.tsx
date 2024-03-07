import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../CreateEditCodebase/constants';
import { CreateEditCodebaseDialogForwardedProps } from '../CreateEditCodebase/types';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../DeleteKubeObject/types';
import { CodebaseCDPipelineConflictError } from './components/CodebaseCDPipelineConflictError';
import { useConflictedCDPipeline } from './hooks/useConflictedCDPipeline';
import { CodebaseActionsMenuProps } from './types';

export const CodebaseActionsMenu = ({
  backRoute,
  variant,
  data: { codebaseData },
  anchorEl,
  handleCloseResourceActionListMenu,
}: CodebaseActionsMenuProps) => {
  const { setDialog } = useDialogContext();

  const conflictedCDPipeline = useConflictedCDPipeline(codebaseData);

  const onBeforeSubmit = React.useCallback(
    async (setErrorTemplate, setLoadingActive) => {
      setLoadingActive(true);
      if (!conflictedCDPipeline) {
        setLoadingActive(false);
        return;
      }

      setErrorTemplate(
        <CodebaseCDPipelineConflictError
          conflictedCDPipeline={conflictedCDPipeline}
          codebase={codebaseData}
        />
      );
      setLoadingActive(false);
    },
    [conflictedCDPipeline, codebaseData]
  );

  const createEditCodebaseDialogForwardedProps: CreateEditCodebaseDialogForwardedProps = {
    codebaseData: codebaseData,
    mode: FORM_MODES.EDIT,
  };

  const deleteKubeObjectDialogForwardedProps: DeleteKubeObjectDialogForwardedProps = {
    objectName: codebaseData?.metadata?.name,
    kubeObject: EDPCodebaseKubeObject,
    kubeObjectData: codebaseData,
    description: `Confirm the deletion of the codebase with all its components`,
    onBeforeSubmit,
    backRoute,
  };

  return variant === ACTION_MENU_TYPES.INLINE ? (
    <ActionsInlineList
      actions={[
        createKubeAction({
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          action: () => {
            setDialog({
              modalName: CREATE_EDIT_CODEBASE_DIALOG_NAME,
              forwardedProps: createEditCodebaseDialogForwardedProps,
            });
          },
        }),
        createKubeAction({
          name: RESOURCE_ACTIONS.DELETE,
          icon: ICONS.BUCKET,
          action: () => {
            setDialog({
              modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
              forwardedProps: deleteKubeObjectDialogForwardedProps,
            });
          },
        }),
      ]}
    />
  ) : variant === ACTION_MENU_TYPES.MENU ? (
    <ActionsMenuList
      actions={[
        createKubeAction({
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          action: () => {
            handleCloseResourceActionListMenu();
            setDialog({
              modalName: CREATE_EDIT_CODEBASE_DIALOG_NAME,
              forwardedProps: createEditCodebaseDialogForwardedProps,
            });
          },
        }),
        createKubeAction({
          name: RESOURCE_ACTIONS.DELETE,
          icon: ICONS.BUCKET,
          action: () => {
            handleCloseResourceActionListMenu();
            setDialog({
              modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
              forwardedProps: deleteKubeObjectDialogForwardedProps,
            });
          },
        }),
      ]}
      anchorEl={anchorEl}
    />
  ) : null;
};
