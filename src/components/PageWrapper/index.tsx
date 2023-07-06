import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Breadcrumbs, Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { rem } from '../../utils/styling/rem';
import { Render } from '../Render';
import { PageWrapperProps } from './types';

export const PageWrapper: React.FC<PageWrapperProps> = ({
    children,
    breadcrumbs,
    headerSlot,
    breadcrumbsExtraContent,
}) => {
    return (
        <>
            <Render condition={!!breadcrumbs && !!breadcrumbs.length}>
                <Grid container spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                    <Grid item>
                        <Breadcrumbs>
                            {breadcrumbs?.map(({ label, url }) => {
                                const key = `breadcrumb-${label}`;

                                return url ? (
                                    <Button
                                        key={key}
                                        size="small"
                                        component={Link}
                                        routeName={url.pathname}
                                        params={url.params}
                                    >
                                        {label}
                                    </Button>
                                ) : (
                                    <Typography
                                        key={key}
                                        color="textPrimary"
                                        style={{ marginBottom: rem(1) }}
                                    >
                                        {label}
                                    </Typography>
                                );
                            })}
                            {breadcrumbsExtraContent}
                        </Breadcrumbs>
                    </Grid>
                    <Grid item>{headerSlot}</Grid>
                </Grid>
            </Render>
            {children}
        </>
    );
};
