import { Icon } from '@iconify/react';
import { Accordion, AccordionDetails, AccordionSummary, Tooltip } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { StatusIcon } from '../../../../components/StatusIcon';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { QuickLinkKubeObject } from '../../../../k8s/QuickLink';
import { SYSTEM_QUICK_LINKS } from '../../../../k8s/QuickLink/constants';
import { SecretKubeObject } from '../../../../k8s/Secret';
import {
  SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED,
  SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR,
} from '../../../../k8s/Secret/annotations';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { rem } from '../../../../utils/styling/rem';
import { ManageCodeMie } from '../../../../widgets/ManageCodeMie';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { CODEMIE_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const [codemieSecrets, codemieSecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=${SYSTEM_QUICK_LINKS.CODEMIE}`,
  });

  const [_codemieQuickLink, codemieQuickLinkError] = QuickLinkKubeObject.useGet(
    SYSTEM_QUICK_LINKS.CODEMIE,
    getDefaultNamespace()
  );

  const codemieSecret = codemieSecrets?.[0]?.jsonData;

  const codemieQuickLink = _codemieQuickLink?.jsonData;
  const mode = !!codemieSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const error = codemieSecretsError || codemieQuickLinkError;
  const isLoading = (codemieSecrets === null || codemieQuickLink === null) && !error;

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const renderPageContent = React.useCallback(() => {
    const forbiddenError = getForbiddenError(error);

    if (forbiddenError) {
      return <ErrorContent error={forbiddenError} outlined />;
    }

    if (!codemieSecret && !isLoading) {
      return (
        <>
          <EmptyList
            customText={'No CodeMie integration secrets found.'}
            linkText={'Click here to add integration.'}
            handleClick={handleOpenCreateDialog}
          />
        </>
      );
    }

    const ownerReference = codemieSecret?.metadata?.ownerReferences?.[0]?.kind;

    const connected =
      codemieSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED];
    const statusError =
      codemieSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR];

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
                <Grid item>{codemieSecret?.metadata.name}</Grid>
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
              secret={codemieSecret}
              quickLink={codemieQuickLink}
              mode={mode}
              ownerReference={ownerReference}
              handleClosePanel={handleCloseCreateDialog}
            />
          </AccordionDetails>
        </Accordion>
      </LoadingWrapper>
    );
  }, [error, isLoading, mode, codemieQuickLink, codemieSecret]);

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add Integration',
        component: (
          <ManageCodeMie
            secret={codemieSecret}
            quickLink={codemieQuickLink}
            mode={mode}
            ownerReference={null}
            handleClosePanel={handleCloseCreateDialog}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: isLoading || !!codemieSecret,
      }}
      pageDescription={CODEMIE_INTEGRATION_PAGE_DESCRIPTION}
    >
      {renderPageContent()}
    </ConfigurationPageContent>
  );
};
