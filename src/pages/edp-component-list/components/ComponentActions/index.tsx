import React from 'react';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { CodebaseActionsMenu } from '../../../../widgets/CodebaseActionsMenu';

export const ComponentActions = () => {
  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<EDPCodebaseKubeObjectInterface>();

  return (
    <CodebaseActionsMenu
      variant="menu"
      data={{
        codebaseData: data,
      }}
      anchorEl={anchorEl}
      handleCloseResourceActionListMenu={handleCloseResourceActionListMenu}
    />
  );
};
