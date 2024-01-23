import { Icon } from '@iconify/react';
import { Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { useFormContext } from '../../../../../../../../providers/Form/hooks';
import { ManageRegistryDataContext } from '../../../../../../types';
import { PushAccountPassword } from '../../../../../fields';

export const OpenshiftFormPart = () => {
  const {
    formData: { pushAccountSecret },
  } = useFormContext<ManageRegistryDataContext>();

  const pushAccountOwnerReference = pushAccountSecret?.metadata?.ownerReferences?.[0].kind;

  return (
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
            <PushAccountPassword />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
