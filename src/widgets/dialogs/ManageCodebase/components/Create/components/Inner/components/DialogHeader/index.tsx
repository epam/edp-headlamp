import { Icon } from '@iconify/react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../../../../../../components/LearnMoreLink';
import { CODEBASE_TYPES } from '../../../../../../../../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../../../../../../../../constants/urls';
import { ICONS } from '../../../../../../../../../icons/iconify-icons-mapping';
import { createCodebaseInstance } from '../../../../../../../../../k8s/groups/EDP/Codebase/utils/createCodebaseInstance';
import { capitalizeFirstLetter } from '../../../../../../../../../utils/format/capitalizeFirstLetter';
import { getUsedValues } from '../../../../../../../../../utils/forms/getUsedValues';
import { useTypedFormContext } from '../../../../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../../../../names';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
  const theme = useTheme();
  const { watch, getValues } = useTypedFormContext();

  const handleOpenEditor = React.useCallback(() => {
    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, CODEBASE_FORM_NAMES);
    const newCodebaseData = createCodebaseInstance(CODEBASE_FORM_NAMES, usedValues);
    setEditorData(newCodebaseData);
  }, [getValues, setEditorData, setEditorOpen]);

  const typeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);
  const capitalizedType = capitalizeFirstLetter(typeFieldValue);
  const docLink = React.useMemo(() => {
    switch (typeFieldValue) {
      case CODEBASE_TYPES.APPLICATION:
        return EDP_USER_GUIDE.APPLICATION_CREATE.url;
      case CODEBASE_TYPES.AUTOTEST:
        return EDP_USER_GUIDE.AUTOTEST_CREATE.url;
      case CODEBASE_TYPES.LIBRARY:
        return EDP_USER_GUIDE.LIBRARY_CREATE.url;
      case CODEBASE_TYPES.INFRASTRUCTURE:
        return EDP_USER_GUIDE.INFRASTRUCTURE_CREATE.url;
      default:
        return EDP_USER_GUIDE.APPLICATION_CREATE.url;
    }
  }, [typeFieldValue]);

  return (
    <Stack direction="row" alignItems={'flex-start'} justifyContent={'space-between'} spacing={1}>
      <Stack spacing={2}>
        <Typography
          fontSize={theme.typography.pxToRem(20)}
          fontWeight={500}
        >{`Create ${capitalizedType}`}</Typography>
        <LearnMoreLink url={docLink} />
      </Stack>
      <Box sx={{ color: theme.palette.text.primary }}>
        <Button
          startIcon={<Icon icon={ICONS.PENCIL} />}
          size="small"
          component={'button'}
          color="inherit"
          onClick={handleOpenEditor}
          sx={{ flexShrink: 0 }}
        >
          Edit YAML
        </Button>
      </Box>
    </Stack>
  );
};
