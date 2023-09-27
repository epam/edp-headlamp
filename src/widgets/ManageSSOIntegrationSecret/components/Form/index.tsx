import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { Render } from '../../../../components/Render';
import { useFormContext } from '../../../../providers/Form/hooks';
import { ManageSSOIntegrationSecretFormDataContext } from '../../types';
import { Password, User } from '../fields';

export const Form = () => {
    const {
        formData: { currentElement, isReadOnly },
    } = useFormContext<ManageSSOIntegrationSecretFormDataContext>();

    const owner =
        currentElement !== 'placeholder' && currentElement?.metadata?.ownerReferences?.[0].kind;
    return (
        <Grid container spacing={2}>
            <Render condition={isReadOnly}>
                <Grid item xs={12}>
                    <Alert severity="info" variant="outlined">
                        Managed by {owner}
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
