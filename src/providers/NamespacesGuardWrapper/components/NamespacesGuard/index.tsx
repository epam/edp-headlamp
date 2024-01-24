import { Icon, InlineIcon } from '@iconify/react';
import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { NameValueTable } from '@kinvolk/headlamp-plugin/lib/components/common';
import { ClusterSettings } from '@kinvolk/headlamp-plugin/lib/helpers';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSpecificDialogContext } from '../../../Dialog/hooks';
import { NAMESPACES_GUARD_DIALOG_NAME } from './constants';
import { NamespacesGuardDialogForwardedProps } from './types';
const useStyles = makeStyles((theme) => ({
  chipBox: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    marginTop: theme.spacing(1),
  },
  input: {
    maxWidth: 250,
  },
  blackButton: {
    backgroundColor: theme.palette.sidebarBg,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      opacity: '0.8',
      backgroundColor: theme.palette.sidebarBg,
    },
  },
}));

function isValidNamespaceFormat(namespace: string) {
  // We allow empty strings just because that's the default value in our case.
  if (!namespace) {
    return true;
  }

  // Validates that the namespace is a valid DNS-1123 label and returns a boolean.
  // https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names
  const regex = new RegExp('^[a-z0-9]([-a-z0-9]*[a-z0-9])?$');
  return regex.test(namespace);
}

function storeClusterSettings(clusterName: string, settings: ClusterSettings) {
  if (!clusterName) {
    return;
  }
  localStorage.setItem(`cluster_settings.${clusterName}`, JSON.stringify(settings));
}

function loadClusterSettings(clusterName: string): ClusterSettings {
  if (!clusterName) {
    return {};
  }
  const settings = JSON.parse(localStorage.getItem(`cluster_settings.${clusterName}`) || '{}');
  return settings;
}

