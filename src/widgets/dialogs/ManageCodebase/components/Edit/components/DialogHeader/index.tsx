import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../../../../components/LearnMoreLink';
import { CODEBASE_TYPE } from '../../../../../../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../../../../../../constants/urls';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';

export const DialogHeader = () => {
  const theme = useTheme();
  const {
    props: { codebaseData },
  } = useCurrentDialog();

  const docLink = React.useMemo(() => {
    switch (codebaseData?.spec.type) {
      case CODEBASE_TYPE.APPLICATION:
        return EDP_USER_GUIDE.APPLICATION_CREATE.url;
      case CODEBASE_TYPE.AUTOTEST:
        return EDP_USER_GUIDE.AUTOTEST_CREATE.url;
      case CODEBASE_TYPE.LIBRARY:
        return EDP_USER_GUIDE.LIBRARY_CREATE.url;
      case CODEBASE_TYPE.INFRASTRUCTURE:
        return EDP_USER_GUIDE.INFRASTRUCTURE_CREATE.url;
      default:
        return EDP_USER_GUIDE.APPLICATION_CREATE.url;
    }
  }, [codebaseData]);

  return (
    <Stack direction="row" alignItems={'flex-start'} justifyContent={'space-between'} spacing={1}>
      <Stack spacing={2}>
        <Typography
          fontSize={theme.typography.pxToRem(20)}
          fontWeight={500}
        >{`Edit ${codebaseData?.metadata.name}`}</Typography>
        <LearnMoreLink url={docLink} />
      </Stack>
    </Stack>
  );
};
