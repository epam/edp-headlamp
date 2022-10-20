import { CodebaseActions } from '../../components/CodebaseActions';
import { CodebaseAdvancedInfoTable } from '../../components/CodebaseAdvancedInfoTable';
import { CodebaseBranchesList } from '../../components/CodebaseBranchesList';
import { CodebaseGeneralInfoTable } from '../../components/CodebaseGeneralInfoTable';
import { CodebaseMetadataTable } from '../../components/CodebaseMetadataTable';
import ErrorBoundary from '../../components/ErrorBoundary/view';
import { ICONS } from '../../constants/icons';
import { EDPCodebaseKubeObject, streamCodebase } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { Iconify, MuiCore, React, ReactRouter } from '../../plugin.globals';
import { pluginLib } from '../../plugin.globals';
import { LIBRARIES_ROUTE_NAME } from '../../routes/names';
import { createRouteName } from '../../utils/routes/createRouteName';
import { useStyles } from './styles';
import { EDPLibraryDetailsProps } from './types';

const { Icon } = Iconify;
const { Typography, Button, Grid } = MuiCore;
const { useParams } = ReactRouter;
const {
    CommonComponents: { Link },
} = pluginLib;

export const EDPLibraryDetails: React.FC<EDPLibraryDetailsProps> = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams();
    const [library, setLibrary] = React.useState<EDPCodebaseKubeObjectInterface>(null);
    const [, setError] = React.useState<Error>(null);

    const handleStoreLibrary = React.useCallback((library: EDPCodebaseKubeObjectInterface) => {
        setLibrary(library);
    }, []);

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCodebase(name, namespace, handleStoreLibrary, handleError);

        return () => cancelStream();
    }, [handleError, handleStoreLibrary, name, namespace]);

    return (
        <ErrorBoundary>
            <div className={classes.pageHeading}>
                <Button
                    startIcon={<Icon icon={ICONS['ARROW_LEFT']} />}
                    size="small"
                    component={Link}
                    routeName={createRouteName(LIBRARIES_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                {library && (
                    <div style={{ marginLeft: 'auto' }}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <CodebaseMetadataTable codebaseData={library} />
                            </Grid>
                            <Grid item>
                                <CodebaseActions
                                    kubeObject={EDPCodebaseKubeObject}
                                    kubeObjectData={library}
                                />
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>
            {library && (
                <>
                    <CodebaseGeneralInfoTable kubeObjectData={library} />
                    <CodebaseAdvancedInfoTable kubeObjectData={library} />
                    <CodebaseBranchesList kubeObjectData={library} />
                </>
            )}
        </ErrorBoundary>
    );
};
