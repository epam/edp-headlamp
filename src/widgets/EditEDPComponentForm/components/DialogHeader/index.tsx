import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { editResource } from '../../../../k8s/common/editResource';
import { useFormContext } from '../../../../providers/Form/hooks';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { EDP_COMPONENT_FORM_NAMES } from '../../names';
import { ManageEDPComponentDataContext, ManageEDPComponentValues } from '../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorData, setEditorOpen }: DialogHeaderProps) => {
  const { getValues } = useReactHookFormContext<ManageEDPComponentValues>();

  const {
    formData: { EDPComponent, isSystem },
  } = useFormContext<ManageEDPComponentDataContext>();

  const handleOpenEditor = React.useCallback(() => {
    if (isSystem) {
      return;
    }

    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, EDP_COMPONENT_FORM_NAMES);
    const editedEDPComponent = editResource(EDP_COMPONENT_FORM_NAMES, EDPComponent, usedValues);
    setEditorData(editedEDPComponent);
  }, [EDPComponent, getValues, isSystem, setEditorData, setEditorOpen]);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
      <Grid item>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h5'}>Edit</Typography>
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
          disabled={isSystem}
        >
          Edit YAML
        </Button>
      </Grid>
    </Grid>
  );
};
