import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { PipelineKubeObject } from '../../../../k8s/groups/Tekton/Pipeline';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { PipelineList } from '../../../../widgets/PipelineList';
import { menu } from '../../menu';
import { pageDescription } from './constants';

export const PageView = () => {
  const theme = useTheme();
  const [items, error] = PipelineKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  const isLoading = items === null;

  return (
    <PageWithSubMenu list={menu} title="Configuration">
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontSize={theme.typography.pxToRem(28)} color="primary.dark" gutterBottom>
              {pageDescription.label}
            </Typography>
            <Typography variant={'body1'}>
              {pageDescription.description} <LearnMoreLink url={pageDescription.docLink} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PipelineList pipelines={items} error={error} isLoading={isLoading} />
          </Grid>
          {!isLoading && items?.length === 0 && (
            <Grid item xs={12}>
              <EmptyContent color={'textSecondary'}>No pipelines found</EmptyContent>
            </Grid>
          )}
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
