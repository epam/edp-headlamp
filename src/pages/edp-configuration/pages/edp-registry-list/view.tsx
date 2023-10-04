import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Tabs } from '../../../../components/Tabs';
import { Resources } from '../../../../icons/sprites/Resources';
import { RESOURCE_ICON_NAMES } from '../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { useEDPComponentsURLsQuery } from '../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { menu } from '../../menu';
import { ECRList } from './components/ECRList';
import { HarborOrDockerHubList } from './components/HaborOrDockerHubList';
import { REGISTRY_LIST_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    const { data: EDPComponentsURLS, isLoading } = useEDPComponentsURLsQuery();
    const containerRegistryComponentURL = EDPComponentsURLS?.['container-registry'];
    const isDockerHubUsed =
        !isLoading && containerRegistryComponentURL?.includes('index.docker.io/v1/');

    const tabs = React.useMemo(
        () => [
            {
                label: 'ECR',
                id: 'ecr',
                icon: <UseSpriteSymbol name={RESOURCE_ICON_NAMES.ECR} width={30} height={30} />,
                component: <ECRList />,
            },
            {
                label: isDockerHubUsed ? 'Docker Hub' : 'Harbor',
                id: 'harborOrDockerHub',
                icon: (
                    <UseSpriteSymbol
                        name={
                            isDockerHubUsed
                                ? RESOURCE_ICON_NAMES.DOCKER
                                : RESOURCE_ICON_NAMES.HARBOR
                        }
                        width={30}
                        height={30}
                    />
                ),
                component: <HarborOrDockerHubList />,
            },
        ],
        [isDockerHubUsed]
    );

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Resources />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} gutterBottom>
                            {REGISTRY_LIST_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {REGISTRY_LIST_PAGE_DESCRIPTION.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingWrapper isLoading={isLoading}>
                            <Tabs tabs={tabs} initialTabIdx={0} />
                        </LoadingWrapper>
                    </Grid>
                </Grid>
            </PageWrapper>
        </PageWithSubMenu>
    );
};
