import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { PipelineKubeObjectInterface } from '../../../../k8s/groups/Tekton/Pipeline/types';
import { TriggerTemplateKubeObjectInterface } from '../../../../k8s/groups/Tekton/TriggerTemplate/types';
import { PipelineActionsMenu } from '../../../PipelineActionsMenu';
import { WidgetPermissions } from '../../types';

export const Actions = ({
  resource,
  permissions,
  triggerTemplates,
}: {
  resource: PipelineKubeObjectInterface;
  permissions: WidgetPermissions;
  triggerTemplates: TriggerTemplateKubeObjectInterface[] | undefined;
}) => {
  const buttonRef = React.createRef<HTMLButtonElement>();
  const [anchor, setAnchor] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);

  return (
    <>
      <IconButton
        ref={buttonRef}
        aria-label={'Options'}
        onClick={(e) => setAnchor(e.currentTarget)}
        size="large"
      >
        <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
      </IconButton>
      <PipelineActionsMenu
        variant="menu"
        permissions={permissions}
        data={{
          pipeline: resource?.jsonData || resource,
          triggerTemplates,
        }}
        anchorEl={anchor}
        handleCloseResourceActionListMenu={() => setAnchor(null)}
      />
    </>
  );
};
