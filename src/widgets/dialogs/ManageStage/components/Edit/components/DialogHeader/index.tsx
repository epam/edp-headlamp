import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../../../../components/LearnMoreLink';
import { EDP_USER_GUIDE } from '../../../../../../../constants/urls';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';

export const DialogHeader = () => {
  const {
    props: { stage },
  } = useCurrentDialog();

  const theme = useTheme();

  return (
    <Stack direction="row" alignItems={'flex-start'} justifyContent={'space-between'} spacing={1}>
      <Stack spacing={2}>
        <Typography
          fontSize={theme.typography.pxToRem(20)}
          fontWeight={500}
        >{`Edit ${stage?.metadata.name}`}</Typography>
        <LearnMoreLink url={EDP_USER_GUIDE.CD_PIPELINE_MANAGE.anchors.EDIT_STAGE.url} />
      </Stack>
    </Stack>
  );
};
