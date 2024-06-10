import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { LearnMoreLink } from '../../../../../../components/LearnMoreLink';
import { EDP_USER_GUIDE } from '../../../../../../constants/urls';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { createCDPipelineInstance } from '../../../../../../k8s/EDPCDPipeline/utils/createCDPipelineInstance';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import { CreateEditCDPipelineFormValues } from '../../../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
  const { getValues } = useFormContext<CreateEditCDPipelineFormValues>();

  const handleOpenEditor = React.useCallback(() => {
    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, CDPIPELINE_FORM_NAMES);
    const newCDPipelineData = createCDPipelineInstance(CDPIPELINE_FORM_NAMES, usedValues);
    setEditorData(newCDPipelineData);
  }, [getValues, setEditorData, setEditorOpen]);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
      <Grid item>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h5'}>
              Create Environment{' '}
              <LearnMoreLink url={EDP_USER_GUIDE.CD_PIPELINE_CREATE.anchors.CREATE_VIA_UI.url} />
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
