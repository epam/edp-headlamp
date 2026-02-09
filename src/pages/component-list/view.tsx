import { Stack } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../components/LearnMoreLink';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList/provider';
import { ComponentList } from './components/ComponentList';

export const PageView = () => {
  return (
    <PageWrapper>
      <Section
        title="Components"
        description={
          <>
            Create, view, and manage diverse codebases, encompassing applications, libraries,
            autotests, and Terraform infrastructure code.{' '}
            <LearnMoreLink url={EDP_USER_GUIDE.APPLICATION_CREATE.url} />
          </>
        }
      >
        <Stack spacing={2}>
          <div>
            <Stack direction="row" alignItems={'flex-end'} justifyContent={'flex-end'}></Stack>
          </div>
          <ResourceActionListContextProvider>
            <ComponentList />
          </ResourceActionListContextProvider>
        </Stack>
      </Section>
    </PageWrapper>
  );
};
