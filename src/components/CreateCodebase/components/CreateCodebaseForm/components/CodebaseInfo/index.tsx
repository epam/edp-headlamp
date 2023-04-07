import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../plugin.globals';
import {
    CodebaseAuth,
    GitServer,
    GitUrlPath,
    RepositoryLogin,
    RepositoryPasswordOrApiToken,
    RepositoryUrl,
    Strategy,
} from '../../../../../FormFields/CodebaseFields';
import { Type } from '../../../../../FormFields/CodebaseFields/Type';
import { useUpdateFieldsDependingOnChosenIntegrationStrategy } from '../../hooks/useUpdateFieldsDependingOnChosenIntegrationStrategy';
import { FormDataContext } from '../../index';
import { isCloneStrategy, isImportStrategy } from '../../utils';

const { Grid } = MuiCore;

export const CodebaseInfo = (): React.ReactElement => {
    const { names, handleFormFieldChange, setType } = React.useContext(FormDataContext);

    const { watch, resetField, setValue } = useFormContext();

    const strategyFieldValue = watch(names.strategy.name);
    const hasCodebaseAuthFieldValue = watch(names.hasCodebaseAuth.name);

    useUpdateFieldsDependingOnChosenIntegrationStrategy({
        watch,
        setValue,
        handleFormFieldChange,
        resetField,
        names,
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Type
                    names={names}
                    handleFormFieldChange={handleFormFieldChange}
                    setType={setType}
                />
            </Grid>
            <Grid item xs={12}>
                <Strategy names={names} handleFormFieldChange={handleFormFieldChange} />
            </Grid>
            {isCloneStrategy(strategyFieldValue) ? (
                <>
                    <Grid item xs={12}>
                        <RepositoryUrl
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CodebaseAuth names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                    {hasCodebaseAuthFieldValue ? (
                        <>
                            <Grid item xs={12}>
                                <RepositoryLogin
                                    names={names}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RepositoryPasswordOrApiToken
                                    names={names}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </Grid>
                        </>
                    ) : null}
                </>
            ) : null}
            {isImportStrategy(strategyFieldValue) ? (
                <>
                    <Grid item xs={12}>
                        <GitServer names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <GitUrlPath names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                </>
            ) : null}
        </Grid>
    );
};
