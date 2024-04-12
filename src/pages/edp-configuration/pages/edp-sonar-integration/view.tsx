import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { QuickLinkKubeObject } from '../../../../k8s/QuickLink';
import { SYSTEM_QUICK_LINKS } from '../../../../k8s/QuickLink/constants';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { ManageSonarCI } from '../../../../widgets/ManageSonarCI';
import { menu } from '../../menu';
import { SONAR_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const theme = useTheme();
  const [sonarSecrets, sonarSecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=${SYSTEM_QUICK_LINKS.SONAR}`,
  });

  const [sonarQuickLink, sonarQuickLinkError] = QuickLinkKubeObject.useGet(
    SYSTEM_QUICK_LINKS.SONAR
  );

  const sonarSecret = sonarSecrets?.[0]?.jsonData;

  const mode = !!sonarSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const ownerReference = sonarSecret?.metadata?.ownerReferences?.[0]?.kind;
  const error = sonarSecretsError || sonarQuickLinkError;
  const forbiddenError = getForbiddenError(error);
  const isLoading = (sonarSecrets === null || sonarQuickLink === null) && !error;

  return (
    <PageWithSubMenu list={menu} title="Configuration">
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontSize={theme.typography.pxToRem(28)} color="primary.dark" gutterBottom>
              {SONAR_INTEGRATION_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {SONAR_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={EDP_OPERATOR_GUIDE.SONAR.url} />
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
                  <ManageSonarCI
                    formData={{
                      sonarSecret,
                      sonarQuickLink: sonarQuickLink?.jsonData,
                      ownerReference,
                      mode,
                    }}
                  />
                </LoadingWrapper>
              </Grid>
            )}
            {!sonarSecret && !isLoading && !error && (
              <Grid item xs={12}>
                <EmptyContent color={'textSecondary'}>
                  No SonarQube integration secrets found
                </EmptyContent>
              </Grid>
            )}
          </Grid>
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
