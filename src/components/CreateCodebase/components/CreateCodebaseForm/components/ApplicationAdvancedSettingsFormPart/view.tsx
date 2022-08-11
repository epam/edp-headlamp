import { useFormContext } from 'react-hook-form';
import { getJenkinsSlaves } from '../../../../../../k8s/common/getJenkinsSlaves';
import { getJiraServers } from '../../../../../../k8s/common/getJiraServers';
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
} from '../fields';
import { ApplicationAdvancedSettingsFormPartProps } from './types';

const { Grid } = MuiCore;

export const ApplicationAdvancedSettingsFormPart = ({
    names,
    handleFormFieldChange,
}: ApplicationAdvancedSettingsFormPartProps): React.ReactElement => {
    const { watch, setValue } = useFormContext();

    const [jenkinsSlaves, setJenkinsSlaves] = React.useState<string[]>([]);
    const [jiraServers, setJiraServers] = React.useState<string[]>([]);
    const fetchJenkinsSlaves = React.useCallback(async (namespace: string) => {
        const slavesArray = await getJenkinsSlaves(namespace);
        setJenkinsSlaves(slavesArray);
    }, []);

    const fetchJiraServers = React.useCallback(async (namespace: string) => {
        const jiraServers = await getJiraServers(namespace);
        setJiraServers(jiraServers);
    }, []);
    const namespaceFieldValue = watch(names.namespace.name);
    const jiraServerFieldValue = watch(names.jiraServer.name);
    const hasJiraServerIntegrationFieldValue = watch(names.hasJiraServerIntegration.name);
    const versioningStartFromFieldValue = watch(names.versioningStartFrom.name);

    React.useEffect(() => {
        if (jiraServerFieldValue) {
            setValue(names.hasJiraServerIntegration.name, true);
        }
    }, [jiraServerFieldValue, names.hasJiraServerIntegration.name, setValue]);

    React.useEffect(() => {
        if (versioningStartFromFieldValue) {
            const [version, snapshot] = versioningStartFromFieldValue.split('-');
            setValue(names.versioningStartFromVersion.name, version);
            setValue(names.versioningStartFromSnapshot.name, snapshot);
        }
    }, [
        names.versioningStartFromSnapshot.name,
        names.versioningStartFromVersion.name,
        setValue,
        versioningStartFromFieldValue,
    ]);

    React.useEffect(() => {
        if (namespaceFieldValue) {
            fetchJenkinsSlaves(namespaceFieldValue).catch(console.error);
            fetchJiraServers(namespaceFieldValue).catch(console.error);
        }
    }, [fetchJenkinsSlaves, fetchJiraServers, namespaceFieldValue]);

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
                />
                {hasJiraServerIntegrationFieldValue ? (
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
