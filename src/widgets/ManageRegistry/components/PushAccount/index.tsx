import { Icon } from '@iconify/react';
import { Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { StatusIcon } from '../../../../components/StatusIcon';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { CONTAINER_REGISTRY_TYPE } from '../../../../k8s/groups/default/ConfigMap/constants';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import {
  SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED,
  SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR,
} from '../../../../k8s/groups/default/Secret/annotations';
import { rem } from '../../../../utils/styling/rem';
import { useRegistryFormsContext } from '../../hooks/useRegistryFormsContext';
import { SHARED_FORM_NAMES } from '../../names';
import { useDataContext } from '../../providers/Data/hooks';
import { PushAccountPassword, PushAccountUser } from './fields';

export const PushAccountForm = () => {
  const { pushAccountSecret } = useDataContext();

  const { sharedForm } = useRegistryFormsContext();

  const registryTypeFieldValue = sharedForm.watch(SHARED_FORM_NAMES.registryType.name);
  const pushAccountOwnerReference = pushAccountSecret?.metadata?.ownerReferences?.[0].kind;

  const pushAccountConnected =
    pushAccountSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED];
  const pushAccountError =
    pushAccountSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR];

  const [pushAccountIcon, pushAccountIconColor] =
    SecretKubeObject.getStatusIcon(pushAccountConnected);

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
          {registryTypeFieldValue !== CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY && (
            <Grid item xs={6}>
              <PushAccountUser />
            </Grid>
          )}
          <Grid item xs={6}>
            <PushAccountPassword />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
