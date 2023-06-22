import React from 'react';
import { CreateCluster } from '../../components/CreateCluster';
import { CREATE_CLUSTER_DIALOG_NAME } from '../../components/CreateCluster/constants';

export const MODAL_MAPPING = {
    [CREATE_CLUSTER_DIALOG_NAME]: <CreateCluster />,
} as const;
