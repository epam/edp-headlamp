import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Breadcrumbs, Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { rem } from '../../utils/styling/rem';
import { PageWrapperProps } from './types';

export const PageWrapper: React.FC<PageWrapperProps> = ({
    children,
    breadcrumbs,
    headerSlot,
    breadcrumbsExtraContent,
    containerMaxWidth = 'xl',
}) => {
    const hasBreadcrumbs = !!breadcrumbs && !!breadcrumbs.length;

    return (
        <>
            {hasBreadcrumbs ? (
                <Container maxWidth={containerMaxWidth} style={{ marginTop: rem(48) }}>
                    <Grid
                        container
                        spacing={1}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Grid item>
                            <Grid container spacing={2} alignItems={'center'}>
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
                                    </Breadcrumbs>
                                </Grid>
                                <Grid item>{breadcrumbsExtraContent}</Grid>
                            </Grid>
                        </Grid>
                        <Grid item>{headerSlot}</Grid>
                    </Grid>
                </Container>
            ) : null}
            <Container
                maxWidth={containerMaxWidth}
                style={{ marginTop: rem(hasBreadcrumbs ? 16 : 48) }}
            >
                {children}
            </Container>
        </>
    );
};
