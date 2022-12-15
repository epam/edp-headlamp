import { CodebaseActions } from '../../components/CodebaseActions';
import { CodebaseAdvancedInfoTable } from '../../components/CodebaseAdvancedInfoTable';
import { CodebaseBranchesList } from '../../components/CodebaseBranchesList';
import { CodebaseGeneralInfoTable } from '../../components/CodebaseGeneralInfoTable';
import { CodebaseMetadataTable } from '../../components/CodebaseMetadataTable';
import { ICONS } from '../../constants/icons';
import { streamCodebase } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { Iconify, MuiCore, pluginLib, React, ReactRouter } from '../../plugin.globals';
import { AUTOTESTS_ROUTE_NAME } from '../../routes/names';
import { createRouteName } from '../../utils/routes/createRouteName';
import { useStyles } from './styles';

const { Icon } = Iconify;
const { Typography, Button, Grid } = MuiCore;
const { useParams } = ReactRouter;
const {
    CommonComponents: { Link },
} = pluginLib;

export const EDPAutotestDetails = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams();
    const [autotest, setAutotest] = React.useState<EDPCodebaseKubeObjectInterface>(null);
    const [, setError] = React.useState<Error>(null);

    const handleStoreAutotest = React.useCallback((autotest: EDPCodebaseKubeObjectInterface) => {
        setAutotest(autotest);
    }, []);

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCodebase(name, namespace, handleStoreAutotest, handleError);

        return () => cancelStream();
    }, [handleError, handleStoreAutotest, name, namespace]);

    return (
        <>
            <div className={classes.pageHeading}>
                <Button
                    startIcon={<Icon icon={ICONS['ARROW_LEFT']} />}
                    size="small"
                    component={Link}
                    routeName={createRouteName(AUTOTESTS_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                {autotest && (
                    <div style={{ marginLeft: 'auto' }}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <CodebaseMetadataTable codebaseData={autotest} />
                            </Grid>
                            <Grid item>
                                <CodebaseActions kubeObjectData={autotest} isDetailsPage />
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>
            {autotest && (
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={8}>
                        <CodebaseBranchesList codebaseData={autotest} />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <CodebaseGeneralInfoTable codebaseData={autotest} />
                        <CodebaseAdvancedInfoTable kubeObjectData={autotest} />
                    </Grid>
                </Grid>
            )}
        </>
    );
};
