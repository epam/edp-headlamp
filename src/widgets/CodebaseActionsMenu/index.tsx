import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Typography } from '@mui/material';
import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { routeEDPCDPipelineDetails } from '../../pages/edp-cdpipeline-details/route';
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
            routeName={routeEDPCDPipelineDetails.path}
            params={{
              name: conflictedCDPipeline.metadata.name,
              namespace: conflictedCDPipeline.metadata.namespace,
            }}
          >
            {conflictedCDPipeline.metadata.name}
          </Link>
        </div>
        <Typography component={'span'}> CD Pipeline</Typography>
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

  const getActions = React.useCallback(async () => {
    if (!codebaseData) {
      return [];
    }

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

    if (variant === ACTION_MENU_TYPES.INLINE) {
      return [
        await createKubeAction({
          item: new EDPCodebaseKubeObject(codebaseData) as unknown as KubeObjectInterface,
          name: RESOURCE_ACTIONS.EDIT,
          actionCheckName: 'update',
          icon: ICONS.PENCIL,
          action: () => {
            setDialog({
              modalName: CREATE_EDIT_CODEBASE_DIALOG_NAME,
              forwardedProps: createEditCodebaseDialogForwardedProps,
            });
          },
        }),
        await createKubeAction({
          item: new EDPCodebaseKubeObject(codebaseData) as unknown as KubeObjectInterface,
          name: RESOURCE_ACTIONS.DELETE,
          actionCheckName: 'delete',
          icon: ICONS.BUCKET,
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
        await createKubeAction({
          item: new EDPCodebaseKubeObject(codebaseData) as unknown as KubeObjectInterface,
          name: RESOURCE_ACTIONS.EDIT,
          actionCheckName: 'update',
          icon: ICONS.PENCIL,
          action: () => {
            handleCloseResourceActionListMenu();
            setDialog({
              modalName: CREATE_EDIT_CODEBASE_DIALOG_NAME,
              forwardedProps: createEditCodebaseDialogForwardedProps,
            });
          },
        }),
        await createKubeAction({
          item: new EDPCodebaseKubeObject(codebaseData) as unknown as KubeObjectInterface,
          name: RESOURCE_ACTIONS.DELETE,
          actionCheckName: 'delete',
          icon: ICONS.BUCKET,
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
    setDialog,
    variant,
  ]);

  const [actions, setActions] = React.useState([]);

  React.useEffect(() => {
    getActions().then((actions) => {
      if (actions.length === 0) {
        return;
      }

      setActions(actions);
    });
  }, [actions.length, getActions]);

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
