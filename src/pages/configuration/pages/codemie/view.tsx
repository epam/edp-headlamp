import { Icon } from '@iconify/react';
import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { StatusIcon } from '../../../../components/StatusIcon';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCRUDMutation';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { CodemieKubeObject } from '../../../../k8s/groups/EDP/Codemie';
import { CodemieApplicationKubeObject } from '../../../../k8s/groups/EDP/CodemieApplication';
import { CodemieApplicationKubeObjectConfig } from '../../../../k8s/groups/EDP/CodemieApplication/config';
import { CodemieApplicationKubeObjectInterface } from '../../../../k8s/groups/EDP/CodemieApplication/types';
import { CodemieProjectSettingsKubeObject } from '../../../../k8s/groups/EDP/CodemieProjectSettings';
import { CodemieProjectSettingsKubeObjectConfig } from '../../../../k8s/groups/EDP/CodemieProjectSettings/config';
import { CodemieProjectSettingsKubeObjectInterface } from '../../../../k8s/groups/EDP/CodemieProjectSettings/types';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { rem } from '../../../../utils/styling/rem';
import { ManageCodeMie } from '../../../../widgets/ManageCodeMie';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { pageDescription } from './constants';
import { useTypedPermissions } from './hooks/useTypedPermissions';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
  const {
    codemie,
    codemieProject,
    codemieProjectSettings,
    codemieQuickLink,
    codemieSecret,
    codemieApplications,
  } = useDynamicDataContext();

  const error =
    codemie?.error ||
    codemieProject?.error ||
    codemieProjectSettings?.error ||
    codemieQuickLink?.error ||
    codemieSecret?.error ||
    codemieApplications?.error;

  const isLoading =
    codemie?.isLoading ||
    codemieProject?.isLoading ||
    codemieProjectSettings?.isLoading ||
    codemieQuickLink?.isLoading ||
    codemieSecret?.isLoading ||
    codemieApplications?.isLoading;

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const permissions = useTypedPermissions();

  const renderPageContent = React.useCallback(() => {
    const forbiddenError = getForbiddenError(error);

    if (forbiddenError) {
      return <ErrorContent error={forbiddenError} outlined />;
    }

    if (!codemie && !isLoading) {
      return (
        <>
          <EmptyList
            customText={'No CodeMie integration found.'}
            linkText={'Click here to add integration.'}
            handleClick={handleOpenCreateDialog}
          />
        </>
      );
    }

    const ownerReference = codemieSecret.data?.metadata?.ownerReferences?.[0]?.kind;

    const status = codemieProject.data?.[0]?.status?.value;
    const statusError = codemieProject.data?.[0]?.status?.error;

    const [icon, color] = CodemieKubeObject.getStatusIcon(status);

    return (
      <LoadingWrapper isLoading={isLoading}>
        <Accordion expanded>
          <AccordionSummary style={{ cursor: 'default' }}>
            <Typography variant={'h6'}>
              <Grid container spacing={1} alignItems={'center'}>
                <Grid item style={{ marginRight: rem(5) }}>
                  <StatusIcon
                    icon={icon}
                    color={color}
                    Title={
                      <>
                        <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                          {`Status: ${status || 'Unknown'}`}
                        </Typography>
                        {!!statusError && (
                          <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                            {statusError}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </Grid>
                <Grid item>{codemieProject.data?.[0]?.metadata.name}</Grid>
                {!!ownerReference && (
                  <Grid item>
                    <Tooltip title={`Managed by ${ownerReference}`}>
                      <Icon
                        icon={ICONS.CLOUD_LOCK}
                        width={20}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Tooltip>
                  </Grid>
                )}
              </Grid>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ManageCodeMie
              quickLink={codemieQuickLink.data}
              codemie={codemie.data?.[0]}
              codemieSecret={codemieSecret.data}
              permissions={permissions}
              handleClosePanel={handleCloseCreateDialog}
            />
          </AccordionDetails>
        </Accordion>
      </LoadingWrapper>
    );
  }, [
    error,
    codemie,
    isLoading,
    codemieSecret.data,
    codemieProject.data,
    codemieQuickLink.data,
    permissions,
  ]);

  const [editor, setEditor] = React.useState<{
    open: boolean;
    data: KubeObjectInterface | undefined;
  }>({
    open: false,
    data: undefined,
  });

  const handleOpenEditor = (data: KubeObjectInterface) => {
    setEditor({ open: true, data });
  };

  const handleCloseEditor = () => {
    setEditor({ open: false, data: undefined });
  };

  const codemieProjectSettingsEditMutation = useResourceCRUDMutation<
    CodemieProjectSettingsKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('codemieProjectSettingsEditMutation', CodemieProjectSettingsKubeObject, CRUD_TYPES.EDIT, {
    customMessages: {
      onMutate: 'Applying changes...',
      onError: 'Failed to update settings',
      onSuccess: 'Start updating settings',
    },
  });

  const codemieApplicationEditMutation = useResourceCRUDMutation<
    CodemieApplicationKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('codemieApplicationEditMutation', CodemieApplicationKubeObject, CRUD_TYPES.EDIT, {
    customMessages: {
      onMutate: 'Applying changes...',
      onError: 'Failed to update application',
      onSuccess: 'Start updating application',
    },
  });

  const handleEditorSave = (
    data: CodemieProjectSettingsKubeObjectInterface[] | CodemieApplicationKubeObjectInterface[]
  ) => {
    const [item] = data;

    if (item.kind === CodemieProjectSettingsKubeObjectConfig.kind) {
      codemieProjectSettingsEditMutation.mutate(item as CodemieProjectSettingsKubeObjectInterface, {
        onSuccess: () => {
          handleCloseEditor();
        },
      });
      return;
    } else if (item.kind === CodemieApplicationKubeObjectConfig.kind) {
      codemieApplicationEditMutation.mutate(item as CodemieApplicationKubeObjectInterface, {
        onSuccess: () => {
          handleCloseEditor();
        },
      });
    }
  };

  const theme = useTheme();

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add Integration',
        component: (
          <ManageCodeMie
            quickLink={codemieQuickLink.data}
            codemie={codemie.data?.[0]}
            codemieSecret={codemieSecret.data}
            permissions={permissions}
            handleClosePanel={handleCloseCreateDialog}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: true,
        permission: {
          allowed: permissions.create.Secret.allowed,
          reason: permissions.create.Secret.reason,
        },
      }}
      pageDescription={pageDescription}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {renderPageContent()}
        </Grid>
        <Grid item xs={12}>
          <Typography
            fontSize={theme.typography.pxToRem(24)}
            color="primary.dark"
            sx={{ mb: (t) => t.typography.pxToRem(24) }}
          >
            Project Settings
          </Typography>
          <LoadingWrapper isLoading={codemieProjectSettings.isLoading}>
            <Grid container spacing={2}>
              {codemieProjectSettings.data?.map((setting) => {
                const status = setting?.status?.value;
                const statusError = setting?.status?.error;

                const [icon, color] = CodemieProjectSettingsKubeObject.getStatusIcon(status);

                return (
                  <Grid item xs={12} key={setting.metadata.name}>
                    <Paper
                      sx={{ p: (t) => `${t.typography.pxToRem(10)} ${t.typography.pxToRem(20)}` }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <StatusIcon
                            icon={icon}
                            color={color}
                            Title={
                              <>
                                <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                                  {`Status: ${status || 'Unknown'}`}
                                </Typography>
                                {!!statusError && (
                                  <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                                    {statusError}
                                  </Typography>
                                )}
                              </>
                            }
                          />
                          <Typography variant={'h6'}>{setting.metadata.name}</Typography>
                        </Stack>
                        <Button
                          startIcon={<Icon icon={ICONS.PENCIL} />}
                          size="small"
                          component={'button'}
                          style={{ flexShrink: 0 }}
                          color="inherit"
                          onClick={() => handleOpenEditor(setting)}
                        >
                          Edit YAML
                        </Button>
                      </Stack>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
            {editor.open && editor.data?.jsonData && (
              <EditorDialog
                open={editor.open}
                item={editor.data?.jsonData}
                onClose={handleCloseEditor}
                onSave={handleEditorSave}
              />
            )}
          </LoadingWrapper>
        </Grid>
        <Grid item xs={12} sx={{ pb: (t) => t.typography.pxToRem(40) }}>
          <Typography
            fontSize={theme.typography.pxToRem(24)}
            color="primary.dark"
            sx={{ mb: (t) => t.typography.pxToRem(24) }}
          >
            Applications
          </Typography>
          <LoadingWrapper isLoading={codemieApplications.isLoading}>
            <Grid container spacing={2}>
              {codemieApplications.data?.map((application) => {
                const status = application?.status?.value;
                const statusError = application?.status?.error;

                const [icon, color] = CodemieApplicationKubeObject.getStatusIcon(status);

                return (
                  <Grid item xs={12} key={application.metadata.name}>
                    <Paper
                      sx={{ p: (t) => `${t.typography.pxToRem(10)} ${t.typography.pxToRem(20)}` }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <StatusIcon
                            icon={icon}
                            color={color}
                            Title={
                              <>
                                <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                                  {`Status: ${status || 'Unknown'}`}
                                </Typography>
                                {!!statusError && (
                                  <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                                    {statusError}
                                  </Typography>
                                )}
                              </>
                            }
                          />
                          <Typography variant={'h6'}>{application.metadata.name}</Typography>
                        </Stack>
                        <Button
                          startIcon={<Icon icon={ICONS.PENCIL} />}
                          size="small"
                          component={'button'}
                          style={{ flexShrink: 0 }}
                          color="inherit"
                          onClick={() => handleOpenEditor(application)}
                        >
                          Edit YAML
                        </Button>
                      </Stack>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
            {editor.open && editor.data?.jsonData && (
              <EditorDialog
                open={editor.open}
                item={editor.data?.jsonData}
                onClose={handleCloseEditor}
                onSave={handleEditorSave}
              />
            )}
          </LoadingWrapper>
        </Grid>
      </Grid>
    </ConfigurationPageContent>
  );
};
