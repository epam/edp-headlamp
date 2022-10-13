import { ICONS } from '../../constants/icons';
import { streamGitServer } from '../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { Iconify, MuiCore, pluginLib, React, ReactRouter } from '../../plugin.globals';
import { GIT_SERVERS_ROUTE_NAME } from '../../routes/names';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { GeneralInfoTable } from './components/GeneralInfoTable';
import { MetadataTable } from './components/MetadataTable';
import { useStyles } from './styles';

const { Icon } = Iconify;
const { Typography, Button } = MuiCore;
const { useParams } = ReactRouter;
const {
    CommonComponents: { Link },
} = pluginLib;

export const EDPGitServerDetails = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams();
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
                    to={createRouteURL(GIT_SERVERS_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
            </div>
            {gitServer && (
                <>
                    <GeneralInfoTable gitServerData={gitServer} />
                    <MetadataTable gitServerData={gitServer} />
                </>
            )}
        </>
    );
};
