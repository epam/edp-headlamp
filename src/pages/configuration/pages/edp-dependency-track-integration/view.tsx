import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
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
import { ManageDependencyTrack } from '../../../../widgets/ManageDependencyTrack';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const [dependencyTrackSecrets, dependencyTrackSecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=${SYSTEM_QUICK_LINKS.DEPENDENCY_TRACK}`,
  });

  const [_depTrackQuickLink, depTrackQuickLinkError] = QuickLinkKubeObject.useGet(
    SYSTEM_QUICK_LINKS.DEPENDENCY_TRACK,
    getDefaultNamespace()
  );

  const dependencyTrackSecret = dependencyTrackSecrets?.[0]?.jsonData;
  const depTrackQuickLink = _depTrackQuickLink?.jsonData;
  const mode = !!dependencyTrackSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const error = dependencyTrackSecretsError || depTrackQuickLinkError;
  const isLoading = (dependencyTrackSecrets === null || depTrackQuickLink === null) && !error;

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const renderPageContent = React.useCallback(() => {
    const forbiddenError = getForbiddenError(error);

    if (forbiddenError) {
      return <ErrorContent error={forbiddenError} outlined />;
    }

    if (!dependencyTrackSecret && !isLoading && !error) {
      return (
        <>
          <EmptyList
            customText={'No DependencyTrack integration secrets found.'}
            linkText={'Click here to add integration.'}
            handleClick={handleOpenCreateDialog}
          />
        </>
      );
    }

    const ownerReference = dependencyTrackSecret?.metadata?.ownerReferences?.[0]?.kind;

    const connected =
      dependencyTrackSecret?.metadata?.annotations?.[
        SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED
      ];
    const statusError =
      dependencyTrackSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR];

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
                <Grid item>{dependencyTrackSecret?.metadata.name}</Grid>
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
            <ManageDependencyTrack
              secret={dependencyTrackSecret}
              quickLink={depTrackQuickLink}
              mode={mode}
              ownerReference={ownerReference}
              handleClosePanel={handleCloseCreateDialog}
            />
          </AccordionDetails>
        </Accordion>
      </LoadingWrapper>
    );
  }, [error, dependencyTrackSecret, isLoading, depTrackQuickLink, mode]);

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add Integration',
        component: (
          <ManageDependencyTrack
            secret={dependencyTrackSecret}
            quickLink={depTrackQuickLink}
            mode={mode}
            ownerReference={null}
            handleClosePanel={handleCloseCreateDialog}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: isLoading || !!dependencyTrackSecret,
      }}
      pageDescription={DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION}
    >
      {renderPageContent()}
    </ConfigurationPageContent>
  );
};
