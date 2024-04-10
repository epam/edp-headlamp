import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Table } from '../../../../components/Table';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { ManageSSOCI } from '../../../../widgets/ManageSSOCI';
import { menu } from '../../menu';
import { SSO_INTEGRATION_PAGE_DESCRIPTION } from './constants';
import { useColumns } from './hooks/useColumns';

export const PageView = () => {
  const theme = useTheme();
  const [ssoSecrets, ssoSecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=keycloak`,
  });

  const ssoSecret = ssoSecrets?.[0]?.jsonData;

  const mode = !!ssoSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const ownerReference = ssoSecret?.metadata?.ownerReferences?.[0]?.kind;

  const [ingresses, ingressesError] = K8s.ingress.default.useList();

  const OAuthIngresses = React.useMemo(
    () =>
      ingresses
        ? ingresses.filter((ingress) => {
            return 'nginx.ingress.kubernetes.io/auth-url' in ingress.metadata.annotations;
          })
        : null,
    [ingresses]
  );

  const error = ssoSecretsError || ingressesError;
  const isLoading = (ssoSecrets === null || ingresses === null) && !error;

  const columns = useColumns();

  return (
    <PageWithSubMenu list={menu} title="Configuration">
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontSize={theme.typography.pxToRem(28)} color="primary.dark" gutterBottom>
              {SSO_INTEGRATION_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {SSO_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={EDP_OPERATOR_GUIDE.O_AUTH.url} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {error ? (
              <Grid item xs={12}>
                <ErrorContent error={error} outlined />
              </Grid>
            ) : (
              <LoadingWrapper isLoading={isLoading}>
                <ManageSSOCI
                  formData={{
                    ssoSecret,
                    ownerReference,
                    isReadOnly: !!ownerReference,
                    mode,
                  }}
                />
              </LoadingWrapper>
            )}
            {!ssoSecret && !isLoading && !error && (
              <Grid item xs={12}>
                <EmptyContent color={'textSecondary'}>
                  No SSO integration secrets found
                </EmptyContent>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom component="span">
              Ingresses
            </Typography>
            <Table<KubeObjectInterface>
              isLoading={OAuthIngresses === null}
              data={OAuthIngresses}
              error={ingressesError}
              columns={columns}
            />
          </Grid>
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
