import { Icon } from '@iconify/react';
import { Router, Utils } from '@kinvolk/headlamp-plugin/lib';
import { IconButton, Link, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { LOCAL_STORAGE_SERVICE } from '../../../../services/local-storage';
import { useDialogContext } from '../../../Dialog/hooks';
import { NAMESPACES_GUARD_DIALOG_NAME } from '../../components/NamespacesGuard/constants';
import { NamespacesGuardDialogForwardedProps } from '../../components/NamespacesGuard/types';

const LOCAL_STORAGE_KEY = 'namespacesGuardDialogClosed';

export const useDetectNamespaces = (setKey: React.Dispatch<React.SetStateAction<string>>) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const history = useHistory();
    const { setDialog } = useDialogContext();

    const onDialogClose = React.useCallback(() => {
        LOCAL_STORAGE_SERVICE.setItem(LOCAL_STORAGE_KEY, 'true');
    }, []);

    const clusterName = Utils.getCluster();
    const settingsRoute = Router.createRouteURL('settingsCluster', { cluster: clusterName });
    const lsNamespaceItem = localStorage.getItem(`cluster_settings.${clusterName}`);
    const parsedLsNamespaceItem = JSON.parse(lsNamespaceItem);

    const defaultNamespaceIsSet = !!lsNamespaceItem && !!parsedLsNamespaceItem?.defaultNamespace;
    const allowedNamespacesIsSet =
        !!lsNamespaceItem && !!parsedLsNamespaceItem?.allowedNamespaces?.length;

    const errorMessage = React.useMemo(() => {
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
    }, [defaultNamespaceIsSet, allowedNamespacesIsSet]);

    React.useEffect(() => {
        const dialogIsClosedOnce = LOCAL_STORAGE_SERVICE.getItem(LOCAL_STORAGE_KEY) === 'true';

        if (defaultNamespaceIsSet && allowedNamespacesIsSet) {
            return;
        }

        if (dialogIsClosedOnce) {
            closeSnackbar();
            enqueueSnackbar(
                <Typography>
                    <span>{errorMessage} Navigate to </span>
                    <Link
                        component="button"
                        variant="body2"
                        underline={'always'}
                        onClick={() => {
                            history.push(settingsRoute);
                            closeSnackbar();
                        }}
                    >
                        cluster settings
                    </Link>
                    <span> page</span>
                </Typography>,
                {
                    autoHideDuration: null,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                    action: key => (
                        <IconButton size="small" onClick={() => closeSnackbar(key)}>
                            <Icon icon={ICONS.CROSS} color={'grey'} />
                        </IconButton>
                    ),
                }
            );
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
    }, [
        allowedNamespacesIsSet,
        closeSnackbar,
        defaultNamespaceIsSet,
        enqueueSnackbar,
        errorMessage,
        history,
        onDialogClose,
        setDialog,
        setKey,
        settingsRoute,
    ]);
};
