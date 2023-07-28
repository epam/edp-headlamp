import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../../components/Render';
import { useGroovyLibrariesWithBranches } from '../../../../../k8s/EDPCodebase/hooks/useGroovyLibrariesWithBranches';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { FieldEvent, SelectOption } from '../../../../../types/forms';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';

const defaultGroovyPipelineOption: SelectOption = {
    label: 'Default',
    value: 'default',
};

export const GroovyPipelineLibrary = () => {
    const {
        watch,
        register,
        control,
        formState: { errors },
        resetField,
        setValue,
    } = useFormContext<CreateEditStageFormValues>();

    const sourceLibraryNameFieldValue = watch(STAGE_FORM_NAMES.sourceLibraryName.name);

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
        ({ target: { value } }: FieldEvent) => {
            resetField(STAGE_FORM_NAMES.sourceLibraryBranch.name);

            if (value !== 'default') {
                setValue(STAGE_FORM_NAMES.sourceType.name, 'library');
            } else {
                setValue(STAGE_FORM_NAMES.sourceType.name, 'default');
            }
        },
        [resetField, setValue]
    );

    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <FormSelect
                    {...register(STAGE_FORM_NAMES.sourceLibraryName.name, {
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
                        {...register(STAGE_FORM_NAMES.sourceLibraryBranch.name)}
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
