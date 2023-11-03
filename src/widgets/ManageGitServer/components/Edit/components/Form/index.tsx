import { Icon } from '@iconify/react';
import { Grid, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../../../components/Render';
import { GIT_PROVIDERS } from '../../../../../../constants/gitProviders';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { ManageGitServerDataContext } from '../../../../types';
import {
    GitProvider,
    HostName,
    HTTPSPort,
    SecretString,
    SSHPort,
    SSHPrivateKey,
    SSHPublicKey,
    Token,
    UserName,
} from '../../../fields';

export const Form = () => {
    const {
        formData: { gitServer, gitServerSecret },
    } = useFormContext<ManageGitServerDataContext>();
    const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems={'center'}>
                                <Grid item>
                                    <Typography variant={'h6'}>Credentials</Typography>
                                </Grid>
                                <Render condition={!!gitServerSecretOwnerReference}>
                                    <Grid item>
                                        <Tooltip
                                            title={`Managed by ${gitServerSecretOwnerReference}`}
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
                                </Render>
                            </Grid>
                        </Grid>
                        <Render condition={gitServer.spec.gitProvider === GIT_PROVIDERS.GERRIT}>
                            <>
                                <Grid item xs={6}>
                                    <SSHPrivateKey />
                                </Grid>
                                <Grid item xs={6}>
                                    <SSHPublicKey />
                                </Grid>
                            </>
                        </Render>
                        <Render condition={gitServer.spec.gitProvider === GIT_PROVIDERS.GITLAB}>
                            <>
                                <Grid item xs={6}>
                                    <SSHPrivateKey />
                                </Grid>
                                <Grid item xs={6}>
                                    <SecretString />
                                </Grid>
                                <Grid item xs={6}>
                                    <Token />
                                </Grid>
                            </>
                        </Render>
                        <Render condition={gitServer.spec.gitProvider === GIT_PROVIDERS.GITHUB}>
                            <>
                                <Grid item xs={6}>
                                    <SSHPrivateKey />
                                </Grid>
                                <Grid item xs={6}>
                                    <Token />
                                </Grid>
                            </>
                        </Render>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
