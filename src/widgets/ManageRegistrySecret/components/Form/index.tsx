import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { Render } from '../../../../components/Render';
import { useFormContext } from '../../../../providers/Form/hooks';
import { ManageRegistrySecretFormDataContext } from '../../types';
import { Name, Password, RegistryEndpoint, User } from '../fields';

export const Form = () => {
    const {
        formData: { isReadOnly },
    } = useFormContext<ManageRegistrySecretFormDataContext>();

    return (
        <Grid container spacing={2}>
            <Render condition={isReadOnly}>
                <Grid item xs={12}>
                    <Alert severity="info" variant="outlined">
                        Managed by External Secret
                    </Alert>
                </Grid>
            </Render>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <RegistryEndpoint />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <User />
            </Grid>
            <Grid item xs={6}>
                <Password />
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <Name />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
