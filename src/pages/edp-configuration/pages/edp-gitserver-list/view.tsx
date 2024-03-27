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
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { StatusIcon } from '../../../../components/StatusIcon';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { ManageGitServer } from '../../../../widgets/ManageGitServer';
import { menu } from '../../menu';
import { GIT_SERVER_LIST_PAGE_DESCRIPTION } from './constants';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
  const theme = useTheme();
  const {
    data: { gitServers, repositorySecrets },
    isLoading,
  } = useDynamicDataContext();

  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };
  const handleClosePanel = () => setExpandedPanel(null);

  const gitServersLength = gitServers ? gitServers.length : 0;

  return (
    <PageWithSubMenu list={menu}>
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant={'h1'} gutterBottom>
              {GIT_SERVER_LIST_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {GIT_SERVER_LIST_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={EDP_USER_GUIDE.GIT_SERVER_MANAGE.anchors.VIEW_DATA.url} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
                          repositorySecrets={repositorySecrets}
                          handleClosePanel={handleClosePanel}
                        />
                      </Grid>
                    </Grid>
                  </CreateItemAccordion>
                </Grid>
                {gitServersLength &&
                  gitServers.map((_gitServer) => {
                    const gitServer = _gitServer?.jsonData;
                    const connected = gitServer?.status?.connected;
                    const error = gitServer?.status?.error;

                    const [icon, color] = EDPGitServerKubeObject.getStatusIcon(connected);

                    const gitServerName = gitServer.metadata.name;

                    const isExpanded = expandedPanel === gitServerName;

                    return (
                      <Grid item xs={12}>
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
                            <ManageGitServer
                              gitServer={gitServer}
                              repositorySecrets={repositorySecrets}
                              handleClosePanel={handleClosePanel}
                            />
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    );
                  })}
              </Grid>
            </LoadingWrapper>
          </Grid>
          {!gitServers && !isLoading && (
            <Grid item xs={12}>
              <EmptyContent color={'textSecondary'}>No GitServers found</EmptyContent>
            </Grid>
          )}
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
