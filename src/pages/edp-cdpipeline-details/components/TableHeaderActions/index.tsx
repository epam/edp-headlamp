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
  const { CDPipeline, enrichedApplications } = useDynamicDataContext();
  const ciTool = enrichedApplications?.[0]?.application?.spec.ciTool;
  const { setDialog } = useDialogContext<CreateEditStageDialogForwardedProps>();

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
              forwardedProps: {
                CDPipelineData: CDPipeline,
                otherStages: CDPipelineStages,
                mode: FORM_MODES.CREATE,
                ciTool,
              },
            });
          }}
        >
          create
        </Button>
      </Tooltip>
    </>
  );
};
