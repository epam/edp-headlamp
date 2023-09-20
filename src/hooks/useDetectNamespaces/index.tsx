import { Icon } from '@iconify/react';
import { Router, Utils } from '@kinvolk/headlamp-plugin/lib';
import { IconButton, Link, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICONS } from '../../icons/iconify-icons-mapping';

const clusterName = Utils.getCluster();

const settingsRoute = Router.createRouteURL('settingsCluster', { cluster: clusterName });

export const useDetectNamespaces = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const history = useHistory();

    React.useEffect(() => {
        const lsNamespaceObject = JSON.parse(
            localStorage.getItem(`cluster_settings.${clusterName}`) || '{}'
        );

        if (
            !!lsNamespaceObject?.defaultNamespace &&
            !!lsNamespaceObject?.allowedNamespaces &&
            !!lsNamespaceObject?.allowedNamespaces.length
        ) {
            return;
        }

        if (!lsNamespaceObject?.defaultNamespace) {
            closeSnackbar();
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
                    variant: 'warning',
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
            !lsNamespaceObject?.allowedNamespaces ||
            !lsNamespaceObject?.allowedNamespaces.length
        ) {
            closeSnackbar();
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
                    variant: 'warning',
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
