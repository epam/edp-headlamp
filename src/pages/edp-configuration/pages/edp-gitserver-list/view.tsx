import { Icon } from '@iconify/react';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { CreateItemAccordion } from '../../../../components/CreateItemAccordion';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { StatusIcon } from '../../../../components/StatusIcon';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { ManageGitServer } from '../../../../widgets/ManageGitServer';
import { menu } from '../../menu';
import { GIT_SERVER_LIST_PAGE_DESCRIPTION } from './constants';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
  const theme = useTheme();
  const { gitServers, repositorySecrets } = useDynamicDataContext();

  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };
  const handleClosePanel = () => setExpandedPanel(null);

  const error = gitServers.error || repositorySecrets.error;
  const forbiddenError = getForbiddenError(error);
  const isLoading = (gitServers.data === null || repositorySecrets.data === null) && !error;

  const gitServersLength = gitServers.data ? gitServers.data.length : 0;

  return (
    <PageWithSubMenu list={menu} title="Configuration">
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontSize={theme.typography.pxToRem(28)} color="primary.dark" gutterBottom>
              {GIT_SERVER_LIST_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {GIT_SERVER_LIST_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={EDP_USER_GUIDE.GIT_SERVER_MANAGE.anchors.VIEW_DATA.url} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {forbiddenError ? (
              <Grid item xs={12}>
                <ErrorContent error={forbiddenError} outlined />
              </Grid>
            ) : (
              <LoadingWrapper isLoading={isLoading}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CreateItemAccordion
                      isExpanded={expandedPanel === 'create' || !gitServersLength}
                      onChange={handleChange('create')}
                      title={'Add Git Server'}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <ManageGitServer
                            gitServer={null}
                            repositorySecrets={repositorySecrets.data}
                            handleClosePanel={handleClosePanel}
                          />
                        </Grid>
                      </Grid>
                    </CreateItemAccordion>
                  </Grid>
                  {gitServersLength &&
                    gitServers.data.map((_gitServer) => {
                      const gitServer = _gitServer?.jsonData;
                      const connected = gitServer?.status?.connected;
                      const error = gitServer?.status?.error;

                      const [icon, color] = EDPGitServerKubeObject.getStatusIcon(connected);

                      const gitServerName = gitServer.metadata.name;

                      const isExpanded = expandedPanel === gitServerName;

                      return (
                        <Grid item xs={12} key={gitServer.metadata.uid}>
                          <Accordion expanded={isExpanded} onChange={handleChange(gitServerName)}>
                            <AccordionSummary
                              expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}
                              style={{
                                cursor: 'pointer',
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
                                          <Typography
                                            variant={'subtitle2'}
                                            style={{ fontWeight: 600 }}
                                          >
                                            {`Connected: ${
                                              connected === undefined ? 'Unknown' : connected
                                            }`}
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
                                  repositorySecrets={repositorySecrets.data}
                                  handleClosePanel={handleClosePanel}
                                />
                              )}
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      );
                    })}
                </Grid>
              </LoadingWrapper>
            )}
            {!gitServers && !isLoading && !error && (
              <Grid item xs={12}>
                <EmptyContent color={'textSecondary'}>No GitServers found</EmptyContent>
              </Grid>
            )}
          </Grid>
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
