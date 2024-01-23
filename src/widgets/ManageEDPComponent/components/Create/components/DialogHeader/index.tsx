import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DocLink } from '../../../../../../components/DocLink';
import { EDP_USER_GUIDE } from '../../../../../../constants/urls';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { createEDPComponentInstance } from '../../../../../../k8s/EDPComponent/utils/createEDPComponentInstance';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { MANAGE_EDP_COMPONENT_DIALOG_NAME } from '../../../../constants';
import { EDP_COMPONENT_FORM_NAMES } from '../../../../names';
import {
  ManageEDPComponentDialogForwardedProps,
  ManageEDPComponentValues,
} from '../../../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
  const {} = useSpecificDialogContext<ManageEDPComponentDialogForwardedProps>(
    MANAGE_EDP_COMPONENT_DIALOG_NAME
  );
  const { getValues } = useFormContext<ManageEDPComponentValues>();

  const handleOpenEditor = React.useCallback(() => {
    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, EDP_COMPONENT_FORM_NAMES);
    const newCDPipelineData = createEDPComponentInstance(EDP_COMPONENT_FORM_NAMES, usedValues);
    setEditorData(newCDPipelineData);
  }, [getValues, setEditorData, setEditorOpen]);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
      <Grid item>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h5'}>Create EDPComponent</Typography>
          </Grid>
          <Grid item>
            <DocLink href={EDP_USER_GUIDE.OVERVIEW.url} />
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
