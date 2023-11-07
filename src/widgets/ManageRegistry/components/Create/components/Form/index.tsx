import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormDataContext } from 'react-hook-form';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../../k8s/ConfigMap/constants';
import { FORM_MODES } from '../../../../../../types/forms';
import { REGISTRY_NAMES } from '../../../../names';
import {
    IrsaRoleArn,
    PullAccountPassword,
    PullAccountUser,
    PushAccountPassword,
    PushAccountUser,
    RegistryEndpoint,
    RegistrySpace,
    Type,
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
            {registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.ECR && (
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
            )}
            {(registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.DOCKER_HUB ||
                registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.HARBOR) && (
                <>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant={'h6'}>Push Account</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <PushAccountUser mode={FORM_MODES.CREATE} />
                            </Grid>
                            <Grid item xs={6}>
                                <PushAccountPassword mode={FORM_MODES.CREATE} />
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
                            {!useSameAccountFieldValue && (
                                <>
                                    <Grid item xs={6}>
                                        <PullAccountUser mode={FORM_MODES.CREATE} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <PullAccountPassword mode={FORM_MODES.CREATE} />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </>
            )}
        </Grid>
    );
};
