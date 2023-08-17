import { Icon } from '@iconify/react';
import { Button, Grid, Typography, useTheme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Render } from '../../../../../components/Render';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { useAutotestsWithBranches } from '../../../../../k8s/EDPCodebase/hooks/useAutotestsWithBranches';
import { useSpecificDialogContext } from '../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../constants';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageDialogForwardedProps, CreateEditStageFormValues } from '../../../types';
import { QualityGateRow } from './components/QualityGateRow';
import { DEFAULT_QUALITY_GATE } from './constants';
import { QualityGate } from './types';
import {
    createQualityGateAutotestFieldName,
    createQualityGateStepNameFieldName,
    createQualityGateTypeAutotestsBranchFieldName,
    createQualityGateTypeFieldName,
} from './utils';

export const QualityGates = () => {
    const theme: DefaultTheme = useTheme();

    const { resetField, watch, setValue } = useFormContext<CreateEditStageFormValues>();

    const {
        forwardedProps: { CDPipelineData },
    } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(
        CREATE_EDIT_STAGE_DIALOG_NAME
    );

    const qualityGatesFieldValue = watch(STAGE_FORM_NAMES.qualityGates.name);

    const handleAddApplicationRow = React.useCallback(() => {
        setValue(STAGE_FORM_NAMES.qualityGates.name, [
            ...qualityGatesFieldValue,
            {
                ...DEFAULT_QUALITY_GATE,
                id: uuidv4(),
            },
        ]);
    }, [qualityGatesFieldValue, setValue]);

    const handleRemoveApplicationRow = React.useCallback(
        qualityGateIdx => {
            setValue(
                STAGE_FORM_NAMES.qualityGates.name,
                qualityGatesFieldValue.filter(el => {
                    return el.id !== qualityGateIdx;
                })
            );
            // @ts-ignore
            resetField(createQualityGateTypeFieldName(qualityGateIdx));
            // @ts-ignore
            resetField(createQualityGateStepNameFieldName(qualityGateIdx));
            // @ts-ignore
            resetField(createQualityGateAutotestFieldName(qualityGateIdx));
            // @ts-ignore
            resetField(createQualityGateTypeAutotestsBranchFieldName(qualityGateIdx));
        },
        [qualityGatesFieldValue, resetField, setValue]
    );

    const autotestsWithBranchesOptions = useAutotestsWithBranches(
        CDPipelineData?.metadata.namespace
    );

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={'h6'}>Quality gates</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {(qualityGatesFieldValue as QualityGate[]).map(el => {
                            const key = `quality-gate-row::${el.id}`;

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
                                                        currentQualityGate={el}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={1}>
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
