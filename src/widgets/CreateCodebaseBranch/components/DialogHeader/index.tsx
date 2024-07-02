import { Icon } from '@iconify/react';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { createCodebaseBranchInstance } from '../../../../k8s/EDPCodebaseBranch/utils/createCodebaseBranchInstance';
import { useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from '../../constants';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../names';
import {
  CreateCodebaseBranchDialogForwardedProps,
  CreateCodebaseBranchFormValues,
} from '../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
  const {
    forwardedProps: { codebase: codebaseData },
  } = useSpecificDialogContext<CreateCodebaseBranchDialogForwardedProps>(
    CREATE_CODEBASE_BRANCH_DIALOG_NAME
  );

  const { getValues } = useFormContext<CreateCodebaseBranchFormValues>();

  const handleOpenEditor = React.useCallback(() => {
    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, CODEBASE_BRANCH_FORM_NAMES);
    const newCodebaseBranchData = createCodebaseBranchInstance(
      CODEBASE_BRANCH_FORM_NAMES,
      usedValues,
      codebaseData.metadata.name
    );
    setEditorData(newCodebaseBranchData);
  }, [codebaseData.metadata.name, getValues, setEditorData, setEditorOpen]);

  const theme = useTheme();

  return (
    <Stack direction="row" alignItems={'flex-start'} justifyContent={'space-between'} spacing={1}>
      <Stack spacing={2}>
        <Typography fontSize={theme.typography.pxToRem(20)} fontWeight={500}>
          {`Create branch for "${codebaseData?.metadata.name}"`}{' '}
        </Typography>
        <LearnMoreLink url={EDP_USER_GUIDE.BRANCHES_MANAGE.anchors.ADD_BRANCH.url} />
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
