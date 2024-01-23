import { Icon } from '@iconify/react';
import { Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormDataContext } from 'react-hook-form';
import { StatusIcon } from '../../../../../../../../components/StatusIcon';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../../../../../k8s/Secret';
import {
  SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED,
  SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR,
} from '../../../../../../../../k8s/Secret/annotations';
import { useFormContext } from '../../../../../../../../providers/Form/hooks';
import { rem } from '../../../../../../../../utils/styling/rem';
import { REGISTRY_NAMES } from '../../../../../../names';
import { ManageRegistryDataContext } from '../../../../../../types';
import {
  PullAccountPassword,
  PullAccountUser,
  PushAccountPassword,
  PushAccountUser,
  UseSameAccount,
} from '../../../../../fields';

export const DockerHubOrHarborFormPart = () => {
  const { watch } = useReactHookFormDataContext();
  const {
    formData: { pushAccountSecret, pullAccountSecret },
  } = useFormContext<ManageRegistryDataContext>();

  const useSameAccountFieldValue = watch(REGISTRY_NAMES.USE_SAME_ACCOUNT);

  const pushAccountOwnerReference = pushAccountSecret?.metadata?.ownerReferences?.[0].kind;
  const pullAccountOwnerReference = pullAccountSecret?.metadata?.ownerReferences?.[0].kind;

  const pushAccountConnected =
    pushAccountSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED];
  const pushAccountError =
    pushAccountSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR];

  const [pushAccountIcon, pushAccountIconColor] =
    SecretKubeObject.getStatusIcon(pushAccountConnected);

  const pullAccountConnected =
    pullAccountSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED];
  const pullAccountError =
    pullAccountSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR];

  const [pullAccountIcon, pullAccountIconColor] =
    SecretKubeObject.getStatusIcon(pullAccountConnected);

  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <StatusIcon
                  icon={pushAccountIcon}
                  color={pushAccountIconColor}
                  Title={
                    <>
                      <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                        {`Connected: ${
                          pushAccountConnected === undefined ? 'Unknown' : pushAccountConnected
                        }`}
                      </Typography>
                      {!!pushAccountError && (
                        <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                          {pushAccountError}
                        </Typography>
                      )}
                    </>
                  }
                  width={20}
                />
              </Grid>
              <Grid item>
                <Typography variant={'h6'}>Push Account</Typography>
              </Grid>
              {!!pushAccountOwnerReference && (
                <Grid item>
                  <Tooltip title={`Managed by ${pushAccountOwnerReference}`}>
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
            <PushAccountUser />
          </Grid>
          <Grid item xs={6}>
            <PushAccountPassword />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <StatusIcon
                  icon={pullAccountIcon}
                  color={pullAccountIconColor}
                  Title={
                    <>
                      <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                        {`Connected: ${
                          pullAccountConnected === undefined ? 'Unknown' : pullAccountConnected
                        }`}
                      </Typography>
                      {!!pullAccountError && (
                        <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                          {pullAccountError}
                        </Typography>
                      )}
                    </>
                  }
                  width={20}
                />
              </Grid>
              <Grid item>
                <Typography variant={'h6'}>Pull Account</Typography>
              </Grid>
              {!!pullAccountOwnerReference && (
                <Grid item>
                  <Tooltip title={`Managed by ${pullAccountOwnerReference}`}>
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
                <PullAccountUser />
              </Grid>
              <Grid item xs={6}>
                <PullAccountPassword />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
