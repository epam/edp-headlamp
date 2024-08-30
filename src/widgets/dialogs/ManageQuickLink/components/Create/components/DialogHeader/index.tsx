import { Icon } from '@iconify/react';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../../../../components/LearnMoreLink';
import { EDP_USER_GUIDE } from '../../../../../../../constants/urls';
import { ICONS } from '../../../../../../../icons/iconify-icons-mapping';
import { createQuickLinkInstance } from '../../../../../../../k8s/groups/EDP/QuickLink/utils/createQuickLinkInstance';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { QUICK_LINK_FORM_NAMES } from '../../../../names';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
  const { getValues } = useTypedFormContext();

  const handleOpenEditor = React.useCallback(() => {
    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, QUICK_LINK_FORM_NAMES);
    const newCDPipelineData = createQuickLinkInstance(QUICK_LINK_FORM_NAMES, usedValues);
    setEditorData(newCDPipelineData);
  }, [getValues, setEditorData, setEditorOpen]);

  const theme = useTheme();

  return (
    <Stack direction="row" alignItems={'flex-start'} justifyContent={'space-between'} spacing={1}>
      <Stack spacing={2}>
        <Typography fontSize={theme.typography.pxToRem(20)} fontWeight={500}>
          Create Link
        </Typography>
        <LearnMoreLink url={EDP_USER_GUIDE.OVERVIEW.url} />
      </Stack>
      <Button
        startIcon={<Icon icon={ICONS.PENCIL} />}
        size="small"
        component={'button'}
        onClick={handleOpenEditor}
        style={{ flexShrink: 0 }}
        color="inherit"
      >
        Edit YAML
      </Button>
    </Stack>
  );
};
