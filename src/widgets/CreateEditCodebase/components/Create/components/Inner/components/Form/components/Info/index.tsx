import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_TYPES } from '../../../../../../../../../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../../../../../../constants/creationStrategies';
import { Resources } from '../../../../../../../../../../icons/sprites/Resources';
import { CODEBASE_FORM_NAMES } from '../../../../../../../../names';
import { isCloneStrategy } from '../../../../../../../../utils';
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
} from '../../../../../../../fields';
import { CreateCodebaseFormValues } from '../../../../../../types';

export const Info = () => {
    const { watch } = useFormContext<CreateCodebaseFormValues>();

    const langFieldValue = watch(CODEBASE_FORM_NAMES.lang.name);
    const typeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);
    const strategyFieldValue = watch(CODEBASE_FORM_NAMES.strategy.name);
    const hasCodebaseAuthFieldValue = watch(CODEBASE_FORM_NAMES.hasCodebaseAuth.name);

    return (
        <>
            <Resources />
            <Grid container spacing={2}>
                {isCloneStrategy(strategyFieldValue) ? (
                    <>
                        <Grid item xs={12}>
                            <RepositoryUrl />
                        </Grid>
                    </>
                ) : null}
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems={'flex-start'}>
                        <Grid item xs={3}>
                            <GitServer />
                        </Grid>
                        <Grid item xs={9}>
                            <GitUrlPath />
                        </Grid>
                    </Grid>
                </Grid>
                {isCloneStrategy(strategyFieldValue) ? (
                    <>
                        <Grid item xs={12}>
                            <CodebaseAuth />
                        </Grid>
                        {hasCodebaseAuthFieldValue ? (
                            <>
                                <Grid item xs={12}>
                                    <RepositoryLogin />
                                </Grid>
                                <Grid item xs={12}>
                                    <RepositoryPasswordOrApiToken />
                                </Grid>
                            </>
                        ) : null}
                    </>
                ) : null}
                <Grid item xs={12}>
                    <Name />
                </Grid>
                <Grid item xs={12}>
                    <Description />
                </Grid>
                {strategyFieldValue === CODEBASE_CREATION_STRATEGIES.CREATE && (
                    <Grid item xs={12}>
                        <EmptyProject />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Lang />
                </Grid>
                {langFieldValue && (
                    <Grid item xs={12}>
                        <Framework />
                    </Grid>
                )}
                {langFieldValue && (
                    <Grid item xs={12}>
                        <BuildTool />
                    </Grid>
                )}
                {typeFieldValue === CODEBASE_TYPES.AUTOTEST && (
                    <Grid item xs={12}>
                        <TestReportFramework />
                    </Grid>
                )}
            </Grid>
        </>
    );
};
