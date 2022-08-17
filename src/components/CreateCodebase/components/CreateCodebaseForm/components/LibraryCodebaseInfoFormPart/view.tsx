import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary/view';
import { useNamespaces } from '../../hooks/useNamespaces';
import { isCloneStrategy, isImportStrategy } from '../../utils';
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
import { LibraryCodebaseInfoFormPartProps } from './types';

const { Grid } = MuiCore;

export const LibraryCodebaseInfoFormPart = ({
    names,
    handleFormFieldChange,
    type,
}: LibraryCodebaseInfoFormPartProps): React.ReactElement => {
    const { watch } = useFormContext();
    const { namespaces } = useNamespaces();

    const strategyValue = watch(names.strategy.name);
    const hasCodebaseAuthValue = watch(names.hasCodebaseAuth.name);

    return (
        <ErrorBoundary>
            <Grid container spacing={2}>
                <Namespace
                    type={type}
                    names={names}
                    handleFormFieldChange={handleFormFieldChange}
                    namespaces={namespaces}
                />
                <Strategy type={type} names={names} handleFormFieldChange={handleFormFieldChange} />
                {isCloneStrategy(strategyValue) ? (
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
                {isImportStrategy(strategyValue) ? (
                    <>
                        <GitServer names={names} handleFormFieldChange={handleFormFieldChange} />
                        <GitUrlPath names={names} handleFormFieldChange={handleFormFieldChange} />
                    </>
                ) : null}
            </Grid>
        </ErrorBoundary>
    );
};
