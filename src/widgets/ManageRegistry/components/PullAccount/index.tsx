import { Icon } from '@iconify/react';
import { Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { StatusIcon } from '../../../../components/StatusIcon';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import {
  SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED,
  SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR,
} from '../../../../k8s/groups/default/Secret/annotations';
import { rem } from '../../../../utils/styling/rem';
import { useRegistryFormsContext } from '../../hooks/useRegistryFormsContext';
import { SHARED_FORM_NAMES } from '../../names';
import { useDataContext } from '../../providers/Data/hooks';
import { PullAccountPassword, PullAccountUser } from './fields';

export const PullAccountForm = () => {
  const { sharedForm } = useRegistryFormsContext();
  const { pullAccountSecret } = useDataContext();

  const useSameAccountFieldValue = sharedForm.watch(SHARED_FORM_NAMES.useSameAccount.name);

  const pullAccountOwnerReference = pullAccountSecret?.metadata?.ownerReferences?.[0].kind;

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
