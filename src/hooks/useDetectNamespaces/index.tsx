import { Icon } from '@iconify/react';
import { Router, Utils } from '@kinvolk/headlamp-plugin/lib';
import { IconButton, Link, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICONS } from '../../icons/iconify-icons-mapping';

export const useDetectNamespaces = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const history = useHistory();

    React.useEffect(() => {
        const clusterName = Utils.getCluster();
        const settingsRoute = Router.createRouteURL('settingsCluster', { cluster: clusterName });
        closeSnackbar();
        const lsNamespaceItem = localStorage.getItem(`cluster_settings.${clusterName}`);

        const parsedLsNamespaceItem = JSON.parse(lsNamespaceItem);

        if (
            lsNamespaceItem &&
            parsedLsNamespaceItem?.defaultNamespace &&
            parsedLsNamespaceItem?.allowedNamespaces &&
            parsedLsNamespaceItem?.allowedNamespaces.length
        ) {
            return;
        }

        if (!lsNamespaceItem && !parsedLsNamespaceItem?.defaultNamespace) {
            enqueueSnackbar(
                <Typography>
                    <span>Default namespace is unset. Navigate to </span>
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
                        horizontal: 'left',
                    },
                    action: key => (
                        <IconButton size="small" onClick={() => closeSnackbar(key)}>
                            <Icon icon={ICONS.CROSS} />
                        </IconButton>
                    ),
                }
            );
        } else if (
            !lsNamespaceItem ||
            !parsedLsNamespaceItem?.allowedNamespaces ||
            !parsedLsNamespaceItem?.allowedNamespaces.length
        ) {
            enqueueSnackbar(
                <Typography>
                    <span>Allowed namespaces are unset. Navigate to </span>
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
                        horizontal: 'left',
                    },
                    action: key => (
                        <IconButton size="small" onClick={() => closeSnackbar(key)}>
                            <Icon icon={ICONS.CROSS} />
                        </IconButton>
                    ),
                }
            );
        }
    }, [closeSnackbar, enqueueSnackbar, history]);
};
