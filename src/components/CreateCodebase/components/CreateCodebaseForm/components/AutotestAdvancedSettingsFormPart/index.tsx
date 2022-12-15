import { useFormContext } from 'react-hook-form';
import { CI_TOOLS } from '../../../../../../constants/ciTools';
import { useJenkinsAgents } from '../../../../../../hooks/useJenkinsAgents';
import { useJiraServers } from '../../../../../../hooks/useJiraServers';
import { useNamespace } from '../../../../../../hooks/useNamespace';
import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary';
import {
    AdvancedJiraMapping,
    CITool,
    CodebaseVersioning,
    CommitMessagePattern,
    JenkinsAgent,
    JiraServer,
    JiraServerIntegration,
    JobProvisioning,
    TicketNamePattern,
} from '../../../../../FormFields/CodebaseFields';
import { Render } from '../../../../../Render';
import { useUpdateFieldsDependingOnChosenCITool } from '../../hooks/useUpdateFieldsDependingOnChosenCITool';
import { useUpdateJiraServerIntegrationValue } from '../../hooks/useUpdateJiraServerIntegrationValue';
import { useUpdateVersioningFields } from '../../hooks/useUpdateVersioningFields';
import { AutotestAdvancedSettingsFormPartProps } from './types';

const { Grid } = MuiCore;

export const AutotestAdvancedSettingsFormPart = ({
    names,
    handleFormFieldChange,
}: AutotestAdvancedSettingsFormPartProps): React.ReactElement => {
    const { watch, setValue } = useFormContext();

    const hasJiraServerIntegrationFieldValue = watch(names.hasJiraServerIntegration.name);
    const chosenCiToolFieldValue = watch(names.ciTool.name);
    const { namespace } = useNamespace();
    const { jiraServers } = useJiraServers({ namespace });
    const { jenkinsAgents } = useJenkinsAgents({ namespace });

    useUpdateJiraServerIntegrationValue({ watch, setValue, names });
    useUpdateVersioningFields({ watch, setValue, names, handleFormFieldChange });
    useUpdateFieldsDependingOnChosenCITool({ watch, names, handleFormFieldChange });

    return (
        <ErrorBoundary>
            <Grid container spacing={2}>
                <CITool names={names} handleFormFieldChange={handleFormFieldChange} />
                <Render condition={chosenCiToolFieldValue === CI_TOOLS['JENKINS']}>
                    <>
                        <JenkinsAgent
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                            jenkinsAgents={jenkinsAgents}
                        />
                        <JobProvisioning
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                    </>
                </Render>
                <CodebaseVersioning names={names} handleFormFieldChange={handleFormFieldChange} />
                <JiraServerIntegration
                    names={names}
                    handleFormFieldChange={handleFormFieldChange}
                    jiraServers={jiraServers}
                />
                {jiraServers.length && hasJiraServerIntegrationFieldValue ? (
                    <>
                        <JiraServer
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                            jiraServers={jiraServers}
                        />
                        <CommitMessagePattern
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                        <TicketNamePattern
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                        <AdvancedJiraMapping
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                    </>
                ) : null}
            </Grid>
        </ErrorBoundary>
    );
};
