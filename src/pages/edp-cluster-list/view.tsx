import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { CreateResourceFab } from '../../components/CreateResourceFab';
import { PageWrapper } from '../../components/PageWrapper';
import { SecretKubeObject } from '../../k8s/Secret';
import { ARGO_CD_SECRET_LABEL_SECRET_TYPE } from '../../k8s/Secret/labels';
import { CREATE_CLUSTER_DIALOG_NAME } from '../../widgets/CreateCluster/constants';
import { routeEDPConfiguration } from '../edp-configuration/route';
import { ClusterList } from './components/ClusterList';

export const PageView = () => {
    const [items, error] = SecretKubeObject.useList({
        labelSelector: `${ARGO_CD_SECRET_LABEL_SECRET_TYPE}=cluster`,
    });

    return (
        <PageWrapper
            breadcrumbs={[
                {
                    label: 'Configuration',
                    url: {
                        pathname: routeEDPConfiguration.path,
                    },
                },
                {
                    label: 'Clusters',
                },
            ]}
        >
            <SectionBox
                title={
                    <SectionFilterHeader
                        // @ts-ignore
                        title={
                            <Grid container alignItems={'center'} spacing={1}>
                                <Grid item>
                                    <Typography variant={'h5'}>Clusters</Typography>
                                </Grid>
                            </Grid>
                        }
                        headerStyle="label"
                    />
                }
            >
                <ClusterList clusterSecrets={items} error={error} />
                <CreateResourceFab modalName={CREATE_CLUSTER_DIALOG_NAME} />
            </SectionBox>
        </PageWrapper>
    );
};
