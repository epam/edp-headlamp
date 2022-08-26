import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary/view';
import { useChosenCodebaseLanguage } from '../../hooks/useChosenCodebaseLanguage';
import { BuildTool, DefaultBranch, EmptyProject, Framework, Lang, Name } from '../fields';
import { LibraryCodebaseTypeInfoFormPartProps } from './types';

const { Grid } = MuiCore;

export const LibraryCodebaseTypeInfoFormPart = ({
    names,
    handleFormFieldChange,
    type,
}: LibraryCodebaseTypeInfoFormPartProps): React.ReactElement => {
    const { watch } = useFormContext();

    const langValue = watch(names.lang.name);

    const { chosenLang } = useChosenCodebaseLanguage({ type, langValue });

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
