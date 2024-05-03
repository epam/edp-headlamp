import { Typography, useTheme } from '@mui/material';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { PipelineRunListWithFilter } from './components/PipelineRunList';

export const PageView = () => {
  const theme = useTheme();

  return (
    <PageWrapper>
      <Section
        title={
          <Typography color="primary.dark" fontSize={theme.typography.pxToRem(28)}>
            Pipelines
          </Typography>
        }
        description={'Monitor the progress of overall pipeline runs launched within the platform.'}
      >
        <PipelineRunListWithFilter />
      </Section>
    </PageWrapper>
  );
};
