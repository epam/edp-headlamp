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
import { ManageArgoCDCI } from '../../../../widgets/ManageArgoCDCI';
import { menu } from '../../menu';
import { ARGOCD_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const theme = useTheme();
  const [argoCDSecrets, argoCDSecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=${SYSTEM_QUICK_LINKS.ARGOCD}`,
  });

  const [argoCDQuickLink, argoCDQuickLinkError] = QuickLinkKubeObject.useGet(
    SYSTEM_QUICK_LINKS.ARGOCD
  );

  const error = argoCDSecretsError || argoCDQuickLinkError;

  const argoCDSecret = argoCDSecrets?.[0]?.jsonData;

  const mode = !!argoCDSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const ownerReference = argoCDSecret?.metadata?.ownerReferences?.[0]?.kind;
  const isLoading = (argoCDSecrets === null || argoCDQuickLink === null) && !error;

  return (
    <PageWithSubMenu list={menu} title="Configuration">
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontSize={theme.typography.pxToRem(28)} color="primary.dark" gutterBottom>
              {ARGOCD_INTEGRATION_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {ARGOCD_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={EDP_OPERATOR_GUIDE.ARGO_CD.url} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {error ? (
              <Grid item xs={12}>
                <ErrorContent error={error} outlined />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <LoadingWrapper isLoading={isLoading}>
                  <ManageArgoCDCI
                    formData={{
                      argoCDSecret,
                      argoCDQuickLink: argoCDQuickLink?.jsonData,
                      ownerReference,
                      mode,
                    }}
                  />
                </LoadingWrapper>
              </Grid>
            )}
            {!argoCDSecret && !isLoading && !error && (
              <Grid item xs={12}>
                <EmptyContent color={'textSecondary'}>
                  No Argo CD integration secrets found
                </EmptyContent>
              </Grid>
            )}
          </Grid>
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
