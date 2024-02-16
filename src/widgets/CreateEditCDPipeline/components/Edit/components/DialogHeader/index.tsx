import { Grid, Typography } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../../../components/LearnMoreLink';
import { EDP_USER_GUIDE } from '../../../../../../constants/urls';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../../constants';
import { CreateEditCDPipelineDialogForwardedProps } from '../../../../types';

export const DialogHeader = () => {
  const {
    forwardedProps: { CDPipelineData },
  } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
    CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
  );

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
      <Grid item>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h5'}>
              {`Edit ${CDPipelineData?.metadata.name}`}{' '}
              <LearnMoreLink url={EDP_USER_GUIDE.CD_PIPELINE_MANAGE.anchors.EDIT.url} />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
