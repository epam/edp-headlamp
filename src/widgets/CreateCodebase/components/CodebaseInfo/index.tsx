import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
    BuildTool,
    CodebaseAuth,
    Description,
    EmptyProject,
    Framework,
    GitServer,
    GitUrlPath,
    Lang,
    Name,
    RepositoryLogin,
    RepositoryPasswordOrApiToken,
    RepositoryUrl,
    TestReportFramework,
} from '../../../../components/FormFields/CodebaseFields';
import { Render } from '../../../../components/Render';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../constants/creationStrategies';
import { Resources } from '../../../../icons/sprites/Resources';
import { FormDataContext } from '../../index';
import { isCloneStrategy } from '../../utils';

export const CodebaseInfo = () => {
    const { names, handleFormFieldChange } = React.useContext(FormDataContext);

    const { watch } = useFormContext();

    const langFieldValue = watch(names.lang.name);
    const typeFieldValue = watch(names.type.name);
    const strategyFieldValue = watch(names.strategy.name);
    const hasCodebaseAuthFieldValue = watch(names.hasCodebaseAuth.name);

    return (
        <>
            <Resources />
            <Grid container spacing={2}>
                {isCloneStrategy(strategyFieldValue) ? (
                    <>
                        <Grid item xs={12}>
                            <RepositoryUrl
                                names={names}
                                handleFormFieldChange={handleFormFieldChange}
                            />
                        </Grid>
                    </>
                ) : null}
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems={'flex-start'}>
                        <Grid item xs={3}>
                            <GitServer
                                names={names}
                                handleFormFieldChange={handleFormFieldChange}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <GitUrlPath
                                names={names}
                                handleFormFieldChange={handleFormFieldChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {isCloneStrategy(strategyFieldValue) ? (
                    <>
                        <Grid item xs={12}>
                            <CodebaseAuth
                                names={names}
                                handleFormFieldChange={handleFormFieldChange}
                            />
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
                <Grid item xs={12}>
                    <Name names={names} handleFormFieldChange={handleFormFieldChange} />
                </Grid>
                <Grid item xs={12}>
                    <Description names={names} handleFormFieldChange={handleFormFieldChange} />
                </Grid>
                <Render condition={strategyFieldValue === CODEBASE_CREATION_STRATEGIES.CREATE}>
                    <Grid item xs={12}>
                        <EmptyProject names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                </Render>
                <Grid item xs={12}>
                    <Lang names={names} handleFormFieldChange={handleFormFieldChange} />
                </Grid>
                <Render condition={langFieldValue}>
                    <Grid item xs={12}>
                        <Framework names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                </Render>
                {langFieldValue ? (
                    <Grid item xs={12}>
                        <BuildTool names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                ) : null}
                <Render condition={typeFieldValue === CODEBASE_TYPES.AUTOTEST}>
                    <Grid item xs={12}>
                        <TestReportFramework
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                    </Grid>
                </Render>
            </Grid>
        </>
    );
};
