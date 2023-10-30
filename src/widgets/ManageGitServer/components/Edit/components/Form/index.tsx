import { Grid } from '@material-ui/core';
import React from 'react';
import {
    GitProvider,
    HostName,
    HTTPSPort,
    NameSSHKeySecret,
    SSHPort,
    UserName,
} from '../../../fields';

export const Form = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <GitProvider />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <HostName />
                        </Grid>
                        <Grid item xs={6}>
                            <UserName />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <SSHPort />
                        </Grid>
                        <Grid item xs={6}>
                            <HTTPSPort />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <NameSSHKeySecret />
                </Grid>
            </Grid>
        </>
    );
};
