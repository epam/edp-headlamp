import { useFormContext } from 'react-hook-form';
import { APPLICATION_MAPPING } from '../../../../../../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../../../../../../configs/codebase-mappings/autotest';
import { LIBRARY_MAPPING } from '../../../../../../configs/codebase-mappings/library';
import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary/view';
import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../../../../constants';
import { BuildTool, DefaultBranch, EmptyProject, Framework, Lang, Name } from '../fields';
import { LibraryCodebaseTypeInfoFormPartProps } from './types';

const { Grid } = MuiCore;

export const LibraryCodebaseTypeInfoFormPart = ({
    names,
    handleFormFieldChange,
    type,
}: LibraryCodebaseTypeInfoFormPartProps): React.ReactElement => {
    const { watch } = useFormContext();

    const codebaseMapping = React.useMemo(() => {
        if (type === CODEBASE_TYPE_APPLICATION) {
            return APPLICATION_MAPPING;
        }

        if (type === CODEBASE_TYPE_LIBRARY) {
            return LIBRARY_MAPPING;
        }

        if (type === CODEBASE_TYPE_AUTOTEST) {
            return AUTOTEST_MAPPING;
        }
    }, [type]);

    const langValue = watch(names.lang.name);

    const chosenLang = React.useMemo(
        () => codebaseMapping[langValue],
        [codebaseMapping, langValue]
    );

    return (
        <ErrorBoundary>
            <Grid container spacing={2}>
                <Name names={names} handleFormFieldChange={handleFormFieldChange} type={type} />
                <DefaultBranch names={names} handleFormFieldChange={handleFormFieldChange} />
                <EmptyProject names={names} handleFormFieldChange={handleFormFieldChange} />
                <Lang names={names} handleFormFieldChange={handleFormFieldChange} type={type} />
                {langValue && Object.values(chosenLang.frameworks).length ? (
                    <Framework
                        names={names}
                        handleFormFieldChange={handleFormFieldChange}
                        type={type}
                    />
                ) : null}
                {langValue && Object.values(chosenLang.buildTools).length ? (
                    <BuildTool
                        names={names}
                        handleFormFieldChange={handleFormFieldChange}
                        type={type}
                    />
                ) : null}
            </Grid>
        </ErrorBoundary>
    );
};
