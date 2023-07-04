import {
    Link,
    SectionBox,
    SectionFilterHeader,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Breadcrumbs, Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { CREATE_CLUSTER_DIALOG_NAME } from '../../components/CreateCluster/constants';
import { CreateResourceFab } from '../../components/CreateResourceFab';
import { SecretKubeObject } from '../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../k8s/Secret/labels';
import { routeEDPConfiguration } from '../edp-configuration/route';
import { ClusterList } from './components/ClusterList';

export const PageView = () => {
    const [items, error] = SecretKubeObject.useList({
        labelSelector: `${SECRET_LABEL_SECRET_TYPE}=cluster`,
    });

    return (
        <>
            <Grid container spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                <Grid item>
                    <Breadcrumbs>
                        <Button
                            size="small"
                            component={Link}
                            routeName={routeEDPConfiguration.path}
                        >
                            Configuration
                        </Button>
                        <Typography color="textPrimary">Git Servers</Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
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
        </>
    );
};
