import { Theme } from '@material-ui/core/styles/createStyles';
import { EDPCodebaseSpecInterface } from '../../../../../k8s/EDPCodebase/types';

const {
    pluginLib: { React, MuiCore },
} = globalThis;
const { Typography } = MuiCore;

export const useColumns = (
    codebaseSpec: EDPCodebaseSpecInterface,
    classes: { [key: string]: string },
    theme: Theme
) =>
    React.useMemo(
        () => [
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
                    <Typography className={classes.statusLabel} component="span">
                        {codebaseSpec.jiraIssueMetadataPayload}
                    </Typography>
                ),
            },
            {
                name: 'Commit Message Pattern',
                value: (
                    <Typography className={classes.statusLabel} component="span">
                        {codebaseSpec.commitMessagePattern}
                    </Typography>
                ),
            },
            {
                name: 'Ticket Name Pattern',
                value: (
                    <Typography className={classes.statusLabel} component="span">
                        {codebaseSpec.ticketNamePattern}
                    </Typography>
                ),
            },
        ],
        [codebaseSpec, classes, theme]
    );
