import React from 'react';
import { CreateCluster } from '../../widgets/CreateCluster';
import { CREATE_CLUSTER_DIALOG_NAME } from '../../widgets/CreateCluster/constants';
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
import { CreateGitServer } from '../../widgets/CreateGitServer';
import { CREATE_GIT_SERVER_DIALOG_NAME } from '../../widgets/CreateGitServer/constants';
import { DeleteKubeObject } from '../../widgets/DeleteKubeObject';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../widgets/DeleteKubeObject/constants';

const MemoizedCreateEditCodebase = React.memo(CreateEditCodebase);
const MemoizedCreateEditCDPipeline = React.memo(CreateEditCDPipeline);
const MemoizedCreateEditStage = React.memo(CreateEditStage);
const MemoizedCreateCluster = React.memo(CreateCluster);
const MemoizedCreateCodebaseFromTemplate = React.memo(CreateCodebaseFromTemplate);
const MemoizedCreateCodebaseBranch = React.memo(CreateCodebaseBranch);
const MemoizedCreateGitServer = React.memo(CreateGitServer);
const MemoizedDeleteKubeObject = React.memo(DeleteKubeObject);

export const MODAL_MAPPING = {
    [CREATE_EDIT_CODEBASE_DIALOG_NAME]: <MemoizedCreateEditCodebase />,
    [CREATE_EDIT_CD_PIPELINE_DIALOG_NAME]: <MemoizedCreateEditCDPipeline />,
    [CREATE_EDIT_STAGE_DIALOG_NAME]: <MemoizedCreateEditStage />,
    [CREATE_CLUSTER_DIALOG_NAME]: <MemoizedCreateCluster />,
    [CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME]: <MemoizedCreateCodebaseFromTemplate />,
    [CREATE_CODEBASE_BRANCH_DIALOG_NAME]: <MemoizedCreateCodebaseBranch />,
    [CREATE_GIT_SERVER_DIALOG_NAME]: <MemoizedCreateGitServer />,
    [DELETE_KUBE_OBJECT_DIALOG_NAME]: <MemoizedDeleteKubeObject />,
} as const;