// This code contains code from headlamp core
export const NamespacesGuard = () => {
  const cluster = K8s.useCluster();
  const classes = useStyles();
  const theme = useTheme();
  const {
    open,
    forwardedProps: { defaultNamespaceIsSet, allowedNamespacesIsSet, setKey, onDialogClose },
    closeDialog,
  } = useSpecificDialogContext<NamespacesGuardDialogForwardedProps>(NAMESPACES_GUARD_DIALOG_NAME);

  const [defaultNamespace, setDefaultNamespace] = React.useState('');
  const [newAllowedNamespace, setNewAllowedNamespace] = React.useState('');
  const [clusterSettings, setClusterSettings] = React.useState<ClusterSettings | null>(null);

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
    setClusterSettings(!!cluster ? loadClusterSettings(cluster || '') : null);
  }, [cluster]);

  React.useEffect(() => {
    if (clusterSettings?.defaultNamespace !== defaultNamespace) {
      setDefaultNamespace(clusterSettings?.defaultNamespace || '');
    }

    // Avoid re-initializing settings as {} just because the cluster is not yet set.
    if (clusterSettings !== null) {
      storeClusterSettings(cluster || '', clusterSettings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cluster, clusterSettings]);

  React.useEffect(() => {
    let timeoutHandle: NodeJS.Timeout | null = null;

    if (isEditingDefaultNamespace()) {
      // We store the namespace after a timeout.
      timeoutHandle = setTimeout(() => {
        if (isValidNamespaceFormat(defaultNamespace)) {
          storeNewDefaultNamespace(defaultNamespace);
        }
      }, 1000);
    }

    return () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultNamespace]);

  function isEditingDefaultNamespace() {
    return clusterSettings?.defaultNamespace !== defaultNamespace;
  }

  function storeNewAllowedNamespace(namespace: string) {
    setNewAllowedNamespace('');
    setClusterSettings((settings: ClusterSettings | null) => {
      const newSettings = { ...(settings || {}) };
      newSettings.allowedNamespaces = newSettings.allowedNamespaces || [];
      newSettings.allowedNamespaces.push(namespace);
      // Sort and avoid duplicates
      newSettings.allowedNamespaces = [...new Set(newSettings.allowedNamespaces)].sort();
      return newSettings;
    });
  }

  function storeNewDefaultNamespace(namespace: string) {
    let actualNamespace = namespace;
    if (namespace === 'default') {
      actualNamespace = '';
      setDefaultNamespace(actualNamespace);
    }

    setClusterSettings((settings: ClusterSettings | null) => {
      const newSettings = { ...(settings || {}) };
      if (isValidNamespaceFormat(namespace)) {
        newSettings.defaultNamespace = actualNamespace;
      }
      return newSettings;
    });
  }

  const isValidDefaultNamespace = isValidNamespaceFormat(defaultNamespace);
  const isValidNewAllowedNamespace = isValidNamespaceFormat(newAllowedNamespace);
  const invalidNamespaceMessage =
    "Namespaces must contain only lowercase alphanumeric characters or '-', and must start and end with an alphanumeric character.";

  const handleCloseDialog = React.useCallback(() => {
    setKey(uuidv4());
    closeDialog();
    onDialogClose();
  }, [closeDialog, onDialogClose, setKey]);

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth>
      <DialogContent>
        {!!errorMessage && (
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            <Typography component={'div'} variant={'subtitle2'} gutterBottom>
              {errorMessage}
            </Typography>
            <Typography variant={'subtitle2'}>
              Please, fill them in order to use the portal.
            </Typography>
          </Alert>
        )}
        <NameValueTable
          rows={[
            {
              name: 'Default namespace',
              value: (
                <TextField
                  onChange={(event) => {
                    let value = event.target.value;
                    value = value.replace(' ', '');
                    setDefaultNamespace(value);
                  }}
                  value={defaultNamespace}
                  placeholder="default"
                  error={!isValidDefaultNamespace}
                  helperText={
                    isValidDefaultNamespace
                      ? 'The default namespace for e.g. when applying resources (when not specified directly).'
                      : invalidNamespaceMessage
                  }
                  InputProps={{
                    endAdornment: isEditingDefaultNamespace() ? (
                      <Icon
                        width={24}
                        color={theme.palette.text.secondary}
                        icon="mdi:progress-check"
                      />
                    ) : (
                      <Icon width={24} icon="mdi:check-bold" />
                    ),
                    className: classes.input,
                  }}
                />
              ),
            },
            {
              name: 'Allowed namespaces',
              value: (
                <>
                  <TextField
                    onChange={(event) => {
                      let value = event.target.value;
                      value = value.replace(' ', '');
                      setNewAllowedNamespace(value);
                    }}
                    placeholder="namespace"
                    error={!isValidNewAllowedNamespace}
                    value={newAllowedNamespace}
                    helperText={
                      isValidNewAllowedNamespace
                        ? 'The list of namespaces you are allowed to access in this cluster.'
                        : invalidNamespaceMessage
                    }
                    autoComplete="off"
                    inputProps={{
                      form: {
                        autocomplete: 'off',
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => {
                            storeNewAllowedNamespace(newAllowedNamespace);
                          }}
                          disabled={!newAllowedNamespace}
                          size="large"
                        >
                          <InlineIcon icon="mdi:plus-circle" />
                        </IconButton>
                      ),
                      onKeyPress: (event) => {
                        if (event.key === 'Enter') {
                          storeNewAllowedNamespace(newAllowedNamespace);
                        }
                      },
                      autoComplete: 'off',
                      className: classes.input,
                    }}
                  />
                  <Box className={classes.chipBox} aria-label={'Allowed namespaces'}>
                    {((clusterSettings || {}).allowedNamespaces || []).map((namespace) => (
                      <Chip
                        key={namespace}
                        label={namespace}
                        size="small"
                        clickable={false}
                        onDelete={() => {
                          setClusterSettings((settings) => {
                            const newSettings = { ...settings };
                            newSettings.allowedNamespaces = newSettings.allowedNamespaces?.filter(
                              (ns) => ns !== namespace
                            );
                            return newSettings;
                          });
                        }}
                      />
                    ))}
                  </Box>
                </>
              ),
            },
          ]}
        />
      </DialogContent>
      <DialogActions>
        <Button variant={'contained'} size={'small'} color={'primary'} onClick={handleCloseDialog}>
          proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};
