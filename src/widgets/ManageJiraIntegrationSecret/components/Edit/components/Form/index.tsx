import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { ManageJiraIntegrationSecretFormDataContext } from '../../../../types';
import { Password, User } from '../../../fields';

export const Form = () => {
    const {
        formData: { jiraServerSecret },
    } = useFormContext<ManageJiraIntegrationSecretFormDataContext>();
    const jiraServerSecretOwner = jiraServerSecret?.metadata?.ownerReferences?.[0].kind;

    return (
        <Grid container spacing={2}>
            {jiraServerSecretOwner && (
                <Grid item xs={12}>
                    <Alert severity="info" variant="outlined">
                        Managed by {jiraServerSecretOwner}
                    </Alert>
                </Grid>
            )}
            <Grid item xs={6}>
                <User />
            </Grid>
            <Grid item xs={6}>
                <Password />
            </Grid>
        </Grid>
    );
};
