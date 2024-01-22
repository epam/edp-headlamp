import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { ManageDefectDojoIntegrationSecretFormDataContext } from '../../../../types';
import { ExternalURL, Token, URL } from '../../../fields';

export const Form = () => {
    const {
        formData: { ownerReference },
    } = useFormContext<ManageDefectDojoIntegrationSecretFormDataContext>();

    return (
        <Grid container spacing={2}>
            {ownerReference && (
                <Grid item xs={12}>
                    <Alert severity="info" variant="outlined">
                        Managed by {ownerReference}
                    </Alert>
                </Grid>
            )}
            <Grid item xs={12}>
                <ExternalURL />
            </Grid>
            <Grid item xs={12}>
                <URL />
            </Grid>
            <Grid item xs={12}>
                <Token />
            </Grid>
        </Grid>
    );
};
