import React from 'react';
import { ConfirmModal } from '../../widgets/ConfirmModal';
import { CONFIRM_DIALOG_NAME } from '../../widgets/ConfirmModal/constants';
import { ConfirmResourcesUpdates } from '../../widgets/ConfirmResourcesUpdates';
import { CONFIRM_RESOURCES_UPDATES_DIALOG_NAME } from '../../widgets/ConfirmResourcesUpdates/constants';
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
import { ManageQuickLink } from '../../widgets/ManageQuickLink';
import { MANAGE_QUICK_LINK_DIALOG_NAME } from '../../widgets/ManageQuickLink/constants';
import { PipelineRunGraphDialog } from '../../widgets/PipelineRunGraphDialog';
import { PIPELINE_RUN_GRAPH_DIALOG_NAME } from '../../widgets/PipelineRunGraphDialog/constants';
import { PodsLogViewer } from '../../widgets/PodsLogViewer';
import { PODS_LOG_VIEWER_DIALOG_NAME } from '../../widgets/PodsLogViewer/constants';
import PodsTerminal from '../../widgets/PodsTerminal';
import { PODS_TERMINAL_DIALOG_NAME } from '../../widgets/PodsTerminal/constants';
import { SuccessModal } from '../../widgets/SuccessModal';
import { SUCCESS_DIALOG_NAME } from '../../widgets/SuccessModal/constants';

const MemoizedCreateEditCodebase = React.memo(CreateEditCodebase);
const MemoizedCreateEditCDPipeline = React.memo(CreateEditCDPipeline);
const MemoizedCreateEditStage = React.memo(CreateEditStage);
const MemoizedCreateCodebaseFromTemplate = React.memo(CreateCodebaseFromTemplate);
const MemoizedDeleteKubeObject = React.memo(DeleteKubeObject);
const MemoizedPodsLogViewer = React.memo(PodsLogViewer);
const MemoizedPodsTerminal = React.memo(PodsTerminal);
const MemoizedPipelineRunGraph = React.memo(PipelineRunGraphDialog);
const MemoizedConfirmResourcesUpdates = React.memo(ConfirmResourcesUpdates);
const MemoizedManageQuickLink = React.memo(ManageQuickLink);
const MemoizedSuccessModal = React.memo(SuccessModal);
const MemoizedConfirmModal = React.memo(ConfirmModal);

export const MODAL_MAPPING = {
  [CREATE_EDIT_CODEBASE_DIALOG_NAME]: <MemoizedCreateEditCodebase />,
  [CREATE_EDIT_CD_PIPELINE_DIALOG_NAME]: <MemoizedCreateEditCDPipeline />,
  [CREATE_EDIT_STAGE_DIALOG_NAME]: <MemoizedCreateEditStage />,
  [CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME]: <MemoizedCreateCodebaseFromTemplate />,
  [DELETE_KUBE_OBJECT_DIALOG_NAME]: <MemoizedDeleteKubeObject />,
  [PODS_LOG_VIEWER_DIALOG_NAME]: <MemoizedPodsLogViewer />,
  [PODS_TERMINAL_DIALOG_NAME]: <MemoizedPodsTerminal />,
  [PIPELINE_RUN_GRAPH_DIALOG_NAME]: <MemoizedPipelineRunGraph />,
  [CONFIRM_RESOURCES_UPDATES_DIALOG_NAME]: <MemoizedConfirmResourcesUpdates />,
  [MANAGE_QUICK_LINK_DIALOG_NAME]: <MemoizedManageQuickLink />,
  [SUCCESS_DIALOG_NAME]: <MemoizedSuccessModal />,
  [CONFIRM_DIALOG_NAME]: <MemoizedConfirmModal />,
} as const;
