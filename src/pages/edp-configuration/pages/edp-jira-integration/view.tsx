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
import { JiraServerKubeObject } from '../../../../k8s/JiraServer';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { rem } from '../../../../utils/styling/rem';
import { ManageJira } from '../../../../widgets/ManageJira';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { JIRA_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const [jiraServers, jiraServersError] = JiraServerKubeObject.useList();

  const [jiraServerSecrets, jiraServerSecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=jira`,
  });

  const jiraServer = jiraServers?.[0]?.jsonData;
  const jiraServerSecret = jiraServerSecrets?.[0]?.jsonData;
  const mode = !!jiraServerSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const ownerReference = jiraServerSecret?.metadata?.ownerReferences?.[0]?.kind;
  const error = jiraServersError || jiraServerSecretsError;
  const isLoading = (jiraServers === null || jiraServerSecrets === null) && !error;

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const renderPageContent = React.useCallback(() => {
    const forbiddenError = getForbiddenError(error);

    if (forbiddenError) {
      return <ErrorContent error={forbiddenError} outlined />;
    }

    if (!jiraServerSecret && !isLoading && !error) {
      return (
        <>
          <EmptyList
            customText={'No Jira integration secrets found.'}
            linkText={'Click here to add integration.'}
            handleClick={handleOpenCreateDialog}
          />
        </>
      );
    }

    const ownerReference = jiraServerSecret?.metadata?.ownerReferences?.[0]?.kind;

    const status = jiraServer?.status?.status;
    const errorMessage = jiraServer?.status?.detailed_message;

    const [icon, color] = JiraServerKubeObject.getStatusIcon(status);

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
                          {`Status: ${status === undefined ? 'Unknown' : status}`}
                        </Typography>
                        {!!errorMessage && (
                          <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                            {errorMessage}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </Grid>
                <Grid item>{jiraServerSecret?.metadata.name}</Grid>
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
            <ManageJira
              formData={{
                jiraServer,
                jiraServerSecret,
                ownerReference,
                isReadOnly: !!ownerReference,
                mode,
                handleClosePanel: handleCloseCreateDialog,
              }}
            />
          </AccordionDetails>
        </Accordion>
      </LoadingWrapper>
    );
  }, [error, jiraServerSecret, isLoading, jiraServer, mode]);

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add Integration',
        component: (
          <ManageJira
            formData={{
              jiraServer,
              jiraServerSecret,
              ownerReference,
              isReadOnly: !!ownerReference,
              mode,
              handleClosePanel: handleCloseCreateDialog,
            }}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: isLoading || !!jiraServerSecret,
      }}
      pageDescription={JIRA_INTEGRATION_PAGE_DESCRIPTION}
    >
      {renderPageContent()}
    </ConfigurationPageContent>
  );
};
