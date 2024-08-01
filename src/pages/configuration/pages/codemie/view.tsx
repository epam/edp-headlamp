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
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { rem } from '../../../../utils/styling/rem';
import { ManageCodeMie } from '../../../../widgets/ManageCodeMie';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { pageDescription } from './constants';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
  const {
    codemie,
    codemieProject,
    codemieProjectSettings,
    codemieProjectSettingsSecret,
    codemieQuickLink,
    codemieSecret,
  } = useDynamicDataContext();

  console.log({
    codemie,
    codemieProject,
    codemieProjectSettings,
    codemieProjectSettingsSecret,
    codemieQuickLink,
    codemieSecret,
  });

  const error =
    codemie?.error ||
    codemieProject?.error ||
    codemieProjectSettings?.error ||
    codemieQuickLink?.error ||
    codemieSecret?.error ||
    codemieProjectSettingsSecret?.error;

  const isLoading =
    codemie?.isLoading ||
    codemieProject?.isLoading ||
    codemieProjectSettings?.isLoading ||
    codemieQuickLink?.isLoading ||
    codemieSecret?.isLoading ||
    codemieProjectSettingsSecret?.isLoading;

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

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

    const connected =
      codemieSecret.data?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED];
    const statusError =
      codemieSecret.data?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR];

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
                <Grid item>{codemie.data?.[0]?.metadata.name}</Grid>
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
              codemieProject={codemieProject.data?.[0]}
              codemieProjectSettings={codemieProjectSettings.data?.[0]}
              codemieProjectSettingsSecret={codemieProjectSettingsSecret.data}
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
    codemieQuickLink.data,
    codemieProject.data,
    codemieProjectSettings.data,
    codemieProjectSettingsSecret.data,
  ]);

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add Integration',
        component: (
          <ManageCodeMie
            quickLink={codemieQuickLink.data}
            codemie={codemie.data?.[0]}
            codemieSecret={codemieSecret.data}
            codemieProject={codemieProject.data?.[0]}
            codemieProjectSettings={codemieProjectSettings.data?.[0]}
            codemieProjectSettingsSecret={codemieProjectSettingsSecret.data}
            handleClosePanel={handleCloseCreateDialog}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: isLoading || !!codemieSecret,
      }}
      pageDescription={pageDescription}
    >
      {renderPageContent()}
    </ConfigurationPageContent>
  );
};
