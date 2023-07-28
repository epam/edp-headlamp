import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { CreateResourceFab } from '../../components/CreateResourceFab';
import { DocLink } from '../../components/DocLink';
import { PageWrapper } from '../../components/PageWrapper';
import { URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVERS } from '../../constants/urls';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { CREATE_GIT_SERVER_DIALOG_NAME } from '../../widgets/CreateGitServer/constants';
import { routeEDPConfiguration } from '../edp-configuration/route';
import { GitServerList } from './components/GitServerList';

export const PageView = () => {
    const [items, error] = EDPGitServerKubeObject.useList();

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
                    label: 'Git Servers',
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
                                    <Typography variant={'h5'}>Git Servers</Typography>
                                </Grid>
                                <Grid item>
                                    <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVERS} />
                                </Grid>
                            </Grid>
                        }
                        headerStyle="label"
                    />
                }
            >
                <GitServerList gitServers={items} error={error} />
                <CreateResourceFab modalName={CREATE_GIT_SERVER_DIALOG_NAME} />
            </SectionBox>
        </PageWrapper>
    );
};
