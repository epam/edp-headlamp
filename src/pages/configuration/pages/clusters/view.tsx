import { Icon } from '@iconify/react';
import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  // Button,
  Grid,
  // IconButton,
  // Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
// import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { EmptyList } from '../../../../components/EmptyList';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
// import { DeleteKubeObjectDialog } from '../../../../widgets/dialogs/DeleteKubeObject';
// import { ManageVClusterDialog } from '../../../../widgets/dialogs/ManageVCluster';
import { StatusIcon } from '../../../../components/StatusIcon';
// import { StatusIcon } from '../../../../components/StatusIcon';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
// import { ApplicationKubeObject } from '../../../../k8s/groups/ArgoCD/Application';
import { useArgoApplicationCRUD } from '../../../../k8s/groups/ArgoCD/Application/hooks/useArgoApplicationCRUD';
// import { APPLICATION_LABEL_SELECTOR_APP_TYPE } from '../../../../k8s/groups/ArgoCD/Application/labels';
import { ApplicationKubeObjectInterface } from '../../../../k8s/groups/ArgoCD/Application/types';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import {
  SECRET_ANNOTATION_CLUSTER_CONNECTED,
  SECRET_ANNOTATION_CLUSTER_ERROR,
} from '../../../../k8s/groups/default/Secret/annotations';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/groups/default/Secret/labels';
// import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { rem } from '../../../../utils/styling/rem';
import { ManageClusterSecret } from '../../../../widgets/ManageClusterSecret';
import { getClusterName } from '../../../../widgets/ManageClusterSecret/utils';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { pageDescription } from './constants';
import { useTypedPermissions } from './hooks/useTypedPermissions';

