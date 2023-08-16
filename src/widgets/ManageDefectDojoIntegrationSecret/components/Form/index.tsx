import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { Render } from '../../../../components/Render';
import { useFormContext } from '../../../../providers/Form/hooks';
import { ManageDefectDojoIntegrationSecretFormDataContext } from '../../types';
import { Token, Url } from '../fields';

export const Form = () => {
    const {
        formData: { isReadOnly },
    } = useFormContext<ManageDefectDojoIntegrationSecretFormDataContext>();

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
                <Url />
            </Grid>
            <Grid item xs={6}>
                <Token />
            </Grid>
        </Grid>
    );
};
