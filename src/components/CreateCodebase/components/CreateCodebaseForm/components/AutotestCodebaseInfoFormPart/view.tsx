import { useFormContext } from 'react-hook-form';
import { creationStrategies } from '../../../../../../configs/creationStrategies';
import { getNamespaces } from '../../../../../../k8s/common/getNamespaces';
import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary/view';
import {
    CodebaseAuth,
    GitServer,
    GitUrlPath,
    Namespace,
    RepositoryLogin,
    RepositoryPasswordOrApiToken,
    RepositoryUrl,
    Strategy,
} from '../fields';
import { AutotestCodebaseInfoFormPartProps } from './types';

const { Grid } = MuiCore;

export const AutotestCodebaseInfoFormPart = ({
    names,
    handleFormFieldChange,
    type,
}: AutotestCodebaseInfoFormPartProps): React.ReactElement => {
    const { watch } = useFormContext();
    const [namespaces, setNamespaces] = React.useState<string[]>([]);
    const fetchNamespaces = React.useCallback(async () => {
        const namespaces = await getNamespaces();
        setNamespaces(namespaces);
    }, []);

    const strategyValue = watch(names.strategy.name);
    const hasCodebaseAuthValue = watch(names.hasCodebaseAuth.name);

    const isCloneStrategy = React.useMemo(
        () => strategyValue === creationStrategies.clone.value,
        [strategyValue]
    );
    const isImportStrategy = React.useMemo(
        () => strategyValue === creationStrategies.import.value,
        [strategyValue]
    );

    React.useEffect(() => {
        fetchNamespaces().catch(console.error);
    }, [fetchNamespaces]);

    return (
        <ErrorBoundary>
            <Grid container spacing={2}>
                <Namespace
                    names={names}
                    type={type}
                    handleFormFieldChange={handleFormFieldChange}
                    namespaces={namespaces}
                />
                <Strategy type={type} names={names} handleFormFieldChange={handleFormFieldChange} />
                {isCloneStrategy ? (
                    <>
                        <RepositoryUrl
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                        <CodebaseAuth names={names} handleFormFieldChange={handleFormFieldChange} />
                        {hasCodebaseAuthValue ? (
                            <>
                                <RepositoryLogin
                                    names={names}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                                <RepositoryPasswordOrApiToken
                                    names={names}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </>
                        ) : null}
                    </>
                ) : null}
                {isImportStrategy ? (
                    <>
                        <GitServer names={names} handleFormFieldChange={handleFormFieldChange} />
                        <GitUrlPath names={names} handleFormFieldChange={handleFormFieldChange} />
                    </>
                ) : null}
            </Grid>
        </ErrorBoundary>
    );
};
