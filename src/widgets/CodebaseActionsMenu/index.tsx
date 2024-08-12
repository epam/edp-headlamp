import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@mui/material';
import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { routeCDPipelineDetails } from '../../pages/cdpipeline-details/route';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../CreateEditCodebase/constants';
import { CreateEditCodebaseDialogForwardedProps } from '../CreateEditCodebase/types';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../DeleteKubeObject/types';
import { useDeletionConflict } from './hooks/useDeletionConflict';
import { useStyles } from './styles';
import { CodebaseActionsMenuProps } from './types';

export const CodebaseActionsMenu = ({
  backRoute,
  variant,
  data: { codebaseData },
  anchorEl,
  handleCloseResourceActionListMenu,
  permissions,
}: CodebaseActionsMenuProps) => {
  const classes = useStyles();

  const { setDialog } = useDialogContext();

  const conflictedCDPipeline = useDeletionConflict(codebaseData);

  const ErrorMessage = React.useMemo(() => {
    if (!conflictedCDPipeline || !codebaseData) {
      return null;
    }

    return (
      <div className={classes.message}>
        <Typography component={'span'}>
          {capitalizeFirstLetter(codebaseData.spec.type)} {codebaseData.metadata.name} is used in
        </Typography>
        <div className={classes.conflictEntityName}>
          <Link
            routeName={routeCDPipelineDetails.path}
            params={{
              name: conflictedCDPipeline.metadata.name,
              namespace: conflictedCDPipeline.metadata.namespace,
            }}
          >
            {conflictedCDPipeline.metadata.name}
          </Link>
        </div>
        <Typography component={'span'}> Deployment Flow</Typography>
      </div>
    );
  }, [classes, codebaseData, conflictedCDPipeline]);

  const onBeforeSubmit = React.useCallback(
    async (setErrorTemplate, setLoadingActive) => {
      setLoadingActive(true);
      if (!conflictedCDPipeline) {
        setLoadingActive(false);
        return;
      }

      setErrorTemplate(ErrorMessage);
      setLoadingActive(false);
    },
    [conflictedCDPipeline, ErrorMessage]
  );

  const actions = React.useMemo(() => {
    if (!codebaseData) {
      return [];
    }

    const createEditCodebaseDialogForwardedProps: CreateEditCodebaseDialogForwardedProps = {
      codebaseData: codebaseData,
      mode: FORM_MODES.EDIT,
    };

    const deleteKubeObjectDialogForwardedProps: DeleteKubeObjectDialogForwardedProps = {
      objectName: codebaseData?.metadata?.name,
      kubeObject: CodebaseKubeObject,
      kubeObjectData: codebaseData,
      description: `Confirm the deletion of the codebase with all its components`,
      onBeforeSubmit,
      backRoute,
    };

    if (variant === ACTION_MENU_TYPES.INLINE) {
      return [
        createKubeAction({
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          disabled: {
            status: permissions.update === false,
            reason: 'You do not have permission to update Codebase',
          },
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
          disabled: {
            status: permissions.delete === false,
            reason: 'You do not have permission to delete Codebase',
          },
          action: () => {
            setDialog({
              modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
              forwardedProps: deleteKubeObjectDialogForwardedProps,
            });
          },
        }),
      ];
    } else {
      return [
        createKubeAction({
          name: RESOURCE_ACTIONS.EDIT,
          icon: ICONS.PENCIL,
          disabled: {
            status: permissions.update === false,
            reason: 'You do not have permission to update Codebase',
          },
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
          disabled: {
            status: permissions.delete === false,
            reason: 'You do not have permission to delete Codebase',
          },
          action: () => {
            handleCloseResourceActionListMenu();
            setDialog({
              modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
              forwardedProps: deleteKubeObjectDialogForwardedProps,
            });
          },
        }),
      ];
    }
  }, [
    backRoute,
    codebaseData,
    handleCloseResourceActionListMenu,
    onBeforeSubmit,
    permissions.delete,
    permissions.update,
    setDialog,
    variant,
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
