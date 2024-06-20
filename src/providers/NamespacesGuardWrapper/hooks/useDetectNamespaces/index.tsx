import { Router, Utils } from '@kinvolk/headlamp-plugin/lib';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Snackbar } from '../../../../components/Snackbar';
import { LOCAL_STORAGE_SERVICE } from '../../../../services/local-storage';
import { useDialogContext } from '../../../Dialog/hooks';
import { NAMESPACES_GUARD_DIALOG_NAME } from '../../components/NamespacesGuard/constants';
import { NamespacesGuardDialogForwardedProps } from '../../components/NamespacesGuard/types';

const LOCAL_STORAGE_KEY = 'namespacesGuardDialogClosed';

export const useDetectNamespaces = (setKey: React.Dispatch<React.SetStateAction<string>>) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const location = useLocation();
  const { setDialog } = useDialogContext();

  const onDialogClose = React.useCallback(() => {
    LOCAL_STORAGE_SERVICE.setItem(LOCAL_STORAGE_KEY, 'true');
  }, []);

  React.useEffect(() => {
    const clusterName = Utils.getCluster();
    const settingsRoute = Router.createRouteURL('settingsCluster', { cluster: clusterName });
    const lsNamespaceItem = localStorage.getItem(`cluster_settings.${clusterName}`);
    const parsedLsNamespaceItem = JSON.parse(lsNamespaceItem);

    const defaultNamespaceIsSet = !!lsNamespaceItem && !!parsedLsNamespaceItem?.defaultNamespace;
    const allowedNamespacesIsSet =
      !!lsNamespaceItem && !!parsedLsNamespaceItem?.allowedNamespaces?.length;
    const dialogIsClosedOnce = LOCAL_STORAGE_SERVICE.getItem(LOCAL_STORAGE_KEY) === 'true';

    const errorMessage = (() => {
      if (!defaultNamespaceIsSet && !allowedNamespacesIsSet) {
        return 'Default namespace and allowed namespaces are unset.';
      }
      if (!defaultNamespaceIsSet) {
        return 'Default namespace is unset.';
      }
      if (!allowedNamespacesIsSet) {
        return 'Allowed namespaces are unset.';
      }
      return false;
    })();

    closeSnackbar();

    if (defaultNamespaceIsSet && allowedNamespacesIsSet) {
      return;
    }

    if (dialogIsClosedOnce) {
      enqueueSnackbar(errorMessage, {
        autoHideDuration: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        content: (key, message) => (
          <Snackbar text={String(message)} id={String(key)} link={settingsRoute} variant="info" />
        ),
      });
      return;
    }

    const forwardedProps: NamespacesGuardDialogForwardedProps = {
      defaultNamespaceIsSet,
      allowedNamespacesIsSet,
      setKey,
      onDialogClose,
    };

    setDialog({
      modalName: NAMESPACES_GUARD_DIALOG_NAME,
      forwardedProps,
    });
  }, [location, closeSnackbar, enqueueSnackbar, history, onDialogClose, setDialog, setKey]);
};
