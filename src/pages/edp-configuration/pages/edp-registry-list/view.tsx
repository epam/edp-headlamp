import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { ManageRegistry } from '../../../../widgets/ManageRegistry';
import { menu } from '../../menu';
import { REGISTRY_LIST_PAGE_DESCRIPTION } from './constants';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
  const {
    data: { EDPConfigMap, pullAccountSecret, pushAccountSecret, tektonServiceAccount },
    isLoading,
  } = useDynamicDataContext();

  return (
    <PageWithSubMenu list={menu}>
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant={'h1'} gutterBottom>
              {REGISTRY_LIST_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {REGISTRY_LIST_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={REGISTRY_LIST_PAGE_DESCRIPTION.docLink} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LoadingWrapper isLoading={isLoading}>
              <ManageRegistry
                formData={{
                  EDPConfigMap,
                  pullAccountSecret,
                  pushAccountSecret,
                  tektonServiceAccount,
                }}
              />
            </LoadingWrapper>
          </Grid>
          {!EDPConfigMap?.data?.container_registry_type && (
            <Grid item xs={12}>
              <EmptyContent color={'textSecondary'}>No registry integrations found</EmptyContent>
            </Grid>
          )}
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
