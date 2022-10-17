import { EDPCodebaseSpecInterface } from '../../../k8s/EDPCodebase/types';
import { MuiCore, React } from '../../../plugin.globals';
import { NameValueTableRow } from '../../HeadlampNameValueTable/types';
import { Render } from '../../Render';

const { Typography } = MuiCore;

export const useColumns = (
    codebaseSpec: EDPCodebaseSpecInterface,
    classes: { [key: string]: string }
) =>
    React.useMemo(() => {
        const base: NameValueTableRow[] = [
            {
                name: 'Job Provisioning',
                value: codebaseSpec.jobProvisioning,
            },
            {
                name: 'CI Tool',
                value: codebaseSpec.ciTool,
            },
            {
                name: 'Deployment Script',
                value: codebaseSpec.deploymentScript,
            },
            {
                name: 'Jenkins Agent',
                value: codebaseSpec.jenkinsSlave,
            },
            {
                name: 'Jira Server',
                value: codebaseSpec.jiraServer,
            },
            {
                name: 'Jira Issue Metadata Payload',
                value: (
                    <Render condition={!!codebaseSpec.jiraIssueMetadataPayload}>
                        <Typography className={classes.statusLabel} component="span">
                            {codebaseSpec.jiraIssueMetadataPayload}
                        </Typography>
                    </Render>
                ),
            },
            {
                name: 'Commit Message Pattern',
                value: (
                    <Render condition={!!codebaseSpec.commitMessagePattern}>
                        <Typography className={classes.statusLabel} component="span">
                            {codebaseSpec.commitMessagePattern}
                        </Typography>
                    </Render>
                ),
            },
            {
                name: 'Ticket Name Pattern',
                value: (
                    <Render condition={!!codebaseSpec.ticketNamePattern}>
                        <Typography className={classes.statusLabel} component="span">
                            {codebaseSpec.ticketNamePattern}
                        </Typography>
                    </Render>
                ),
            },
        ];

        if (codebaseSpec.gitUrlPath) {
            base.push({
                name: 'Git URL Path',
                value: codebaseSpec.gitUrlPath,
            });
        }

        if (codebaseSpec.repository) {
            base.push({
                name: 'Repository URL',
                value: codebaseSpec.repository.url,
            });
        }

        return base;
    }, [codebaseSpec, classes]);
