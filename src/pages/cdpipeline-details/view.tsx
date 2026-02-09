import { Grid } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LearnMoreLink } from '../../components/LearnMoreLink';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { routeCDPipelineList } from '../cdpipeline-list/route';
import { HeaderActions } from './components/HeaderActions';
import { StageList } from './components/StageList';
import { StageListFilter } from './components/StageListFilter';
import { CDPipelineRouteParams } from './types';

export const PageView = () => {
  const { name } = useParams<CDPipelineRouteParams>();

  return (
    <PageWrapper
      breadcrumbs={[
        {
          label: 'Deployment Flows',
          url: {
            pathname: routeCDPipelineList.path,
          },
        },
        {
          label: name,
        },
      ]}
      headerSlot={<HeaderActions />}
    >
      <Section
        title={name}
        enableCopyTitle
        description={
          <>
            Defines the sequence and logic for promoting artifacts through various environments. It
            maps out an artifact's progression path from development to production.{' '}
            <LearnMoreLink url={EDP_USER_GUIDE.CD_PIPELINE_MANAGE.url} />
          </>
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <StageListFilter />
          </Grid>
          <Grid item xs={12} sx={{ pr: '2px' }}>
            <StageList />
          </Grid>
        </Grid>
      </Section>
    </PageWrapper>
  );
};
