import React from 'react';
import { CreateCluster } from '../../widgets/CreateCluster';
import { CREATE_CLUSTER_DIALOG_NAME } from '../../widgets/CreateCluster/constants';
import { CreateCodebaseFromTemplate } from '../../widgets/CreateCodebaseFromTemplate';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from '../../widgets/CreateCodebaseFromTemplate/constants';

export const MODAL_MAPPING = {
    [CREATE_CLUSTER_DIALOG_NAME]: <CreateCluster />,
    [CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME]: <CreateCodebaseFromTemplate />,
} as const;
