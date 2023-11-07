import { Icon } from '@iconify/react';
import { Grid, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormDataContext } from 'react-hook-form';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../../k8s/ConfigMap/constants';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../../types/forms';
import { REGISTRY_NAMES } from '../../../../names';
import { ManageRegistryDataContext } from '../../../../types';
import {
    IrsaRoleArn,
    PullAccountPassword,
    PullAccountUser,
    PushAccountPassword,
    PushAccountUser,
    RegistryEndpoint,
    RegistrySpace,
    UseSameAccount,
} from '../../../fields';

export const Form = () => {
    const { watch } = useReactHookFormDataContext();
    const {
        formData: { pushAccountSecret, pullAccountSecret },
    } = useFormContext<ManageRegistryDataContext>();

    const registryTypeFieldValue = watch(REGISTRY_NAMES.REGISTRY_TYPE);
    const useSameAccountFieldValue = watch(REGISTRY_NAMES.USE_SAME_ACCOUNT);
    const pushAccountOwnerReference = pushAccountSecret?.metadata?.ownerReferences?.[0].kind;
    const pullAccountOwnerReference = pullAccountSecret?.metadata?.ownerReferences?.[0].kind;

    return (
        <Grid container spacing={4}>
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
                                <Grid container spacing={1} alignItems={'center'}>
                                    <Grid item>
                                        <Typography variant={'h6'}>Push Account</Typography>
                                    </Grid>
                                    {!!pushAccountOwnerReference && (
                                        <Grid item>
                                            <Tooltip
                                                title={`Managed by ${pushAccountOwnerReference}`}
                                            >
                                                <Icon
                                                    icon={ICONS.CLOUD_LOCK}
                                                    width={20}
                                                    style={{
                                                        display: 'block',
                                                    }}
                                                />
                                            </Tooltip>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <PushAccountUser mode={FORM_MODES.EDIT} />
                            </Grid>
                            <Grid item xs={6}>
                                <PushAccountPassword mode={FORM_MODES.EDIT} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container spacing={1} alignItems={'center'}>
                                    <Grid item>
                                        <Typography variant={'h6'}>Pull Account</Typography>
                                    </Grid>
                                    {!!pullAccountOwnerReference && (
                                        <Grid item>
                                            <Tooltip
                                                title={`Managed by ${pullAccountOwnerReference}`}
                                            >
                                                <Icon
                                                    icon={ICONS.CLOUD_LOCK}
                                                    width={20}
                                                    style={{
                                                        display: 'block',
                                                    }}
                                                />
                                            </Tooltip>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <UseSameAccount />
                            </Grid>
                            {!useSameAccountFieldValue && (
                                <>
                                    <Grid item xs={6}>
                                        <PullAccountUser mode={FORM_MODES.EDIT} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <PullAccountPassword mode={FORM_MODES.EDIT} />
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
