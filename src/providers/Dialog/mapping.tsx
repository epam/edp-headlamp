import React from 'react';
import { ConfirmResourcesUpdates } from '../../widgets/ConfirmResourcesUpdates';
import { CONFIRM_RESOURCES_UPDATES_DIALOG_NAME } from '../../widgets/ConfirmResourcesUpdates/constants';
import { CreateCodebaseBranch } from '../../widgets/CreateCodebaseBranch';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from '../../widgets/CreateCodebaseBranch/constants';
import { CreateCodebaseFromTemplate } from '../../widgets/CreateCodebaseFromTemplate';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from '../../widgets/CreateCodebaseFromTemplate/constants';
import { CreateEditCDPipeline } from '../../widgets/CreateEditCDPipeline';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../widgets/CreateEditCDPipeline/constants';
import { CreateEditCodebase } from '../../widgets/CreateEditCodebase';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../widgets/CreateEditCodebase/constants';
import { CreateEditStage } from '../../widgets/CreateEditStage';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../widgets/CreateEditStage/constants';
import { DeleteKubeObject } from '../../widgets/DeleteKubeObject';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../widgets/DeleteKubeObject/constants';
import { ManageEDPComponent } from '../../widgets/ManageEDPComponent';
import { MANAGE_EDP_COMPONENT_DIALOG_NAME } from '../../widgets/ManageEDPComponent/constants';
import { PipelineGraph } from '../../widgets/PipelineGraph';
import { PIPELINE_GRAPH_DIALOG_NAME } from '../../widgets/PipelineGraph/constants';
import { PipelineRunGraph } from '../../widgets/PipelineRunGraph';
import { PIPELINE_RUN_GRAPH_DIALOG_NAME } from '../../widgets/PipelineRunGraph/constants';
import { PodsLogViewer } from '../../widgets/PodsLogViewer';
import { PODS_LOG_VIEWER_DIALOG_NAME } from '../../widgets/PodsLogViewer/constants';
import PodsTerminal from '../../widgets/PodsTerminal';
import { PODS_TERMINAL_DIALOG_NAME } from '../../widgets/PodsTerminal/constants';
import { NamespacesGuard } from '../NamespacesGuardWrapper/components/NamespacesGuard';
import { NAMESPACES_GUARD_DIALOG_NAME } from '../NamespacesGuardWrapper/components/NamespacesGuard/constants';

const MemoizedCreateEditCodebase = React.memo(CreateEditCodebase);
const MemoizedCreateEditCDPipeline = React.memo(CreateEditCDPipeline);
const MemoizedCreateEditStage = React.memo(CreateEditStage);
const MemoizedCreateCodebaseFromTemplate = React.memo(CreateCodebaseFromTemplate);
const MemoizedCreateCodebaseBranch = React.memo(CreateCodebaseBranch);
const MemoizedDeleteKubeObject = React.memo(DeleteKubeObject);
const MemoizedPodsLogViewer = React.memo(PodsLogViewer);
const MemoizedPodsTerminal = React.memo(PodsTerminal);
const MemoizedPipelineRunGraph = React.memo(PipelineRunGraph);
const MemoizedPipelineGraph = React.memo(PipelineGraph);
const MemoizedConfirmResourcesUpdates = React.memo(ConfirmResourcesUpdates);
const MemoizedNamespacesGuard = React.memo(NamespacesGuard);
const MemoizedManageEDPComponent = React.memo(ManageEDPComponent);

export const MODAL_MAPPING = {
  [CREATE_EDIT_CODEBASE_DIALOG_NAME]: <MemoizedCreateEditCodebase />,
  [CREATE_EDIT_CD_PIPELINE_DIALOG_NAME]: <MemoizedCreateEditCDPipeline />,
  [CREATE_EDIT_STAGE_DIALOG_NAME]: <MemoizedCreateEditStage />,
  [CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME]: <MemoizedCreateCodebaseFromTemplate />,
  [CREATE_CODEBASE_BRANCH_DIALOG_NAME]: <MemoizedCreateCodebaseBranch />,
  [DELETE_KUBE_OBJECT_DIALOG_NAME]: <MemoizedDeleteKubeObject />,
  [PODS_LOG_VIEWER_DIALOG_NAME]: <MemoizedPodsLogViewer />,
  [PODS_TERMINAL_DIALOG_NAME]: <MemoizedPodsTerminal />,
  [PIPELINE_RUN_GRAPH_DIALOG_NAME]: <MemoizedPipelineRunGraph />,
  [PIPELINE_GRAPH_DIALOG_NAME]: <MemoizedPipelineGraph />,
  [CONFIRM_RESOURCES_UPDATES_DIALOG_NAME]: <MemoizedConfirmResourcesUpdates />,
  [NAMESPACES_GUARD_DIALOG_NAME]: <MemoizedNamespacesGuard />,
  [MANAGE_EDP_COMPONENT_DIALOG_NAME]: <MemoizedManageEDPComponent />,
} as const;
