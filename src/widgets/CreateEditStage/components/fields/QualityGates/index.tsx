import { Icon } from '@iconify/react';
import { Button, Grid, Typography, useTheme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../../components/Render';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { useAutotestsWithBranches } from '../../../../../k8s/EDPCodebase/hooks/useAutotestsWithBranches';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';
import { QualityGateRow } from './components/QualityGateRow';
import { QualityGate } from './types';
import {
    createQualityGateAutotestFieldName,
    createQualityGateStepNameFieldName,
    createQualityGateTypeAutotestsBranchFieldName,
    createQualityGateTypeFieldName,
} from './utils';

const createQualityGateBase = (idx: number): QualityGate => ({
    id: idx,
    qualityGateType: 'manual',
    stepName: '',
    autotestName: null,
    branchName: null,
});

export const QualityGates = () => {
    const theme: DefaultTheme = useTheme();

    const { resetField, watch, setValue } = useFormContext<CreateEditStageFormValues>();

    const qualityGatesFieldValue = watch(STAGE_FORM_NAMES.qualityGates.name);

    const [qualityGates, setQualityGates] = React.useState<QualityGate[]>([
        createQualityGateBase(0),
    ]);

    const setNewQualityGates = React.useCallback(
        (newQualityGates: QualityGate[]): void => {
            const newQualityGatesValue = newQualityGates.map(
                ({ qualityGateType, stepName, autotestName, branchName }) => ({
                    qualityGateType,
                    stepName,
                    autotestName,
                    branchName,
                })
            );

            setValue(STAGE_FORM_NAMES.qualityGates.name, newQualityGatesValue);
        },
        [setValue]
    );

    const handleAddApplicationRow = React.useCallback(() => {
        setQualityGates(prev => {
            const newQualityGates = [...prev, createQualityGateBase(qualityGates.length + 1)];

            setNewQualityGates(newQualityGates);

            return newQualityGates;
        });
    }, [qualityGates.length, setNewQualityGates]);

    const handleRemoveApplicationRow = React.useCallback(
        (idx: number) => {
            setQualityGates(prev => {
                const newQualityGates = prev.filter(el => el.id !== idx);

                setNewQualityGates(newQualityGates);

                // @ts-ignore
                resetField(createQualityGateTypeFieldName(idx));
                // @ts-ignore
                resetField(createQualityGateStepNameFieldName(idx));
                // @ts-ignore
                resetField(createQualityGateAutotestFieldName(idx));
                // @ts-ignore
                resetField(createQualityGateTypeAutotestsBranchFieldName(idx));

                return newQualityGates;
            });
        },
        [resetField, setNewQualityGates]
    );

    const autotestsWithBranchesOptions = useAutotestsWithBranches();

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={'h6'}>Quality gates</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {qualityGates.map(el => {
                            const key = el.id;

                            return (
                                <React.Fragment key={key}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2} alignItems={'flex-end'}>
                                            <Grid item xs={11}>
                                                <Grid container>
                                                    <QualityGateRow
                                                        autotestsWithBranchesOptions={
                                                            autotestsWithBranchesOptions
                                                        }
                                                        currentQualityGateData={el}
                                                        setQualityGates={setQualityGates}
                                                        setNewQualityGates={setNewQualityGates}
                                                        qualityGates={qualityGates}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Render condition={el.id !== 0}>
                                                    <Button
                                                        type={'button'}
                                                        size={'small'}
                                                        component={'button'}
                                                        style={{ minWidth: 0 }}
                                                        onClick={() =>
                                                            handleRemoveApplicationRow(el.id)
                                                        }
                                                    >
                                                        <Icon
                                                            icon={ICONS['BUCKET']}
                                                            width={20}
                                                            color={theme.palette.grey['500']}
                                                        />
                                                    </Button>
                                                </Render>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            );
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type={'button'}
                        size={'small'}
                        component={'button'}
                        style={{ minWidth: 0 }}
                        variant={'contained'}
                        color={'default'}
                        onClick={handleAddApplicationRow}
                    >
                        add
                    </Button>
                </Grid>
                <Render condition={!qualityGatesFieldValue || !qualityGatesFieldValue.length}>
                    <Grid item xs={12}>
                        <Alert severity="info" variant="outlined">
                            Add at least one quality gate
                        </Alert>
                    </Grid>
                </Render>
            </Grid>
        </>
    );
};
