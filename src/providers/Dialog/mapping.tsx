import React from 'react';
import { CreateCluster } from '../../widgets/CreateCluster';
import { CREATE_CLUSTER_DIALOG_NAME } from '../../widgets/CreateCluster/constants';

export const MODAL_MAPPING = {
    [CREATE_CLUSTER_DIALOG_NAME]: <CreateCluster />,
} as const;
