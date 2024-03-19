import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Table } from '../../../../components/Table';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageSSOCI } from '../../../../widgets/ManageSSOCI';
import { menu } from '../../menu';
import { SSO_INTEGRATION_PAGE_DESCRIPTION } from './constants';
import { useColumns } from './hooks/useColumns';

export const PageView = () => {
  const [ssoSecrets] = SecretKubeObject.useList({
    namespace: getDefaultNamespace(),
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=keycloak`,
  });

  const ssoSecret = ssoSecrets?.[0]?.jsonData;

  const mode = !!ssoSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const ownerReference = ssoSecret?.metadata?.ownerReferences?.[0]?.kind;
  const isLoading = ssoSecret === null;

  const [OAuthIngresses, setOAuthIngresses] = React.useState<KubeObjectInterface[]>(null);
  const [error, setError] = React.useState<Error | null>(null);

  K8s.ingress.default.useApiList((data) => {
    const newOAuthIngresses = data.filter((ingress) => {
      return 'nginx.ingress.kubernetes.io/auth-url' in ingress.metadata.annotations;
    });
    setOAuthIngresses(newOAuthIngresses);
  }, setError);

  const columns = useColumns();

  return (
    <PageWithSubMenu list={menu}>
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant={'h1'} gutterBottom>
              {SSO_INTEGRATION_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {SSO_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={EDP_OPERATOR_GUIDE.O_AUTH.url} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          {!ssoSecret && !isLoading && (
            <Grid item xs={12}>
              <EmptyContent color={'textSecondary'}>No SSO integration secrets found</EmptyContent>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom component="span">
              Ingresses
            </Typography>
            <Table<KubeObjectInterface>
              isLoading={OAuthIngresses === null}
              data={OAuthIngresses}
              error={error?.toString()}
              columns={columns}
            />
          </Grid>
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
