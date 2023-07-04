import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { React } from '../../../../plugin.globals';
import { VIEW_MODES } from '../../../../providers/ViewMode/types';
import { useColumns } from './hooks/useColumns';
import { useConfigurationList } from './hooks/useConfigurationList';

export const ConfigurationList = ({ viewMode }) => {
    const columns = useColumns();
    const data = useConfigurationList();

    return (
        <>
            {viewMode === VIEW_MODES.TABLE ? (
                <HeadlampSimpleTable data={data} columns={columns} rowsPerPage={[15, 25, 50]} />
            ) : viewMode === VIEW_MODES.GRID ? (
                <Grid container spacing={2}>
                    {data.map(({ icon, label, description, routePath }) => {
                        const key = `configuration-item-${label}`;

                        return (
                            <Grid key={key} item xs={4}>
                                <Card>
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
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant={'subtitle2'}>
                                                    {description}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
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
