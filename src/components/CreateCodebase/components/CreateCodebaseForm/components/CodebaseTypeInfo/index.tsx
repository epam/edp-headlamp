import { useFormContext } from 'react-hook-form';
import { CODEBASE_TYPES } from '../../../../../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../../constants/creationStrategies';
import { Applications } from '../../../../../../icons/sprites/Applications';
import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary';
import {
    BuildTool,
    DefaultBranch,
    Description,
    EmptyProject,
    Framework,
    Lang,
    Name,
    TestReportFramework,
} from '../../../../../FormFields/CodebaseFields';
import { Render } from '../../../../../Render';
import { useChosenCodebaseLanguage } from '../../hooks/useChosenCodebaseLanguage';
import { FormDataContext } from '../../index';

const { Grid } = MuiCore;

export const CodebaseTypeInfo = (): React.ReactElement => {
    const { names, handleFormFieldChange } = React.useContext(FormDataContext);

    const { watch } = useFormContext();

    const langFieldValue = watch(names.lang.name);
    const typeFieldValue = watch(names.type.name);
    const strategyFieldValue = watch(names.strategy.name);

    const { chosenLang } = useChosenCodebaseLanguage({
        type: typeFieldValue,
        lang: langFieldValue,
    });

    return (
        <ErrorBoundary>
            <Applications />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Name names={names} handleFormFieldChange={handleFormFieldChange} />
                </Grid>
                <Grid item xs={12}>
                    <DefaultBranch names={names} handleFormFieldChange={handleFormFieldChange} />
                </Grid>
                <Render condition={typeFieldValue === CODEBASE_TYPES['AUTOTEST']}>
                    <Grid item xs={12}>
                        <Description names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                </Render>
                <Render condition={strategyFieldValue === CODEBASE_CREATION_STRATEGIES['CREATE']}>
                    <Grid item xs={12}>
                        <EmptyProject names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                </Render>
                <Grid item xs={12}>
                    <Lang names={names} handleFormFieldChange={handleFormFieldChange} />
                </Grid>
                {langFieldValue && Object.values(chosenLang.frameworks).length ? (
                    <Grid item xs={12}>
                        <Framework names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                ) : null}
                {langFieldValue ? (
                    <Grid item xs={12}>
                        <BuildTool names={names} handleFormFieldChange={handleFormFieldChange} />
                    </Grid>
                ) : null}
                <Render condition={typeFieldValue === CODEBASE_TYPES['AUTOTEST']}>
                    <Grid item xs={12}>
                        <TestReportFramework
                            names={names}
                            handleFormFieldChange={handleFormFieldChange}
                        />
                    </Grid>
                </Render>
            </Grid>
        </ErrorBoundary>
    );
};
