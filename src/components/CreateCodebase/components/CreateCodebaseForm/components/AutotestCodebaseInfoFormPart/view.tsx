import { useFormContext } from 'react-hook-form';
import { useGitServers } from '../../../../../../hooks/useGitServers';
import { useNamespaces } from '../../../../../../hooks/useNamespaces';
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
} from '../../../../../FormFields/CodebaseFields';
import { useUpdateFieldsDependingOnChosenIntegrationStrategy } from '../../hooks/useUpdateFieldsDependingOnChosenIntegrationStrategy';
import { isCloneStrategy, isImportStrategy } from '../../utils';
import { AutotestCodebaseInfoFormPartProps } from './types';

const { Grid } = MuiCore;

export const AutotestCodebaseInfoFormPart = ({
    names,
    handleFormFieldChange,
    type,
}: AutotestCodebaseInfoFormPartProps): React.ReactElement => {
    const { watch, resetField } = useFormContext();
    const { namespaces } = useNamespaces();

    const strategyFieldValue = watch(names.strategy.name);
    const hasCodebaseAuthFieldValue = watch(names.hasCodebaseAuth.name);
    const namespaceFieldValue = watch(names.namespace.name);
    const { gitServers } = useGitServers({ namespace: namespaceFieldValue });

    const gitServersNames = React.useMemo(
        () => gitServers.map(({ metadata: { name } }) => name),
        [gitServers]
    );

    useUpdateFieldsDependingOnChosenIntegrationStrategy({
        watch,
        handleFormFieldChange,
        resetField,
        names,
    });

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
                {isCloneStrategy(strategyFieldValue) ? (
                    <>
                        <RepositoryUrl
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                        <CodebaseAuth names={names} handleFormFieldChange={handleFormFieldChange} />
                        {hasCodebaseAuthFieldValue ? (
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
                {isImportStrategy(strategyFieldValue) ? (
                    <>
                        <GitServer
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                            gitServers={gitServersNames}
                        />
                        <GitUrlPath names={names} handleFormFieldChange={handleFormFieldChange} />
                    </>
                ) : null}
            </Grid>
        </ErrorBoundary>
    );
};
