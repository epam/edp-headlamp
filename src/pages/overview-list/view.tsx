import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../components/LearnMoreLink';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { AddNewWidgetCard } from './components/AddNewWidget';
import { CDPipelinesGraph } from './components/CDPipelinesGraph';
import { CodebaseBranchesGraph } from './components/CodebaseBranchesGraph';
import { CodebasesGraph } from './components/CodebasesGraph';
import { ComponentList } from './components/ComponentList';
import { PipelineRunsGraph } from './components/PipelineRunsGraph';
import { QuickLinkActions } from './components/QuickLinkActions';
import { StagesGraph } from './components/StagesGraph';
import { UserWidgetRenderer } from './components/UserWidgetsRenderer';
import { useUserWidgets } from './providers/UserWidgets';

export const PageView = () => {
  const theme = useTheme();

  const { userWidgets, setUserWidgets } = useUserWidgets();

  return (
    <PageWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Section
            title={'Overview'}
            description={
              <>
                Gain essential information on your codebase insights. Organize your menu for faster
                and more convenient access to different parts of the portal.{' '}
                <LearnMoreLink url={EDP_USER_GUIDE.OVERVIEW.url} />
              </>
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4} xl={4}>
                <CodebasesGraph />
              </Grid>
              <Grid item xs={6} sm={4} xl={4}>
                <CodebaseBranchesGraph />
              </Grid>
              <Grid item xs={6} sm={4} xl={4}>
                <PipelineRunsGraph />
              </Grid>
              <Grid item xs={6} sm={4} xl={4}>
                <CDPipelinesGraph />
              </Grid>
              <Grid item xs={6} sm={4} xl={4}>
                <StagesGraph />
              </Grid>
              {userWidgets.map((widget) => {
                return (
                  <Grid item xs={6} sm={4} xl={4} key={widget.type}>
                    <UserWidgetRenderer widgetConfig={widget} />
                  </Grid>
                );
              })}
              <Grid item xs={6} sm={4} xl={4}>
                <AddNewWidgetCard userWidgets={userWidgets} setUserWidgets={setUserWidgets} />
              </Grid>
            </Grid>
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section
            title={
              <Typography color="primary.dark" fontSize={theme.typography.pxToRem(28)}>
                Links
              </Typography>
            }
            description={'A set of icons with links that redirect you to corresponding tools.'}
          >
            <ComponentList />
            <QuickLinkActions />
          </Section>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};
