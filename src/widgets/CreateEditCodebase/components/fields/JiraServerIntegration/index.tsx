import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../../components/Render';
import { useJiraServerNameListQuery } from '../../../../../k8s/JiraServer/hooks/useJiraServerNameListQuery';
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
            <Render condition={jiraServersNames && !jiraServersNames.length}>
                <Grid item xs={12}>
                    <Alert severity="info" elevation={2} variant="filled">
                        There are no available Jira servers
                    </Alert>
                </Grid>
            </Render>
            <Grid item xs={12}>
                <FormCheckbox
                    {...register(CODEBASE_FORM_NAMES.hasJiraServerIntegration.name)}
                    label={<FormControlLabelWithTooltip label={'Integrate with Jira server'} />}
                    control={control}
                    errors={errors}
                    disabled={jiraServersNames && !jiraServersNames.length}
                />
            </Grid>
        </Grid>
    );
};
