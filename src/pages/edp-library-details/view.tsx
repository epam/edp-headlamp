import { CodebaseAdvancedInfoTable } from '../../components/CodebaseAdvancedInfoTable';
import { CodebaseBranchesList } from '../../components/CodebaseBranchesList';
import { CodebaseGeneralInfoTable } from '../../components/CodebaseGeneralInfoTable';
import { MetadataTable } from '../../components/MetadataTable';
import { ICON_ARROW_LEFT } from '../../constants/icons';
import { EDPCodebaseKubeObject, streamCodebase } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { Iconify, MuiCore, React, ReactRouter } from '../../plugin.globals';
import { LIBRARIES_ROUTE_NAME } from '../../routes/names';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { PageHeaderActions } from './components/PageHeaderActions';
import { useStyles } from './styles';
import { EDPLibraryDetailsProps } from './types';

const { Icon } = Iconify;
const { Typography, Button } = MuiCore;
const { useParams, Link } = ReactRouter;

export const EDPLibraryDetails: React.FC<EDPLibraryDetailsProps> = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams();
    const [library, setLibrary] = React.useState<EDPCodebaseKubeObjectInterface>(null);
    const [, setError] = React.useState<string>(null);

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
        <>
            <div className={classes.pageHeading}>
                <Button
                    startIcon={<Icon icon={ICON_ARROW_LEFT} />}
                    size="small"
                    component={Link}
                    to={createRouteURL(LIBRARIES_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                {library && (
                    <div style={{ marginLeft: 'auto' }}>
                        <PageHeaderActions
                            kubeObject={EDPCodebaseKubeObject}
                            kubeObjectData={library}
                        />
                    </div>
                )}
            </div>
            {library && (
                <>
                    <CodebaseGeneralInfoTable kubeObjectData={library} />
                    <CodebaseAdvancedInfoTable kubeObjectData={library} />
                    <MetadataTable kubeObjectData={library} />
                    <CodebaseBranchesList
                        kubeObject={EDPCodebaseKubeObject}
                        kubeObjectData={library}
                    />
                </>
            )}
        </>
    );
};
