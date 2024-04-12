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
import { ManageDependencyTrackCI } from '../../../../widgets/ManageDependencyTrackCI';
import { menu } from '../../menu';
import { DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const theme = useTheme();
  const [dependencyTrackSecrets, dependencyTrackSecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=${SYSTEM_QUICK_LINKS.DEPENDENCY_TRACK}`,
  });

  const [depTrackQuickLink, depTrackQuickLinkError] = QuickLinkKubeObject.useGet(
    SYSTEM_QUICK_LINKS.DEPENDENCY_TRACK
  );

  const dependencyTrackSecret = dependencyTrackSecrets?.[0]?.jsonData;

  const mode = !!dependencyTrackSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const ownerReference = dependencyTrackSecret?.metadata?.ownerReferences?.[0]?.kind;

  const error = dependencyTrackSecretsError || depTrackQuickLinkError;
  const forbiddenError = getForbiddenError(error);
  const isLoading = (dependencyTrackSecrets === null || depTrackQuickLink === null) && !error;

  return (
    <PageWithSubMenu list={menu} title="Configuration">
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontSize={theme.typography.pxToRem(28)} color="primary.dark" gutterBottom>
              {DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={EDP_OPERATOR_GUIDE.DEPENDENCY_TRACK.url} />
            </Typography>
          </Grid>
          {forbiddenError ? (
            <Grid item xs={12}>
              <ErrorContent error={forbiddenError} outlined />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <LoadingWrapper isLoading={isLoading}>
                <ManageDependencyTrackCI
                  formData={{
                    dependencyTrackSecret,
                    depTrackQuickLink: depTrackQuickLink?.jsonData,
                    ownerReference,
                    mode,
                  }}
                />
              </LoadingWrapper>
            </Grid>
          )}
          {!dependencyTrackSecret && !isLoading && !error && (
            <Grid item xs={12}>
              <EmptyContent color={'textSecondary'}>
                No DependencyTrack integration secrets found
              </EmptyContent>
            </Grid>
          )}
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
