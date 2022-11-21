import { CodebaseActions } from '../../components/CodebaseActions';
import { CodebaseAdvancedInfoTable } from '../../components/CodebaseAdvancedInfoTable';
import { CodebaseBranchesList } from '../../components/CodebaseBranchesList';
import { CodebaseGeneralInfoTable } from '../../components/CodebaseGeneralInfoTable';
import { CodebaseMetadataTable } from '../../components/CodebaseMetadataTable';
import { ICONS } from '../../constants/icons';
import { EDPCodebaseKubeObject, streamCodebase } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { Iconify, MuiCore, pluginLib, React, ReactRouter } from '../../plugin.globals';
import { APPLICATIONS_ROUTE_NAME } from '../../routes/names';
import { createRouteName } from '../../utils/routes/createRouteName';
import { useStyles } from './styles';

const { Icon } = Iconify;
const { Typography, Button, Grid } = MuiCore;
const { useParams } = ReactRouter;
const {
    CommonComponents: { Link },
} = pluginLib;

export const EDPApplicationDetails = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams();
    const [application, setApplication] = React.useState<EDPCodebaseKubeObjectInterface>(null);
    const [, setError] = React.useState<Error>(null);

    const handleStoreApplication = React.useCallback(
        (application: EDPCodebaseKubeObjectInterface) => {
            setApplication(application);
        },
        []
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCodebase(name, namespace, handleStoreApplication, handleError);

        return () => cancelStream();
    }, [handleError, handleStoreApplication, name, namespace]);

    return (
        <>
            <div className={classes.pageHeading}>
                <Button
                    startIcon={<Icon icon={ICONS['ARROW_LEFT']} />}
                    size="small"
                    component={Link}
                    routeName={createRouteName(APPLICATIONS_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                {application && (
                    <div style={{ marginLeft: 'auto' }}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <CodebaseMetadataTable codebaseData={application} />
                            </Grid>
                            <Grid item>
                                <CodebaseActions
                                    kubeObject={EDPCodebaseKubeObject}
                                    kubeObjectData={application}
                                />
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>
            {application && (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={8}>
                            <CodebaseBranchesList codebaseData={application} />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <CodebaseGeneralInfoTable kubeObjectData={application} />
                            <CodebaseAdvancedInfoTable kubeObjectData={application} />
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
};
