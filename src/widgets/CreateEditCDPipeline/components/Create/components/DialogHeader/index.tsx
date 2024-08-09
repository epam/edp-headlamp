import { Icon } from '@iconify/react';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { LearnMoreLink } from '../../../../../../components/LearnMoreLink';
import { EDP_USER_GUIDE } from '../../../../../../constants/urls';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { createCDPipelineInstance } from '../../../../../../k8s/groups/EDP/CDPipeline/utils/createCDPipelineInstance';
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

  const theme = useTheme();

  return (
    <Stack direction="row" alignItems={'flex-start'} justifyContent={'space-between'} spacing={1}>
      <Stack spacing={2}>
        <Typography fontSize={theme.typography.pxToRem(20)} fontWeight={500}>
          Create Deployment Flow{' '}
        </Typography>
        <LearnMoreLink url={EDP_USER_GUIDE.CD_PIPELINE_CREATE.anchors.CREATE_VIA_UI.url} />
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
