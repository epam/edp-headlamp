import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useFormContext } from '../../../../providers/Form/hooks';
import { ManageDependencyTrackIntegrationSecretFormDataContext } from '../../types';
import { Token, Url } from '../fields';

export const Form = () => {
    const {
        formData: { currentElement, isReadOnly },
    } = useFormContext<ManageDependencyTrackIntegrationSecretFormDataContext>();

    const owner =
        currentElement !== 'placeholder' && currentElement?.metadata?.ownerReferences?.[0].kind;

    return (
        <Grid container spacing={2}>
            {isReadOnly && (
                <Grid item xs={12}>
                    <Alert severity="info" variant="outlined">
                        Managed by {owner}
                    </Alert>
                </Grid>
            )}
            <Grid item xs={12}>
                <Url />
            </Grid>
            <Grid item xs={12}>
                <Token />
            </Grid>
        </Grid>
    );
};
