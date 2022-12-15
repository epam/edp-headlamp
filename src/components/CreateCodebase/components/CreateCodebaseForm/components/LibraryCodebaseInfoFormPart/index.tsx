import { useFormContext } from 'react-hook-form';
import { useGitServers } from '../../../../../../hooks/useGitServers';
import { useNamespace } from '../../../../../../hooks/useNamespace';
import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary';
import {
    CodebaseAuth,
    GitServer,
    GitUrlPath,
    RepositoryLogin,
    RepositoryPasswordOrApiToken,
    RepositoryUrl,
    Strategy,
} from '../../../../../FormFields/CodebaseFields';
import { useUpdateFieldsDependingOnChosenIntegrationStrategy } from '../../hooks/useUpdateFieldsDependingOnChosenIntegrationStrategy';
import { isCloneStrategy, isImportStrategy } from '../../utils';
import { LibraryCodebaseInfoFormPartProps } from './types';

const { Grid } = MuiCore;

export const LibraryCodebaseInfoFormPart = ({
    names,
    handleFormFieldChange,
    type,
}: LibraryCodebaseInfoFormPartProps): React.ReactElement => {
    const { watch, resetField } = useFormContext();
    const strategyFieldValue = watch(names.strategy.name);
    const hasCodebaseAuthFieldValue = watch(names.hasCodebaseAuth.name);
    const { namespace } = useNamespace();
    const { gitServers } = useGitServers({ namespace });

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
