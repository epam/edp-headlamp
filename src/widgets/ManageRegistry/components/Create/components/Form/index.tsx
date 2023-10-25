import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormDataContext } from 'react-hook-form';
import { Render } from '../../../../../../components/Render';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../../k8s/ConfigMap/constants';
import { REGISTRY_NAMES } from '../../../../names';
import {
    IrsaRoleArn,
    Password,
    RegistryEndpoint,
    RegistrySpace,
    Type,
    User,
    UseSameAccount,
} from '../../../fields';

export const Form = () => {
    const { watch } = useReactHookFormDataContext();

    const registryTypeFieldValue = watch(REGISTRY_NAMES.REGISTRY_TYPE);
    const useSameAccountFieldValue = watch(REGISTRY_NAMES.USE_SAME_ACCOUNT);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Type />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <RegistryEndpoint />
                    </Grid>
                    <Grid item xs={6}>
                        <RegistrySpace />
                    </Grid>
                </Grid>
            </Grid>
            <Render condition={registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.ECR}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={'h6'}>Authentication</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <IrsaRoleArn />
                        </Grid>
                    </Grid>
                </Grid>
            </Render>
            <Render
                condition={
                    registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.DOCKER_HUB ||
                    registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.HARBOR
                }
            >
                <>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant={'h6'}>Push Account</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <User name={REGISTRY_NAMES.PUSH_ACCOUNT_USER} />
                            </Grid>
                            <Grid item xs={6}>
                                <Password name={REGISTRY_NAMES.PUSH_ACCOUNT_PASSWORD} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant={'h6'}>Pull Account</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <UseSameAccount />
                            </Grid>
                            <Render condition={!useSameAccountFieldValue}>
                                <>
                                    <Grid item xs={6}>
                                        <User name={REGISTRY_NAMES.PULL_ACCOUNT_USER} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Password name={REGISTRY_NAMES.PULL_ACCOUNT_PASSWORD} />
                                    </Grid>
                                </>
                            </Render>
                        </Grid>
                    </Grid>
                </>
            </Render>
        </Grid>
    );
};
