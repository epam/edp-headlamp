import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { JiraServerKubeObject } from '../../../../k8s/JiraServer';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { ManageJiraCI } from '../../../../widgets/ManageJiraCI';
import { menu } from '../../menu';
import { JIRA_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const theme = useTheme();
  const [jiraServers, jiraServersError] = JiraServerKubeObject.useList();

  const [jiraServerSecrets, jiraServerSecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=jira`,
  });

  const jiraServer = jiraServers?.[0]?.jsonData;
  const jiraServerSecret = jiraServerSecrets?.[0]?.jsonData;
  const mode = !!jiraServerSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const ownerReference = jiraServerSecret?.metadata?.ownerReferences?.[0]?.kind;
  const error = jiraServersError || jiraServerSecretsError;
  const forbiddenError = getForbiddenError(error);
  const isLoading = (jiraServers === null || jiraServerSecrets === null) && !error;

  return (
    <PageWithSubMenu list={menu} title="Configuration">
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontSize={theme.typography.pxToRem(28)} color="primary.dark" gutterBottom>
              {JIRA_INTEGRATION_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {JIRA_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={EDP_OPERATOR_GUIDE.JIRA.url} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {forbiddenError ? (
              <Grid item xs={12}>
                <ErrorContent error={forbiddenError} outlined />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <LoadingWrapper isLoading={isLoading}>
                  <ManageJiraCI
                    formData={{
                      jiraServer,
                      jiraServerSecret,
                      ownerReference,
                      isReadOnly: !!ownerReference,
                      mode,
                    }}
                  />
                </LoadingWrapper>
              </Grid>
            )}
            {!jiraServerSecret && !isLoading && !error && (
              <Grid item xs={12}>
                <EmptyContent color={'textSecondary'}>
                  No Jira integration secrets found
                </EmptyContent>
              </Grid>
            )}
          </Grid>
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
