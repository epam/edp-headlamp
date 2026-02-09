import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { StatusIcon } from '../../../../components/StatusIcon';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { GitServerKubeObject } from '../../../../k8s/groups/EDP/GitServer';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { ManageGitServer } from '../../../../widgets/ManageGitServer';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { pageDescription } from './constants';
import { useTypedPermissions } from './hooks/useTypedPermissions';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
  const theme = useTheme();
  const { gitServers, repositorySecrets, configMaps, ingresses } = useDynamicDataContext();

  const error = gitServers.error || repositorySecrets.error || configMaps.error || ingresses.error;
  const isLoading =
    (gitServers.isLoading ||
      repositorySecrets.isLoading ||
      configMaps.isLoading ||
      ingresses.isLoading) &&
    !error;

  const gitServersLength = gitServers.data ? gitServers.data.length : 0;

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const [expandedPanel, setExpandedPanel] = React.useState<string | null>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const getWebhookURLByGitServerName = React.useCallback(
    (gitServerName: string) => {
      if (isLoading) {
        return '';
      }

      const webhookURL = ingresses.data?.find(
        (el) => el.metadata.labels?.['app.edp.epam.com/gitServer'] === gitServerName
      )?.spec.rules?.[0]?.host;

      return webhookURL ? `https://${webhookURL}` : '';
    },
    [ingresses.data, isLoading]
  );

  const permissions = useTypedPermissions();
  const renderPageContent = React.useCallback(() => {
    const forbiddenError = error && getForbiddenError(error);

    if (forbiddenError) {
      return <ErrorContent error={forbiddenError} outlined />;
    }

    if (!gitServersLength && !isLoading && !error) {
      return (
        <>
          <EmptyList
            customText={'No GitServers found.'}
            linkText={'Click here to add GitServer.'}
            handleClick={handleOpenCreateDialog}
          />
        </>
      );
    }

    const singleItem = gitServers.data?.length === 1;

    return (
      <LoadingWrapper isLoading={isLoading}>
        <Grid container spacing={2}>
          {gitServers.data?.map((el) => {
            // @ts-ignore
            const gitServer = el?.jsonData;
            const connected = gitServer?.status?.connected;
            const error = gitServer?.status?.error;

            const [icon, color] = GitServerKubeObject.getStatusIcon(connected);

            const gitServerName = gitServer.metadata.name;

            const isExpanded = expandedPanel === gitServerName;
            const webhookURL = getWebhookURLByGitServerName(gitServerName);

            return (
              <Grid item xs={12} key={gitServer.metadata.uid}>
                <Accordion expanded={isExpanded} onChange={handleChange(gitServerName)}>
                  <AccordionSummary
                    expandIcon={singleItem ? null : <Icon icon={ICONS.ARROW_DOWN} />}
                    style={{
                      cursor: singleItem ? 'default' : 'pointer',
                    }}
                  >
                    <Typography variant={'h6'}>
                      <Grid container spacing={1} alignItems={'center'}>
                        <Grid item style={{ marginRight: theme.typography.pxToRem(5) }}>
                          <StatusIcon
                            icon={icon}
                            color={color}
                            Title={
                              <>
                                <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                                  {`Connected: ${connected === undefined ? 'Unknown' : connected}`}
                                </Typography>
                                {!!error && (
                                  <Typography
                                    variant={'subtitle2'}
                                    style={{ marginTop: theme.typography.pxToRem(10) }}
                                  >
                                    {error}
                                  </Typography>
                                )}
                              </>
                            }
                          />
                        </Grid>
                        <Grid item>{gitServerName}</Grid>
                      </Grid>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {isExpanded && (
                      <ManageGitServer
                        gitServer={gitServer}
                        webhookURL={webhookURL}
                        repositorySecrets={repositorySecrets.data!}
                        handleClosePanel={handleCloseCreateDialog}
                        permissions={permissions}
                      />
                    )}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            );
          })}
        </Grid>
      </LoadingWrapper>
    );
  }, [
    error,
    expandedPanel,
    getWebhookURLByGitServerName,
    gitServers.data,
    gitServersLength,
    isLoading,
    permissions,
    repositorySecrets.data,
    theme.typography,
  ]);

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add GitServer',
        component: (
          <ManageGitServer
            gitServer={undefined}
            webhookURL={undefined}
            repositorySecrets={repositorySecrets.data!}
            handleClosePanel={handleCloseCreateDialog}
            permissions={permissions}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: isLoading,
        permission: {
          allowed: permissions.create.Secret.allowed && permissions.create.GitServer.allowed,
          reason: permissions.create.Secret.reason || permissions.create.GitServer.reason,
        },
      }}
      pageDescription={pageDescription}
    >
      {renderPageContent()}
    </ConfigurationPageContent>
  );
};
