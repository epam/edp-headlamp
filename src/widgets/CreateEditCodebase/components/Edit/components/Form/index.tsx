import { Grid } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useJiraServerNameListQuery } from '../../../../../../k8s/groups/EDP/JiraServer/hooks/useJiraServerNameListQuery';
import { CODEBASE_FORM_NAMES } from '../../../../names';
import {
  AdvancedJiraMapping,
  CommitMessagePattern,
  JiraServer,
  JiraServerIntegration,
  TicketNamePattern,
} from '../../../fields';
import { CodemieIntegration } from '../../../fields/CodemieIntegration';
import { EditCodebaseFormValues } from '../../types';

export const Form = () => {
  const { watch } = useFormContext<EditCodebaseFormValues>();

  const { data: jiraServersNames } = useJiraServerNameListQuery();

  const hasJiraServerIntegrationFieldValue = watch(
    CODEBASE_FORM_NAMES.hasJiraServerIntegration.name
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <CommitMessagePattern />
      </Grid>
      <Grid item xs={12}>
        <JiraServerIntegration />
      </Grid>
      <Grid item xs={12}>
        <CodemieIntegration />
      </Grid>
      {jiraServersNames && jiraServersNames.length && hasJiraServerIntegrationFieldValue ? (
        <>
          <Grid item xs={12}>
            <JiraServer />
          </Grid>
          <Grid item xs={12}>
            <TicketNamePattern />
          </Grid>
          <Grid item xs={12}>
            <AdvancedJiraMapping />
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};
