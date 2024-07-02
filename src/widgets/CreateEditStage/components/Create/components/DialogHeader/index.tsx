import { Icon } from '@iconify/react';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { LearnMoreLink } from '../../../../../../components/LearnMoreLink';
import { EDP_USER_GUIDE } from '../../../../../../constants/urls';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { createCDPipelineStageInstance } from '../../../../../../k8s/EDPCDPipelineStage/utils/createCDPipelineStageInstance';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../constants';
import { STAGE_FORM_NAMES } from '../../../../names';
import { CreateEditStageDialogForwardedProps, CreateEditStageFormValues } from '../../../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
  const {
    forwardedProps: { CDPipelineData },
  } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(CREATE_EDIT_STAGE_DIALOG_NAME);
  const { getValues } = useFormContext<CreateEditStageFormValues>();

  const handleOpenEditor = React.useCallback(() => {
    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, STAGE_FORM_NAMES);
    const newCDPipelineData = createCDPipelineStageInstance(
      STAGE_FORM_NAMES,
      {
        ...usedValues,
        // removing unnecessary ID used in form
        qualityGates: usedValues.qualityGates.map((el) => ({
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
          {`Create stage for "${CDPipelineData?.metadata.name}"`}{' '}
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
