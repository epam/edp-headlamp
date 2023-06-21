import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button, Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { ICONS } from '../../constants/icons';
import { streamGitServer } from '../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { React } from '../../plugin.globals';
import { GIT_SERVERS_ROUTE_NAME } from '../../routes/names';
import { createRouteName } from '../../utils/routes/createRouteName';
import { GeneralInfoTable } from './components/GeneralInfoTable';
import { GitServerMetadataTable } from './components/GItServerMetadataTable';
import { useStyles } from './styles';
import { EDPGitServerDetailsRouteParams } from './types';

export const PageView = () => {
    const classes = useStyles();
    const { namespace, name } = useParams<EDPGitServerDetailsRouteParams>();
    const [gitServer, setGitServer] = React.useState<EDPGitServerKubeObjectInterface>(null);
    const [, setError] = React.useState<Error>(null);

    const handleStoreApplication = React.useCallback(
        (gitServer: EDPGitServerKubeObjectInterface) => {
            setGitServer(gitServer);
        },
        []
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamGitServer(name, namespace, handleStoreApplication, handleError);

        return () => cancelStream();
    }, [handleError, handleStoreApplication, name, namespace]);

    return (
        <>
            <div className={classes.pageHeading}>
                <Button
                    startIcon={<Icon icon={ICONS['ARROW_LEFT']} />}
                    size="small"
                    component={Link}
                    routeName={createRouteName(GIT_SERVERS_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                {gitServer && (
                    <div style={{ marginLeft: 'auto' }}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <GitServerMetadataTable gitServerData={gitServer} />
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>
            {gitServer && (
                <>
                    <GeneralInfoTable gitServerData={gitServer} />
                </>
            )}
        </>
    );
};
