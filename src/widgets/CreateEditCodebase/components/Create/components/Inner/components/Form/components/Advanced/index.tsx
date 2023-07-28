import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../../../../../../../components/Render';
import { CI_TOOLS } from '../../../../../../../../../../constants/ciTools';
import { useDefaultCIToolQuery } from '../../../../../../../../../../k8s/EDPComponent/hooks/useDefaultCIToolQuery';
import { useJiraServerNameListQuery } from '../../../../../../../../../../k8s/JiraServer/hooks/useJiraServerNameListQuery';
import { CODEBASE_FORM_NAMES } from '../../../../../../../../names';
import {
    AdvancedJiraMapping,
    CodebaseVersioning,
    CommitMessagePattern,
    DefaultBranch,
    JenkinsAgent,
    JiraServer,
    JiraServerIntegration,
    JobProvisioning,
    TicketNamePattern,
} from '../../../../../../../fields';
import { CreateCodebaseFormValues } from '../../../../../../types';

export const Advanced = () => {
    const { watch } = useFormContext<CreateCodebaseFormValues>();

    const hasJiraServerIntegrationFieldValue = watch(
        CODEBASE_FORM_NAMES.hasJiraServerIntegration.name
    );
    const chosenCiToolFieldValue = watch(CODEBASE_FORM_NAMES.ciTool.name);
    const { data: jiraServersNames } = useJiraServerNameListQuery();
    const { data: defaultCITool } = useDefaultCIToolQuery();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <DefaultBranch />
            </Grid>
            <Render condition={chosenCiToolFieldValue === CI_TOOLS.JENKINS}>
                <>
                    <Grid item xs={12}>
                        <JenkinsAgent />
                    </Grid>
                    <Grid item xs={12}>
                        <JobProvisioning />
                    </Grid>
                </>
            </Render>
            <Grid item xs={12}>
                <CodebaseVersioning />
            </Grid>
            <Render condition={defaultCITool === CI_TOOLS.TEKTON}>
                <Grid item xs={12}>
                    <CommitMessagePattern />
                </Grid>
            </Render>
            <Grid item xs={12}>
                <JiraServerIntegration />
            </Grid>

            {jiraServersNames && jiraServersNames.length && hasJiraServerIntegrationFieldValue ? (
                <>
                    <Grid item xs={12}>
                        <JiraServer />
                    </Grid>
                    <Render condition={defaultCITool === CI_TOOLS.JENKINS}>
                        <Grid item xs={12}>
                            <CommitMessagePattern />
                        </Grid>
                    </Render>
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
