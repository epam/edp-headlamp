import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { StageActionsMenu } from '../../../../widgets/StageActionsMenu';
import { useDataContext } from '../../providers/Data/hooks';
import { StageActionsProps } from './types';

export const StageActions = ({ stage, backRoute }: StageActionsProps) => {
  const { stages, CDPipeline } = useDataContext();
  const { handleOpenResourceActionListMenu } =
    useResourceActionListContext<EDPCDPipelineStageKubeObjectInterface>();
  const buttonRef = React.createRef<HTMLButtonElement>();

  return (
    <>
      <Tooltip title={'Actions'}>
        <IconButton
          aria-label={'Actions'}
          ref={buttonRef}
          onClick={() => handleOpenResourceActionListMenu(buttonRef.current, stage)}
          size="large"
        >
          <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
        </IconButton>
      </Tooltip>
      {!!stages && (
        <StageActionsMenu
          stages={stages?.items}
          CDPipelineData={CDPipeline}
          backRoute={backRoute}
        />
      )}
    </>
  );
};
