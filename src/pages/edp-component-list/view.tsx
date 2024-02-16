import { Grid, Typography } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../components/LearnMoreLink';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { ComponentList } from './components/ComponentList';
import { ComponentListFilter } from './components/ComponentListFilter';

export const PageView = () => {
  const [gitServers] = EDPGitServerKubeObject.useList();
  const noGitServers = gitServers === null || !gitServers?.length;

  return (
    <PageWrapper>
      <Section
        title={
          <Grid container alignItems={'center'} spacing={1}>
            <Grid item>
              <Typography variant={'h1'}>Components</Typography>
            </Grid>
          </Grid>
        }
        description={
          <>
            Create, view, and manage diverse codebases, encompassing applications, libraries,
            autotests, and Terraform infrastructure code.{' '}
            <LearnMoreLink url={EDP_USER_GUIDE.APPLICATION_CREATE.url} />
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ComponentListFilter noGitServers={noGitServers} />
          </Grid>
          <Grid item xs={12}>
            <ResourceActionListContextProvider>
              <ComponentList noGitServers={noGitServers} />
            </ResourceActionListContextProvider>
          </Grid>
        </Grid>
      </Section>
    </PageWrapper>
  );
};
