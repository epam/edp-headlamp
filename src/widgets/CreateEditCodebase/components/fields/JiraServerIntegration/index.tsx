import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DocLink } from '../../../../../components/DocLink';
import { EDP_OPERATOR_GUIDE } from '../../../../../constants/urls';
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
                            label={
                                <FormControlLabelWithTooltip label={'Integrate with Jira server'} />
                            }
                            control={control}
                            errors={errors}
                            disabled={jiraServersNames && !jiraServersNames.length}
                        />
                    </Grid>
                    <Grid item>
                        <DocLink href={EDP_OPERATOR_GUIDE.JIRA.url} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
