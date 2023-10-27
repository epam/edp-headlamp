import { Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { ManageRegistry } from '../../../../widgets/ManageRegistry';
import { menu } from '../../menu';
import { REGISTRY_LIST_PAGE_DESCRIPTION } from './constants';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
    const {
        data: { EDPConfigMap, pullAccountSecret, pushAccountSecret, tektonServiceAccount },
        isLoading,
    } = useDynamicDataContext();

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} gutterBottom>
                            {REGISTRY_LIST_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {REGISTRY_LIST_PAGE_DESCRIPTION.description}{' '}
                            <Link href={REGISTRY_LIST_PAGE_DESCRIPTION.docLink} target={'_blank'}>
                                <Typography variant={'body2'} component={'span'}>
                                    Learn more.
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingWrapper isLoading={isLoading}>
                            <ManageRegistry
                                formData={{
                                    EDPConfigMap,
                                    pullAccountSecret,
                                    pushAccountSecret,
                                    tektonServiceAccount,
                                }}
                            />
                        </LoadingWrapper>
                    </Grid>
                </Grid>
            </PageWrapper>
        </PageWithSubMenu>
    );
};