export const PageView = () => {
  const [clusterSecrets, clusterSecretsError] = SecretKubeObject.useList({
    namespace: getDefaultNamespace(),
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=cluster`,
  });

  // const [vClusterApps, vClusterAppsError] = ApplicationKubeObject.useList({
  //   namespace: getDefaultNamespace(),
  //   labelSelector: `${APPLICATION_LABEL_SELECTOR_APP_TYPE}=cluster`,
  // });

  const isLoading = clusterSecrets === null && !clusterSecretsError;

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const [expandedPanel, setExpandedPanel] = React.useState<string | null>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const [editor, setEditor] = React.useState<{
    open: boolean;
    data: KubeObjectInterface | undefined;
  }>({
    open: false,
    data: undefined,
  });

  // const handleOpenEditor = (data: KubeObjectInterface) => {
  //   setEditor({ open: true, data });
  // };

  const handleCloseEditor = () => {
    setEditor({ open: false, data: undefined });
  };

  const {
    mutations: { argoApplicationEditMutation },
  } = useArgoApplicationCRUD();

  const handleEditorSave = (data: ApplicationKubeObjectInterface[]) => {
    const [item] = data;

    argoApplicationEditMutation.mutate(item, {
      onSuccess: () => {
        handleCloseEditor();
      },
    });
  };

  const permissions = useTypedPermissions();
  // const { setDialog } = useDialogContext();
  // const handleDeleteApplication = React.useCallback(
  //   (application: ApplicationKubeObjectInterface) => {
  //     if (!permissions?.delete?.Application.allowed) {
  //       return;
  //     }

  //     setDialog(DeleteKubeObjectDialog, {
  //       kubeObject: ApplicationKubeObject,
  //       kubeObjectData: application,
  //       objectName: application?.metadata.name,
  //       description: `Confirm the deletion of the application`,
  //     });
  //   },
  //   [permissions?.delete?.Application.allowed, setDialog]
  // );

  const renderPageContent = React.useCallback(() => {
    const forbiddenError = clusterSecretsError && getForbiddenError(clusterSecretsError);

    if (forbiddenError) {
      return <ErrorContent error={forbiddenError} outlined />;
    }

    if (!clusterSecrets?.length && !isLoading && !clusterSecretsError) {
      return (
        <>
          <EmptyList
            customText={'No clusters found.'}
            linkText={'Click here to add cluster.'}
            handleClick={handleOpenCreateDialog}
          />
        </>
      );
    }

    const singleItem = clusterSecrets?.length === 1;

    return (
      <LoadingWrapper isLoading={isLoading}>
        <Stack spacing={2}>
          {clusterSecrets?.map((el) => {
            const secret = el.jsonData;
            const ownerReference = secret?.metadata?.ownerReferences?.[0]?.kind;

            const secretName = secret?.metadata.name;
            const clusterName = getClusterName(el);

            const isExpanded = expandedPanel === secretName || singleItem;

            const connected = el.metadata?.annotations?.[SECRET_ANNOTATION_CLUSTER_CONNECTED];
            const statusError = el.metadata?.annotations?.[SECRET_ANNOTATION_CLUSTER_ERROR];

            const [icon, color] = SecretKubeObject.getStatusIcon(connected);

            return (
              <Accordion
                expanded={isExpanded}
                onChange={handleChange(secretName)}
                key={secret.metadata.uid}
              >
                <AccordionSummary
                  expandIcon={singleItem ? null : <Icon icon={ICONS.ARROW_DOWN} />}
                  style={{
                    cursor: singleItem ? 'default' : 'pointer',
                  }}
                >
                  <Grid container spacing={1} alignItems={'center'}>
                    <Grid item style={{ marginRight: rem(5) }}>
                      <StatusIcon
                        icon={icon}
                        color={color}
                        Title={
                          <>
                            <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                              {`Connected: ${connected === undefined ? 'Unknown' : connected}`}
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
                    <Grid item>
                      <Typography variant={'h6'} component="div">
                        {clusterName}
                      </Typography>
                    </Grid>
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
                </AccordionSummary>
                <AccordionDetails>
                  <ManageClusterSecret
                    formData={{
                      currentElement: secret,
                      ownerReference,
                      mode: FORM_MODES.EDIT,
                      handleClosePlaceholder: handleCloseCreateDialog,
                      permissions,
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
      </LoadingWrapper>
    );
  }, [clusterSecrets, clusterSecretsError, expandedPanel, isLoading, permissions]);

  // const renderExtraContent = React.useCallback(() => {
  //   const forbiddenError = getForbiddenError(vClusterAppsError);

  //   if (forbiddenError) {
  //     return <ErrorContent error={forbiddenError} outlined />;
  //   }

  //   if (!vClusterApps?.length && vClusterApps !== null && !vClusterAppsError) {
  //     return (
  //       <>
  //         <EmptyList
  //           customText={'No virtual clusters found.'}
  //           linkText={'Click here to add a virtual cluster.'}
  //           handleClick={() => setDialog(ManageVClusterDialog, {})}
  //         />
  //       </>
  //     );
  //   }

  //   return (
  //     <LoadingWrapper isLoading={vClusterApps === null}>
  //       <Grid container spacing={2}>
  //         {vClusterApps?.map((application) => {
  //           const health = application?.status?.health?.status;

  //           const [icon, color, isRotating] = ApplicationKubeObject.getHealthStatusIcon(health);

  //           return (
  //             <Grid item xs={12} key={application.metadata.name}>
  //               <Paper sx={{ p: (t) => `${t.typography.pxToRem(10)} ${t.typography.pxToRem(20)}` }}>
  //                 <Stack
  //                   direction="row"
  //                   spacing={2}
  //                   alignItems="center"
  //                   justifyContent="space-between"
  //                 >
  //                   <Stack spacing={2} direction="row" alignItems="center">
  //                     <StatusIcon
  //                       Title={`Health status: ${health || 'Unknown'}`}
  //                       icon={icon}
  //                       color={color}
  //                       isRotating={isRotating}
  //                     />
  //                     <Typography variant={'h6'}>{application.metadata.name}</Typography>
  //                   </Stack>
  //                   <Stack spacing={2} direction="row" alignItems="center">
  //                     <ConditionalWrapper
  //                       condition={!permissions?.delete?.Application.allowed}
  //                       wrapper={(children) => (
  //                         <Tooltip title={permissions?.delete?.Application.reason}>
  //                           <div>{children}</div>
  //                         </Tooltip>
  //                       )}
  //                     >
  //                       <IconButton
  //                         onClick={() => handleDeleteApplication(application)}
  //                         disabled={!permissions?.delete?.Application.allowed}
  //                         size="large"
  //                       >
  //                         <Icon icon={ICONS.BUCKET} width="20" />
  //                       </IconButton>
  //                     </ConditionalWrapper>
  //                     <ConditionalWrapper
  //                       condition={!permissions.update.Application.allowed}
  //                       wrapper={(children) => (
  //                         <Tooltip title={permissions.update.Application.reason}>
  //                           <div>{children}</div>
  //                         </Tooltip>
  //                       )}
  //                     >
  //                       <Button
  //                         startIcon={<Icon icon={ICONS.PENCIL} />}
  //                         size="small"
  //                         component={'button'}
  //                         style={{ flexShrink: 0 }}
  //                         color="inherit"
  //                         onClick={() => handleOpenEditor(application)}
  //                         disabled={!permissions.update.Application.allowed}
  //                       >
  //                         Edit YAML
  //                       </Button>
  //                     </ConditionalWrapper>
  //                   </Stack>
  //                 </Stack>
  //               </Paper>
  //             </Grid>
  //           );
  //         })}
  //       </Grid>
  //     </LoadingWrapper>
  //   );
  // }, [
  //   handleDeleteApplication,
  //   permissions?.delete?.Application.allowed,
  //   permissions?.delete?.Application.reason,
  //   permissions.update.Application.allowed,
  //   permissions.update.Application.reason,
  //   setDialog,
  //   vClusterApps,
  //   vClusterAppsError,
  // ]);

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add cluster',
        component: (
          <ManageClusterSecret
            formData={{
              ownerReference: undefined,
              mode: FORM_MODES.CREATE,
              handleClosePlaceholder: handleCloseCreateDialog,
              permissions,
            }}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: isLoading,
        permission: {
          allowed: permissions.create.Secret.allowed,
          reason: permissions.create.Secret.reason,
        },
      }}
      pageDescription={pageDescription}
    >
      <Stack spacing={2}>
        {renderPageContent()}
        {/* <Typography fontSize={(t) => t.typography.pxToRem(28)} color="primary.dark" gutterBottom>
          Virtual clusters
        </Typography>
        <Typography variant={'body1'}>Manage Virtual clusters</Typography>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="flex-end">
            <ConditionalWrapper
              condition={!permissions.create.Application.allowed}
              wrapper={(children) => (
                <Tooltip title={permissions.create.Application.reason}>
                  <div>{children}</div>
                </Tooltip>
              )}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setDialog(ManageVClusterDialog, {});
                }}
                disabled={!permissions.create.Application.allowed}
                startIcon={<Icon icon={ICONS.PLUS} width={20} />}
              >
                Create cluster
              </Button>
            </ConditionalWrapper>
          </Stack>
          {renderExtraContent()}
        </Stack> */}
      </Stack>
      {editor.open && editor.data?.jsonData && (
        <EditorDialog
          open={editor.open}
          item={editor.data?.jsonData}
          onClose={handleCloseEditor}
          onSave={handleEditorSave}
        />
      )}
    </ConfigurationPageContent>
  );
};
