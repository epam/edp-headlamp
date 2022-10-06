import { CodebaseActions } from '../../components/CodebaseActions';
import { CodebaseAdvancedInfoTable } from '../../components/CodebaseAdvancedInfoTable';
import { CodebaseBranchesList } from '../../components/CodebaseBranchesList';
import { CodebaseGeneralInfoTable } from '../../components/CodebaseGeneralInfoTable';
import { MetadataTable } from '../../components/MetadataTable';
import { ICONS } from '../../constants/icons';
import { EDPCodebaseKubeObject, streamCodebase } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { Iconify, MuiCore, pluginLib, React, ReactRouter } from '../../plugin.globals';
import { AUTOTESTS_ROUTE_NAME } from '../../routes/names';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { useStyles } from './styles';

const { Icon } = Iconify;
const { Typography, Button } = MuiCore;
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
                    to={createRouteURL(AUTOTESTS_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                {autotest && (
                    <div style={{ marginLeft: 'auto' }}>
                        <CodebaseActions
                            kubeObject={EDPCodebaseKubeObject}
                            kubeObjectData={autotest}
                        />
                    </div>
                )}
            </div>
            {autotest && (
                <>
                    <CodebaseGeneralInfoTable kubeObjectData={autotest} />
                    <CodebaseAdvancedInfoTable kubeObjectData={autotest} />
                    <MetadataTable kubeObjectData={autotest} />
                    <CodebaseBranchesList kubeObjectData={autotest} />
                </>
            )}
        </>
    );
};
