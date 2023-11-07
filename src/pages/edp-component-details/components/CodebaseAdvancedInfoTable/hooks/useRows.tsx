import { NameValueTableRow } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Divider, Typography } from '@material-ui/core';
import React from 'react';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { EDPCodebaseSpecInterface } from '../../../../../k8s/EDPCodebase/types';

export const useRows = (
    codebaseSpec: EDPCodebaseSpecInterface,
    classes: { [key: string]: string }
) =>
    React.useMemo(() => {
        const base: NameValueTableRow[] = [
            {
                name: 'CI Tool',
                value: codebaseSpec.ciTool,
            },
        ];

        if (codebaseSpec.deploymentScript) {
            base.push({
                name: 'Deployment Script',
                value: codebaseSpec.deploymentScript,
            });
        }

        if (codebaseSpec.gitUrlPath) {
            base.push({
                name: 'Git URL Path',
                value: codebaseSpec.gitUrlPath,
            });
        }

        if (codebaseSpec.repository) {
            const title =
                codebaseSpec.strategy === CODEBASE_CREATION_STRATEGIES['CLONE']
                    ? 'Forked from'
                    : 'Repository URL';

            base.push({
                name: title,
                value: codebaseSpec.repository.url,
            });
        }

        if (codebaseSpec.jiraServer) {
            base.push({
                name: 'Jira Server',
                value: codebaseSpec.jiraServer,
            });
        }

        if (codebaseSpec.jiraIssueMetadataPayload) {
            const parsedJiraConfiguration: {
                components: string;
                fixVersions: string;
                labels: string;
            } = JSON.parse(codebaseSpec.jiraIssueMetadataPayload);
            const parsedJiraConfigurationEntries = Object.entries(parsedJiraConfiguration);

            base.push({
                name: 'Jira Issue Metadata Payload',
                value: !!codebaseSpec.jiraIssueMetadataPayload ? (
                    <>
                        {parsedJiraConfigurationEntries.map(([name, value], idx) => {
                            const key = `jiraProp::${idx}`;

                            return (
                                <div key={key}>
                                    {idx !== 0 && <Divider className={classes.divider} />}
                                    <div>
                                        <Typography
                                            className={classes.statusLabel}
                                            component="span"
                                        >
                                            {name}:
                                        </Typography>
                                        <Typography component="div" className={classes.valueField}>
                                            "{value}"
                                        </Typography>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : null,
            });
        }

        if (codebaseSpec.commitMessagePattern) {
            base.push({
                name: 'Commit Message Pattern',
                value: !!codebaseSpec.commitMessagePattern ? (
                    <Typography className={classes.statusLabel} component="span">
                        {codebaseSpec.commitMessagePattern}
                    </Typography>
                ) : null,
            });
        }

        if (codebaseSpec.ticketNamePattern) {
            base.push({
                name: 'Ticket Name Pattern',
                value: !!codebaseSpec.ticketNamePattern ? (
                    <Typography className={classes.statusLabel} component="span">
                        {codebaseSpec.ticketNamePattern}
                    </Typography>
                ) : null,
            });
        }

        return base;
    }, [codebaseSpec, classes]);
