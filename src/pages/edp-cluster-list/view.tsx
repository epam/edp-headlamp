import { Icon } from '@iconify/react';
import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../k8s/Secret';
import { ARGO_CD_SECRET_LABEL_SECRET_TYPE } from '../../k8s/Secret/labels';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { CREATE_CLUSTER_DIALOG_NAME } from '../../widgets/CreateCluster/constants';
import { routeEDPConfiguration } from '../edp-configuration-list/route';
import { ClusterList } from './components/ClusterList';

export const PageView = () => {
    const [items, error] = SecretKubeObject.useList({
        labelSelector: `${ARGO_CD_SECRET_LABEL_SECRET_TYPE}=cluster`,
    });

    const { setDialog } = useDialogContext();

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
            <SectionBox>
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
                    actions={[
                        <Button
                            startIcon={<Icon icon={ICONS.PLUS} />}
                            color={'primary'}
                            variant={'contained'}
                            onClick={() =>
                                setDialog({
                                    modalName: CREATE_CLUSTER_DIALOG_NAME,
                                })
                            }
                        >
                            create
                        </Button>,
                    ]}
                />
                <ClusterList clusterSecrets={items} error={error} />
            </SectionBox>
        </PageWrapper>
    );
};
