import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldEvent, SelectOption } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { Render } from '../../../Render';
import { useGroovyLibrariesWithBranches } from './hooks/useGroovyLibrariesWithBranches';
import { GroovyPipelineLibraryProps } from './types';

const defaultGroovyPipelineOption: SelectOption = {
    label: 'Default',
    value: 'default',
};

export const GroovyPipelineLibrary = ({
    names,
    handleFormFieldChange,
}: GroovyPipelineLibraryProps) => {
    const {
        watch,
        register,
        control,
        formState: { errors },
        resetField,
        setValue,
    } = useFormContext();

    const sourceLibraryNameFieldValue = watch(names.sourceLibraryName.name);

    const groovyLibsWithBranches = useGroovyLibrariesWithBranches();

    const groovyLibrariesOptions = React.useMemo(() => {
        if (groovyLibsWithBranches) {
            return [
                defaultGroovyPipelineOption,
                ...groovyLibsWithBranches.map(el => el.option),
            ].filter(Boolean);
        }

        return [defaultGroovyPipelineOption];
    }, [groovyLibsWithBranches]);

    const chosenGroovyLibraryBranches = React.useMemo(() => {
        if (sourceLibraryNameFieldValue === 'default') {
            return [];
        }
        if (sourceLibraryNameFieldValue) {
            return groovyLibsWithBranches.filter(
                el => el.option.value === sourceLibraryNameFieldValue
            )[0].branches;
        }

        return [];
    }, [groovyLibsWithBranches, sourceLibraryNameFieldValue]);

    const defaultAsLibrarySelected = React.useMemo(() => {
        return sourceLibraryNameFieldValue === 'default';
    }, [sourceLibraryNameFieldValue]);

    const handleChangeSourceLibraryName = React.useCallback(
        ({ target: { name, value } }: FieldEvent) => {
            resetField(names.sourceLibraryBranch.name);
            handleFormFieldChange({
                name: names.sourceLibraryBranch.name,
                value: undefined,
            });
            handleFormFieldChange({ name, value });

            if (value !== 'default') {
                setValue(names.sourceType.name, 'library');
                handleFormFieldChange({
                    name: names.sourceType.name,
                    value: 'library',
                });
            } else {
                setValue(names.sourceType.name, 'default');
                handleFormFieldChange({
                    name: names.sourceType.name,
                    value: 'default',
                });
            }
        },
        [handleFormFieldChange, names, resetField, setValue]
    );

    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <FormSelect
                    {...register(names.sourceLibraryName.name, {
                        onChange: handleChangeSourceLibraryName,
                    })}
                    label={'Groovy pipeline library'}
                    placeholder={'Select Groovy pipeline library'}
                    control={control}
                    errors={errors}
                    options={groovyLibrariesOptions}
                />
            </Grid>
            <Grid item xs={6}>
                <Render condition={!!sourceLibraryNameFieldValue}>
                    <FormSelect
                        {...register(names.sourceLibraryBranch.name, {
                            onChange: ({ target: { name, value } }: FieldEvent) =>
                                handleFormFieldChange({ name, value }),
                        })}
                        label={'Branch'}
                        placeholder={
                            defaultAsLibrarySelected
                                ? 'Default'
                                : `Select "${sourceLibraryNameFieldValue}'s" branch`
                        }
                        control={control}
                        errors={errors}
                        disabled={!chosenGroovyLibraryBranches.length}
                        options={chosenGroovyLibraryBranches.map(el => ({
                            label: el.specBranchName,
                            value: el.specBranchName,
                        }))}
                    />
                </Render>
            </Grid>
        </Grid>
    );
};
