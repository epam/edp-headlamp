import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography } from '@mui/material';
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
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageNexusCI } from '../../../../widgets/ManageNexusCI';
import { menu } from '../../menu';
import { NEXUS_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const [nexusSecrets, nexusSecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=${SYSTEM_QUICK_LINKS.NEXUS}`,
  });

  const [nexusQuickLink, nexusQuickLinkError] = QuickLinkKubeObject.useGet(
    SYSTEM_QUICK_LINKS.NEXUS,
    getDefaultNamespace()
  );

  const error = nexusSecretsError || nexusQuickLinkError;
  const isLoading = (nexusSecrets === null || nexusQuickLink === null) && !error;

  const nexusSecret = nexusSecrets?.[0]?.jsonData;
  const mode = !!nexusSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const ownerReference = nexusSecret?.metadata?.ownerReferences?.[0]?.kind;

  return (
    <PageWithSubMenu list={menu}>
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant={'h1'} gutterBottom>
              {NEXUS_INTEGRATION_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {NEXUS_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={EDP_OPERATOR_GUIDE.NEXUS.url} />
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
                  <ManageNexusCI
                    formData={{
                      nexusSecret,
                      nexusQuickLink: nexusQuickLink?.jsonData,
                      ownerReference,
                      mode,
                    }}
                  />
                </LoadingWrapper>
              </Grid>
            )}
            {!nexusSecret && !isLoading && !error && (
              <Grid item xs={12}>
                <EmptyContent color={'textSecondary'}>
                  No Nexus integration secrets found
                </EmptyContent>
              </Grid>
            )}
          </Grid>
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
