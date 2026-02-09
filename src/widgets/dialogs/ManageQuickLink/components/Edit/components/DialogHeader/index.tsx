import { Icon } from '@iconify/react';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../../../../components/LearnMoreLink';
import { EDP_USER_GUIDE } from '../../../../../../../constants/urls';
import { ICONS } from '../../../../../../../icons/iconify-icons-mapping';
import { editResource } from '../../../../../../../k8s/common/editResource';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { QUICK_LINK_FORM_NAMES } from '../../../../names';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
  const {
    props: { quickLink, isSystem },
  } = useCurrentDialog();

  const { getValues } = useTypedFormContext();

  const handleOpenEditor = React.useCallback(() => {
    if (isSystem || !quickLink) {
      return;
    }

    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, QUICK_LINK_FORM_NAMES);
    const editedQuickLink = editResource(QUICK_LINK_FORM_NAMES, quickLink, usedValues);
    setEditorData(editedQuickLink);
  }, [quickLink, getValues, isSystem, setEditorData, setEditorOpen]);

  const theme = useTheme();

  return (
    <Stack direction="row" alignItems={'flex-start'} justifyContent={'space-between'} spacing={1}>
      <Stack spacing={2}>
        <Typography fontSize={theme.typography.pxToRem(20)} fontWeight={500}>
          {`Edit ${quickLink!.metadata.name}`}{' '}
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
        disabled={isSystem}
      >
        Edit YAML
      </Button>
    </Stack>
  );
};
