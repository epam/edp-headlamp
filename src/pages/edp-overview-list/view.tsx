import { Grid } from '@mui/material';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { CDPipelinesGraph } from './components/CDPipelinesGraph';
import { CodebaseBranchesGraph } from './components/CodebaseBranchesGraph';
import { CodebasesGraph } from './components/CodebasesGraph';
import { ComponentList } from './components/ComponentList';
import { PipelineRunListOverview } from './components/PipelineRunList';
import { PipelineRunsGraph } from './components/PipelineRunsGraph';
import { StagesGraph } from './components/StagesGraph';

export const PageView = () => {
  return (
    <PageWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Section
            title={'Overview'}
            description={
              'Gain essential information on your codebase insights. Organize your menu for faster and more convenient access to different parts of the portal.'
            }
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4} lg={3} xl={'auto'} style={{ flexGrow: 1 }}>
                <CodebasesGraph />
              </Grid>
              <Grid item xs={6} sm={4} lg={3} xl={'auto'} style={{ flexGrow: 1 }}>
                <CodebaseBranchesGraph />
              </Grid>
              <Grid item xs={6} sm={4} lg={3} xl={'auto'} style={{ flexGrow: 1 }}>
                <PipelineRunsGraph />
              </Grid>
              <Grid item xs={6} sm={4} lg={3} xl={'auto'} style={{ flexGrow: 1 }}>
                <CDPipelinesGraph />
              </Grid>
              <Grid item xs={6} sm={4} lg={3} xl={'auto'} style={{ flexGrow: 1 }}>
                <StagesGraph />
              </Grid>
            </Grid>
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section
            title={'Links'}
            titleTooltip={'A set of icons with links that redirect you to corresponding tools.'}
          >
            <ComponentList />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section
            title={'Pipelines'}
            titleTooltip={
              'Monitor the progress of overall pipeline runs launched within the platform.'
            }
          >
            <PipelineRunListOverview />
          </Section>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};
