import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { Render } from '../../../../components/Render';
import { useFormContext } from '../../../../providers/Form/hooks';
import { ManageJiraIntegrationSecretFormDataContext } from '../../types';
import { Password, User } from '../fields';

export const Form = () => {
    const {
        formData: { isReadOnly },
    } = useFormContext<ManageJiraIntegrationSecretFormDataContext>();

    return (
        <Grid container spacing={2}>
            <Render condition={isReadOnly}>
                <Grid item xs={12}>
                    <Alert severity="info" variant="outlined">
                        Managed by External Secret
                    </Alert>
                </Grid>
            </Render>
            <Grid item xs={6}>
                <User />
            </Grid>
            <Grid item xs={6}>
                <Password />
            </Grid>
        </Grid>
    );
};
