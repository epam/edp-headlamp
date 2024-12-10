import { Icon } from '@iconify/react';
import { Accordion, AccordionDetails, AccordionSummary, Tooltip } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { StatusIcon } from '../../../../components/StatusIcon';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import {
  SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED,
  SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR,
} from '../../../../k8s/groups/default/Secret/annotations';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/groups/default/Secret/labels';
import { QuickLinkKubeObject } from '../../../../k8s/groups/EDP/QuickLink';
import { SYSTEM_QUICK_LINKS } from '../../../../k8s/groups/EDP/QuickLink/constants';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { rem } from '../../../../utils/styling/rem';
import { ManageNexus } from '../../../../widgets/ManageNexus';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { pageDescription } from './constants';
import { useTypedPermissions } from './hooks/useTypedPermissions';

export const PageView = () => {
  const [nexusSecrets, nexusSecretsError] = SecretKubeObject.useList({
    namespace: getDefaultNamespace(),
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=${SYSTEM_QUICK_LINKS.NEXUS}`,
  });

  const [_nexusQuickLink, nexusQuickLinkError] = QuickLinkKubeObject.useGet(
    SYSTEM_QUICK_LINKS.NEXUS,
    getDefaultNamespace()
  );

  const nexusSecret = nexusSecrets?.[0]?.jsonData;
  const nexusQuickLink = _nexusQuickLink?.jsonData;
  const mode = !!nexusSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const error = nexusSecretsError || nexusQuickLinkError;
  const isLoading = (nexusSecrets === null || nexusQuickLink === null) && !error;

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const permissions = useTypedPermissions();

  const renderPageContent = React.useCallback(() => {
    const forbiddenError = getForbiddenError(error);

    if (forbiddenError) {
      return <ErrorContent error={forbiddenError} outlined />;
    }

    if (!nexusSecret && !isLoading && !error) {
      return (
        <>
          <EmptyList
            customText={'No Nexus integration secrets found.'}
            linkText={'Click here to add integration.'}
            handleClick={handleOpenCreateDialog}
          />
        </>
      );
    }

    const ownerReference = nexusSecret?.metadata?.ownerReferences?.[0]?.kind;

    const connected =
      nexusSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED];
    const statusError =
      nexusSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR];

    const [icon, color] = SecretKubeObject.getStatusIcon(connected);

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
                <Grid item>{nexusSecret?.metadata.name}</Grid>
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
            <ManageNexus
              secret={nexusSecret}
              quickLink={nexusQuickLink}
              mode={mode}
              ownerReference={ownerReference}
              handleClosePanel={handleCloseCreateDialog}
              permissions={permissions}
            />
          </AccordionDetails>
        </Accordion>
      </LoadingWrapper>
    );
  }, [error, isLoading, mode, nexusQuickLink, nexusSecret, permissions]);

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add Integration',
        component: (
          <ManageNexus
            secret={nexusSecret}
            quickLink={nexusQuickLink}
            mode={mode}
            ownerReference={null}
            handleClosePanel={handleCloseCreateDialog}
            permissions={permissions}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: isLoading || !!nexusSecret,
        permission: {
          allowed: permissions?.create?.Secret.allowed && permissions?.update?.QuickLink.allowed,
          reason: permissions?.create?.Secret.reason || permissions?.update?.QuickLink.reason,
        },
      }}
      pageDescription={pageDescription}
    >
      {renderPageContent()}
    </ConfigurationPageContent>
  );
};
