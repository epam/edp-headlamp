import { Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { menu } from '../../menu';
import { CreateRegistryStepper } from './components/CreateRegistryStepper';
import { REGISTRY_LIST_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} gutterBottom>
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
                        <CreateRegistryStepper />
                    </Grid>
                </Grid>
            </PageWrapper>
        </PageWithSubMenu>
    );
};
