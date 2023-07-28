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

export const MODAL_MAPPING = {
    [CREATE_EDIT_CODEBASE_DIALOG_NAME]: <CreateEditCodebase />,
    [CREATE_EDIT_CD_PIPELINE_DIALOG_NAME]: <CreateEditCDPipeline />,
    [CREATE_EDIT_STAGE_DIALOG_NAME]: <CreateEditStage />,
    [CREATE_CLUSTER_DIALOG_NAME]: <CreateCluster />,
    [CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME]: <CreateCodebaseFromTemplate />,
    [CREATE_CODEBASE_BRANCH_DIALOG_NAME]: <CreateCodebaseBranch />,
    [CREATE_GIT_SERVER_DIALOG_NAME]: <CreateGitServer />,
    [DELETE_KUBE_OBJECT_DIALOG_NAME]: <DeleteKubeObject />,
} as const;
