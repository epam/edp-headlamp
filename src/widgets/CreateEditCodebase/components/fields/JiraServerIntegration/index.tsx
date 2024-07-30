import { Grid } from '@mui/material';
import { Alert } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { LearnMoreLink } from '../../../../../components/LearnMoreLink';
import { EDP_OPERATOR_GUIDE } from '../../../../../constants/urls';
import { useJiraServerNameListQuery } from '../../../../../k8s/groups/EDP/JiraServer/hooks/useJiraServerNameListQuery';
import { FormCheckbox } from '../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const JiraServerIntegration = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateCodebaseFormValues>();

  const { data: jiraServersNames } = useJiraServerNameListQuery();

  return (
    <Grid container spacing={2}>
      {jiraServersNames && !jiraServersNames.length ? (
        <Grid item xs={12}>
          <Alert severity="info" variant="outlined">
            There are no available Jira servers
          </Alert>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <FormCheckbox
              {...register(CODEBASE_FORM_NAMES.hasJiraServerIntegration.name)}
              label={<FormControlLabelWithTooltip label={'Integrate with Jira server'} />}
              control={control}
              errors={errors}
              disabled={jiraServersNames && !jiraServersNames.length}
            />{' '}
          </Grid>
          <Grid item>
            <LearnMoreLink url={EDP_OPERATOR_GUIDE.JIRA.url} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
