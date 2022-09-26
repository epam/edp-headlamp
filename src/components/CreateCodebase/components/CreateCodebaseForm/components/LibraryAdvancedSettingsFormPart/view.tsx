import { useFormContext } from 'react-hook-form';
import { useJenkinsSlaves } from '../../../../../../hooks/useJenkinsSlaves';
import { useJiraServers } from '../../../../../../hooks/useJiraServers';
import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary/view';
import {
    AdvancedJiraMapping,
    CITool,
    CodebaseVersioning,
    CommitMessagePattern,
    DeploymentScript,
    JenkinsSlave,
    JiraServer,
    JiraServerIntegration,
    JobProvisioning,
    TicketNamePattern,
} from '../../../../../FormFields/CodebaseFields';
import { useUpdateJiraServerIntegrationValue } from '../../hooks/useUpdateJiraServerIntegrationValue';
import { useUpdateVersioningFields } from '../../hooks/useUpdateVersioningFields';
import { LibraryAdvancedSettingsFormPartProps } from './types';

const { Grid } = MuiCore;

export const LibraryAdvancedSettingsFormPart = ({
    names,
    handleFormFieldChange,
}: LibraryAdvancedSettingsFormPartProps): React.ReactElement => {
    const { watch, setValue } = useFormContext();
    const hasJiraServerIntegrationFieldValue = watch(names.hasJiraServerIntegration.name);

    const namespaceFieldValue = watch(names.namespace.name);
    const { jiraServers } = useJiraServers({ namespace: namespaceFieldValue });
    const { jenkinsSlaves } = useJenkinsSlaves({ namespace: namespaceFieldValue });

    useUpdateJiraServerIntegrationValue({ watch, setValue, names });
    useUpdateVersioningFields({ watch, setValue, names });

    return (
        <ErrorBoundary>
            <Grid container spacing={2}>
                <JobProvisioning names={names} handleFormFieldChange={handleFormFieldChange} />
                <JenkinsSlave
                    names={names}
                    handleFormFieldChange={handleFormFieldChange}
                    jenkinsSlaves={jenkinsSlaves}
                />
                <CodebaseVersioning names={names} handleFormFieldChange={handleFormFieldChange} />
                <DeploymentScript names={names} handleFormFieldChange={handleFormFieldChange} />
                <CITool names={names} handleFormFieldChange={handleFormFieldChange} />
                <JiraServerIntegration
                    names={names}
                    handleFormFieldChange={handleFormFieldChange}
                    isDisabled={!jiraServers.length}
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
