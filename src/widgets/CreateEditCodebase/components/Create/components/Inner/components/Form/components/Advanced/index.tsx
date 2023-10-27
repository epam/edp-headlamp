import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useJiraServerNameListQuery } from '../../../../../../../../../../k8s/JiraServer/hooks/useJiraServerNameListQuery';
import { CODEBASE_FORM_NAMES } from '../../../../../../../../names';
import {
    AdvancedJiraMapping,
    CodebaseVersioning,
    CommitMessagePattern,
    DefaultBranch,
    JiraServer,
    JiraServerIntegration,
    TicketNamePattern,
} from '../../../../../../../fields';
import { CreateCodebaseFormValues } from '../../../../../../types';

export const Advanced = () => {
    const { watch } = useFormContext<CreateCodebaseFormValues>();

    const hasJiraServerIntegrationFieldValue = watch(
        CODEBASE_FORM_NAMES.hasJiraServerIntegration.name
    );
    const { data: jiraServersNames } = useJiraServerNameListQuery();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <DefaultBranch />
            </Grid>
            <Grid item xs={12}>
                <CodebaseVersioning />
            </Grid>
            <Grid item xs={12}>
                <CommitMessagePattern />
            </Grid>
            <Grid item xs={12}>
                <JiraServerIntegration />
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
