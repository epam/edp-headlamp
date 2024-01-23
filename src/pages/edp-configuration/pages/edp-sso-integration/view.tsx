import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageSSOCI } from '../../../../widgets/ManageSSOCI';
import { menu } from '../../menu';
import { SSO_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const [ssoSecrets] = SecretKubeObject.useList({
    namespace: getDefaultNamespace(),
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=keycloak`,
  });

  const ssoSecret = ssoSecrets?.[0]?.jsonData;

  const mode = !!ssoSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const ownerReference = ssoSecret?.metadata?.ownerReferences?.[0]?.kind;
  const isLoading = ssoSecret === null;

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
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
