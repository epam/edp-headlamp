import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { ManageJiraIntegrationSecretFormDataContext } from '../../../../types';
import { Password, User } from '../../../fields';

export const Form = () => {
    const {
        formData: { ownerReference },
    } = useFormContext<ManageJiraIntegrationSecretFormDataContext>();

    return (
        <Grid container spacing={2}>
            {ownerReference && (
                <Grid item xs={12}>
                    <Alert severity="info" variant="outlined">
                        Managed by {ownerReference}
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
