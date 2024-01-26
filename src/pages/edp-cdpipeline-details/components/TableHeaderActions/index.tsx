import { Icon } from '@iconify/react';
import { Button, Tooltip } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../widgets/CreateEditStage/constants';
import { CreateEditStageDialogForwardedProps } from '../../../../widgets/CreateEditStage/types';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { TableHeaderActionsProps } from './types';

export const TableHeaderActions = ({ CDPipelineStages }: TableHeaderActionsProps) => {
  const { CDPipeline } = useDynamicDataContext();
  const { setDialog } = useDialogContext<CreateEditStageDialogForwardedProps>();

  const forwardedProps: CreateEditStageDialogForwardedProps = {
    CDPipelineData: CDPipeline.data,
    otherStages: CDPipelineStages,
    mode: FORM_MODES.CREATE,
  };

  return (
    <>
      <Tooltip title={'Create stage'}>
        <Button
          startIcon={<Icon icon={ICONS.PLUS} />}
          color={'primary'}
          variant={'contained'}
          onClick={() => {
            setDialog({
              modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
              forwardedProps,
            });
          }}
        >
          create
        </Button>
      </Tooltip>
    </>
  );
};
