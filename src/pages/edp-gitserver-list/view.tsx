import { Icon } from '@iconify/react';
import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { DocLink } from '../../components/DocLink';
import { PageWrapper } from '../../components/PageWrapper';
import { URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVERS } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { CREATE_GIT_SERVER_DIALOG_NAME } from '../../widgets/CreateGitServer/constants';
import { routeEDPConfiguration } from '../edp-configuration-list/route';
import { GitServerList } from './components/GitServerList';

export const PageView = () => {
    const [items, error] = EDPGitServerKubeObject.useList();

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
                    label: 'Git Servers',
                },
            ]}
        >
            <SectionBox>
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
                    actions={[
                        <Button
                            startIcon={<Icon icon={ICONS.PLUS} />}
                            color={'primary'}
                            variant={'contained'}
                            onClick={() =>
                                setDialog({
                                    modalName: CREATE_GIT_SERVER_DIALOG_NAME,
                                })
                            }
                        >
                            create
                        </Button>,
                    ]}
                />
                <GitServerList gitServers={items} error={error} />
            </SectionBox>
        </PageWrapper>
    );
};
