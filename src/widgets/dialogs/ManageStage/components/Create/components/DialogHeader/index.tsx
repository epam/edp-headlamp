import { Icon } from '@iconify/react';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../../../../components/LearnMoreLink';
import { EDP_USER_GUIDE } from '../../../../../../../constants/urls';
import { ICONS } from '../../../../../../../icons/iconify-icons-mapping';
import { createCDPipelineStageInstance } from '../../../../../../../k8s/groups/EDP/Stage/utils/createCDPipelineStageInstance';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { STAGE_FORM_NAMES } from '../../../../names';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';
import { QualityGate } from '../../../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
  const {
    props: { CDPipelineData },
  } = useCurrentDialog();
  const { getValues } = useTypedFormContext();

  const handleOpenEditor = React.useCallback(() => {
    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, STAGE_FORM_NAMES);
    const newCDPipelineData = createCDPipelineStageInstance(
      STAGE_FORM_NAMES,
      {
        ...usedValues,
        // removing unnecessary ID used in form
        qualityGates: usedValues.qualityGates.map((el: QualityGate) => ({
          qualityGateType: el.qualityGateType,
          stepName: el.stepName,
          autotestName: el.autotestName,
          branchName: el.branchName,
        })),
      },
      CDPipelineData
    );
    setEditorData(newCDPipelineData);
  }, [CDPipelineData, getValues, setEditorData, setEditorOpen]);

  const theme = useTheme();

  return (
    <Stack direction="row" alignItems={'flex-start'} justifyContent={'space-between'} spacing={1}>
      <Stack spacing={2}>
        <Typography fontSize={theme.typography.pxToRem(20)} fontWeight={500}>
          {`Create Environment for "${CDPipelineData?.metadata.name}"`}{' '}
        </Typography>
        <LearnMoreLink url={EDP_USER_GUIDE.CD_PIPELINE_MANAGE.anchors.ADD_STAGE.url} />
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
