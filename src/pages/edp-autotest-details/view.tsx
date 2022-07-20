import { CodebaseAdvancedInfoTable } from '../../components/CodebaseAdvancedInfoTable';
import { CodebaseBranchesList } from '../../components/CodebaseBranchesList';
import { CodebaseGeneralInfoTable } from '../../components/CodebaseGeneralInfoTable';
import { CodebaseMetadataTable } from '../../components/CodebaseMetadataTable';
import { ICON_ARROW_LEFT } from '../../constants/icons';
import { EDPCodebaseKubeObject, streamCodebase } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { Iconify, MuiCore, React, ReactRouter } from '../../plugin.globals';
import { AUTOTESTS_ROUTE_NAME } from '../../routes/names';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { PageHeaderActions } from './components/PageHeaderActions';
import { useStyles } from './styles';
import { EDPAutotestDetailsProps } from './types';

const { Icon } = Iconify;
const { Typography, Button } = MuiCore;
const { useParams, Link } = ReactRouter;

export const EDPAutotestDetails: React.FC<EDPAutotestDetailsProps> = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams();
    const [autotest, setAutotest] = React.useState<EDPCodebaseKubeObjectInterface>(null);
    const [, setError] = React.useState<string>(null);

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
                    startIcon={<Icon icon={ICON_ARROW_LEFT} />}
                    size="small"
                    component={Link}
                    to={createRouteURL(AUTOTESTS_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                {autotest && (
                    <div style={{ marginLeft: 'auto' }}>
                        <PageHeaderActions
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
                    <CodebaseMetadataTable kubeObjectData={autotest} />
                    <CodebaseBranchesList
                        kubeObject={EDPCodebaseKubeObject}
                        kubeObjectData={autotest}
                    />
                </>
            )}
        </>
    );
};
