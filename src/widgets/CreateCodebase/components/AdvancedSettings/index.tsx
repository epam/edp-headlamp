import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
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
} from '../../../../components/FormFields/CodebaseFields';
import { Render } from '../../../../components/Render';
import { CI_TOOLS } from '../../../../constants/ciTools';
import { useDefaultCIToolQuery } from '../../../../k8s/EDPComponent/hooks/useDefaultCIToolQuery';
import { useJiraServerNameListQuery } from '../../../../k8s/JiraServer/hooks/useJiraServerNameListQuery';
import { FormDataContext } from '../../index';

export const AdvancedSettings = () => {
    const { names, handleFormFieldChange } = React.useContext(FormDataContext);

    const { watch } = useFormContext();

    const hasJiraServerIntegrationFieldValue = watch(names.hasJiraServerIntegration.name);
    const chosenCiToolFieldValue = watch(names.ciTool.name);
    const { data: jiraServersNames } = useJiraServerNameListQuery();
    const { data: defaultCITool } = useDefaultCIToolQuery();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <DefaultBranch names={names} handleFormFieldChange={handleFormFieldChange} />
            </Grid>
            <Render condition={chosenCiToolFieldValue === CI_TOOLS.JENKINS}>
                <>
                    <Grid item xs={12}>
                        <JenkinsAgent names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <JobProvisioning
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                    </Grid>
                </>
            </Render>
            <Grid item xs={12}>
                <CodebaseVersioning names={names} handleFormFieldChange={handleFormFieldChange} />
            </Grid>
            <Render condition={defaultCITool === CI_TOOLS.TEKTON}>
                <Grid item xs={12}>
                    <CommitMessagePattern
                        names={names}
                        handleFormFieldChange={handleFormFieldChange}
                    />
                </Grid>
            </Render>
            <Grid item xs={12}>
                <JiraServerIntegration
                    names={names}
                    handleFormFieldChange={handleFormFieldChange}
                />
            </Grid>

            {jiraServersNames && jiraServersNames.length && hasJiraServerIntegrationFieldValue ? (
                <>
                    <Grid item xs={12}>
                        <JiraServer names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                    <Render condition={defaultCITool === CI_TOOLS.JENKINS}>
                        <Grid item xs={12}>
                            <CommitMessagePattern
                                names={names}
                                handleFormFieldChange={handleFormFieldChange}
                                required
                            />
                        </Grid>
                    </Render>
                    <Grid item xs={12}>
                        <TicketNamePattern
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AdvancedJiraMapping
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                    </Grid>
                </>
            ) : null}
        </Grid>
    );
};
