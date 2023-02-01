import { useFormContext } from 'react-hook-form';
import { CI_TOOLS } from '../../../../../../constants/ciTools';
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
import { FormDataContext } from '../../index';

const { Grid } = MuiCore;

export const AdvancedSettings = (): React.ReactElement => {
    const { names, handleFormFieldChange } = React.useContext(FormDataContext);

    const { watch, setValue } = useFormContext();

    const hasJiraServerIntegrationFieldValue = watch(names.hasJiraServerIntegration.name);
    const { namespace } = useNamespace();
    const chosenCiToolFieldValue = watch(names.ciTool.name);
    const { jiraServers } = useJiraServers({ namespace });

    useUpdateJiraServerIntegrationValue({ watch, setValue, names });
    useUpdateVersioningFields({ watch, setValue, names, handleFormFieldChange });
    useUpdateFieldsDependingOnChosenCITool({ watch, names, handleFormFieldChange });

    return (
        <ErrorBoundary>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CITool names={names} handleFormFieldChange={handleFormFieldChange} />
                </Grid>
                <Render condition={chosenCiToolFieldValue === CI_TOOLS['JENKINS']}>
                    <>
                        <Grid item xs={12}>
                            <JenkinsAgent
                                names={names}
                                handleFormFieldChange={handleFormFieldChange}
                            />
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
                    <CodebaseVersioning
                        names={names}
                        handleFormFieldChange={handleFormFieldChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TicketNamePattern
                        names={names}
                        handleFormFieldChange={handleFormFieldChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <JiraServerIntegration
                        jiraServers={jiraServers}
                        names={names}
                        handleFormFieldChange={handleFormFieldChange}
                    />
                </Grid>

                {jiraServers.length && hasJiraServerIntegrationFieldValue ? (
                    <>
                        <Grid item xs={12}>
                            <JiraServer
                                jiraServers={jiraServers}
                                names={names}
                                handleFormFieldChange={handleFormFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CommitMessagePattern
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
        </ErrorBoundary>
    );
};
