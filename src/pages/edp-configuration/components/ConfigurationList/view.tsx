import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { DocLink } from '../../../../components/DocLink';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { Render } from '../../../../components/Render';
import { VIEW_MODES } from '../../../../providers/ViewMode/types';
import { useColumns } from './hooks/useColumns';
import { useConfigurationList } from './hooks/useConfigurationList';
import { useStyles } from './styles';

export const ConfigurationList = ({ viewMode }) => {
    const columns = useColumns();
    const classes = useStyles();
    const data = useConfigurationList();

    return (
        <>
            {viewMode === VIEW_MODES.TABLE ? (
                <HeadlampSimpleTable data={data} columns={columns} rowsPerPage={[15, 25, 50]} />
            ) : viewMode === VIEW_MODES.GRID ? (
                <Grid container spacing={2}>
                    {data.map(({ icon, label, description, routePath, docLink }) => {
                        const key = `configuration-item-${label}`;

                        return (
                            <Grid key={key} item xs={4}>
                                <Card className={classes.cardRoot}>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1} alignItems={'center'}>
                                                    <Grid item>
                                                        <Icon icon={icon} width={40} height={40} />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant={'h5'}>
                                                            {label}
                                                        </Typography>
                                                    </Grid>
                                                    <Render condition={!!docLink}>
                                                        <Grid item style={{ marginLeft: 'auto' }}>
                                                            <DocLink href={docLink} />
                                                        </Grid>
                                                    </Render>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant={'subtitle2'}>
                                                    {description}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions className={classes.cardActions}>
                                        <Button component={Link} routeName={routePath}>
                                            configure
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            ) : null}
        </>
    );
};
