import { useFormContext } from 'react-hook-form';
import { ICON_BUCKET, ICON_PLUS } from '../../../../../../../constants/icons';
import { useAutotestsWithBranches } from '../../../../../../../hooks/useAutotestsWithBranches';
import { Iconify, MuiCore, MuiStyles, React } from '../../../../../../../plugin.globals';
import { Render } from '../../../../../../Render';
import { QualityGateRow } from './components/QualityGateRow';
import { QualityGate, QualityGatesProps } from './types';
import {
    createQualityGateAutotestFieldName,
    createQualityGateStepNameFieldName,
    createQualityGateTypeAutotestsBranchFieldName,
    createQualityGateTypeFieldName,
} from './utils';

const { Grid, Typography, Button } = MuiCore;
const { useTheme } = MuiStyles;
const { Icon } = Iconify;

const createQualityGateBase = (idx: number): QualityGate => ({
    id: idx,
    qualityGateType: 'manual',
    stepName: '',
    autotestName: null,
    branchName: null,
});

export const QualityGates = ({ namespace, names, handleFormFieldChange }: QualityGatesProps) => {
    const theme = useTheme();

    const { resetField, watch, setValue } = useFormContext();

    const qualityGatesFieldValue = watch(names.qualityGates.name);

    const { autotests } = useAutotestsWithBranches({ namespace });

    const [qualityGates, setQualityGates] = React.useState<QualityGate[]>([
        createQualityGateBase(0),
    ]);

    const setNewQualityGates = React.useCallback(
        (newQualityGates: QualityGate[]): void => {
            handleFormFieldChange({
                target: {
                    name: names.qualityGates.name,
                    value: newQualityGates.map(
                        ({ qualityGateType, stepName, autotestName, branchName }) => ({
                            qualityGateType,
                            stepName,
                            autotestName,
                            branchName,
                        })
                    ),
                },
            });
        },
        [handleFormFieldChange, names.qualityGates.name]
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

                resetField(createQualityGateTypeFieldName(idx));
                resetField(createQualityGateStepNameFieldName(idx));
                resetField(createQualityGateAutotestFieldName(idx));
                resetField(createQualityGateTypeAutotestsBranchFieldName(idx));

                return newQualityGates;
            });
        },
        [resetField, setNewQualityGates]
    );

    React.useEffect(() => {
        if (qualityGatesFieldValue) {
            const newQualityGates = qualityGatesFieldValue.map(
                ({ qualityGateType, stepName, autotestName, branchName }, idx) => {
                    setValue(createQualityGateTypeFieldName(idx), qualityGateType);
                    setValue(createQualityGateStepNameFieldName(idx), stepName);
                    setValue(createQualityGateAutotestFieldName(idx), autotestName);
                    setValue(createQualityGateTypeAutotestsBranchFieldName(idx), branchName);

                    return {
                        id: idx,
                        qualityGateType,
                        stepName,
                        autotestName,
                        branchName,
                    };
                }
            );
            setQualityGates(newQualityGates);
        } else {
            setQualityGates([]);
        }
    }, [qualityGatesFieldValue, setValue]);

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
                                                        autotests={autotests}
                                                        currentQualityGateData={el}
                                                        setQualityGates={setQualityGates}
                                                        setNewQualityGates={setNewQualityGates}
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
                                                            icon={ICON_BUCKET}
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
                        <Icon icon={ICON_PLUS} width={15} color={theme.palette.text.primary} />
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
