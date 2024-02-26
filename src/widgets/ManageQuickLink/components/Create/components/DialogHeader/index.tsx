import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { LearnMoreLink } from '../../../../../../components/LearnMoreLink';
import { EDP_USER_GUIDE } from '../../../../../../constants/urls';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { createQuickLinkInstance } from '../../../../../../k8s/QuickLink/utils/createQuickLinkInstance';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { MANAGE_QUICK_LINK_DIALOG_NAME } from '../../../../constants';
import { QUICK_LINK_FORM_NAMES } from '../../../../names';
import { ManageQuickLinkDialogForwardedProps, ManageQuickLinkValues } from '../../../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
  const {} = useSpecificDialogContext<ManageQuickLinkDialogForwardedProps>(
    MANAGE_QUICK_LINK_DIALOG_NAME
  );
  const { getValues } = useFormContext<ManageQuickLinkValues>();

  const handleOpenEditor = React.useCallback(() => {
    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, QUICK_LINK_FORM_NAMES);
    const newCDPipelineData = createQuickLinkInstance(QUICK_LINK_FORM_NAMES, usedValues);
    setEditorData(newCDPipelineData);
  }, [getValues, setEditorData, setEditorOpen]);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
      <Grid item>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h5'}>
              Create Link <LearnMoreLink url={EDP_USER_GUIDE.OVERVIEW.url} />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          startIcon={<Icon icon={ICONS.PENCIL} />}
          size="small"
          component={'button'}
          onClick={handleOpenEditor}
          style={{ flexShrink: 0 }}
        >
          Edit YAML
        </Button>
      </Grid>
    </Grid>
  );
};
