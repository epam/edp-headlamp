import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { FORM_MODES } from '../../../../types/forms';
import { ManageGitServer } from '../../../../widgets/ManageGitServer';
import { menu } from '../../menu';
import { GIT_SERVER_LIST_PAGE_DESCRIPTION } from './constants';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
    const {
        data: { gitServer, gitServerSecret },
        isLoading,
    } = useDynamicDataContext();

    const mode = !!gitServer ? FORM_MODES.EDIT : FORM_MODES.CREATE;

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} gutterBottom>
                            {GIT_SERVER_LIST_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {GIT_SERVER_LIST_PAGE_DESCRIPTION.description}{' '}
                            <Link
                                href={EDP_USER_GUIDE.GIT_SERVER_MANAGE.anchors.VIEW_DATA.url}
                                target={'_blank'}
                            >
                                <Typography variant={'body2'} component={'span'}>
                                    Learn more.
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingWrapper isLoading={isLoading}>
                            <ManageGitServer
                                formData={{
                                    gitServer,
                                    gitServerSecret,
                                    mode,
                                }}
                            />
                        </LoadingWrapper>
                    </Grid>
                    {!gitServer && !isLoading && (
                        <Grid item xs={12}>
                            <EmptyContent color={'textSecondary'}>No GitServer found</EmptyContent>
                        </Grid>
                    )}
                </Grid>
            </PageWrapper>
        </PageWithSubMenu>
    );
};
