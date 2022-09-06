import { useFormContext } from 'react-hook-form';
import { ICON_PLUS } from '../../../../../../../constants/icons';
import { Iconify, MuiCore, MuiStyles, Notistack, React } from '../../../../../../../plugin.globals';
import { SelectOption } from '../../../../../../../types/forms';
import { FormSelect } from '../../../../../../FormComponents';
import { Render } from '../../../../../../Render';
import { AdvancedJiraMappingRow } from './components/AdvancedJiraMappingRow';
import { advancedMappingBase, createAdvancedMappingRowName } from './constants';
import { AdvancedJiraMappingProps, AdvancedMappingItem, AdvancedMappingRow } from './types';
import { getJiraIssueMetadataPayload, getJiraIssueMetadataPayloadDefaultValue } from './utils';

const { Grid, Button } = MuiCore;
const { Icon } = Iconify;
const { useTheme } = MuiStyles;
const { useSnackbar } = Notistack;

export const AdvancedJiraMapping = ({ names, handleFormFieldChange }: AdvancedJiraMappingProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const {
        register,
        control,
        formState: { errors },
        watch,
        setValue,
        resetField,
    } = useFormContext();

    const theme = useTheme();

    const advancedMappingFieldNameValue = watch(names.advancedMappingFieldName.name);
    const jiraIssueMetadataPayloadFieldValue = watch(names.jiraIssueMetadataPayload.name);

    const [advancedMapping, setAdvancedMapping] =
        React.useState<AdvancedMappingItem[]>(advancedMappingBase);

    const [advancedMappingRows, setAdvancedMappingRows] = React.useState<AdvancedMappingRow[]>([]);

    const advancedMappingOptions: SelectOption[] = React.useMemo(() => {
        return advancedMapping
            .map(({ label, value, isUsed }) =>
                !isUsed
                    ? {
                          label,
                          value,
                      }
                    : null
            )
            .filter(Boolean);
    }, [advancedMapping]);

    const advancedMappingFieldNameIsDisabled: boolean = React.useMemo(() => {
        return !advancedMapping.filter(({ isUsed }) => isUsed === false).length;
    }, [advancedMapping]);

    const onChangeJiraPattern = React.useCallback(
        (event, value): void => {
            setAdvancedMappingRows(prev => {
                const newRows = prev.map(el => {
                    if (el.value === value) {
                        return {
                            ...el,
                            jiraPattern: event.target.value || '',
                        };
                    }
                    return el;
                });

                const newJiraIssueMetadataPayload = getJiraIssueMetadataPayload(newRows);

                if (newJiraIssueMetadataPayload) {
                    const jiraIssueMetadataPayloadTarget = {
                        target: {
                            name: names.jiraIssueMetadataPayload.name,
                            value: newJiraIssueMetadataPayload,
                        },
                    };
                    setValue(names.jiraIssueMetadataPayload.name, newJiraIssueMetadataPayload);
                    handleFormFieldChange(jiraIssueMetadataPayloadTarget);
                }
                return newRows;
            });
        },
        [handleFormFieldChange, names.jiraIssueMetadataPayload.name, setValue]
    );

    const handleDeleteMappingRow = React.useCallback(
        value => {
            setAdvancedMappingRows(prev => {
                const newRows = prev.filter(({ value: innerValue }) => innerValue !== value);
                const newJiraIssueMetadataPayload = getJiraIssueMetadataPayload(newRows);
                setValue(names.jiraIssueMetadataPayload.name, newJiraIssueMetadataPayload);
                handleFormFieldChange({
                    target: {
                        name: names.jiraIssueMetadataPayload.name,
                        value: newJiraIssueMetadataPayload,
                    },
                });
                return newRows;
            });
            setAdvancedMapping(prev => {
                return prev.map(el => {
                    if (el.value === value) {
                        return {
                            ...el,
                            isUsed: false,
                        };
                    }

                    return el;
                });
            });
            resetField(createAdvancedMappingRowName(value));
        },
        [handleFormFieldChange, names.jiraIssueMetadataPayload.name, resetField, setValue]
    );

    const handleAddMappingRow = React.useCallback(() => {
        setAdvancedMapping(prev => {
            return prev.map(el => {
                if (el.value === advancedMappingFieldNameValue) {
                    return {
                        ...el,
                        isUsed: true,
                    };
                }

                return el;
            });
        });
        setAdvancedMappingRows(prev => {
            const [advancedMappingItemFitByName] = advancedMapping.filter(
                ({ value }) => value === advancedMappingFieldNameValue
            );

            return [
                ...prev,
                {
                    label: advancedMappingItemFitByName.label,
                    value: advancedMappingItemFitByName.value,
                    jiraPattern: '',
                },
            ];
        });
        setValue(names.advancedMappingFieldName.name, '');
    }, [
        advancedMapping,
        advancedMappingFieldNameValue,
        names.advancedMappingFieldName.name,
        setValue,
    ]);

    React.useEffect(() => {
        const newRows = getJiraIssueMetadataPayloadDefaultValue(jiraIssueMetadataPayloadFieldValue);

        for (const { value, jiraPattern } of newRows) {
            setValue(createAdvancedMappingRowName(value), jiraPattern);
        }

        setAdvancedMapping(prevAdvancedMapping => {
            return prevAdvancedMapping.map(el => {
                const [fitItem] = newRows.filter(innerEl => innerEl.value === el.value);
                return {
                    ...el,
                    isUsed: !!fitItem,
                };
            });
        });
        setAdvancedMappingRows(newRows);
    }, [enqueueSnackbar, jiraIssueMetadataPayloadFieldValue, setValue]);

    return (
        <>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <FormSelect
                            {...register(names.advancedMappingFieldName.name)}
                            label={'Mapping field name'}
                            placeholder={
                                advancedMappingFieldNameIsDisabled
                                    ? 'No mapping field names remaining'
                                    : 'Mapping field name'
                            }
                            title={'Select mapping field name'}
                            control={control}
                            errors={errors}
                            disabled={advancedMappingFieldNameIsDisabled}
                            options={advancedMappingOptions}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        direction={'column'}
                        justifyContent={'flex-end'}
                        alignItems={'center'}
                        style={{ display: 'flex' }}
                    >
                        <Button
                            type={'button'}
                            size={'small'}
                            component={'button'}
                            style={{ minWidth: 0 }}
                            variant={'contained'}
                            color={'default'}
                            disabled={!advancedMappingFieldNameValue}
                            onClick={handleAddMappingRow}
                        >
                            <Icon
                                icon={ICON_PLUS}
                                width={15}
                                color={
                                    !advancedMappingFieldNameValue
                                        ? 'white'
                                        : theme.palette.text.primary
                                }
                            />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Render condition={advancedMappingRows.length}>
                        <>
                            {advancedMappingRows.map(({ label, value }, idx) => {
                                const key = `${value}::${idx}`;

                                return (
                                    <AdvancedJiraMappingRow
                                        key={key}
                                        label={label}
                                        value={value}
                                        onChangeJiraPattern={onChangeJiraPattern}
                                        handleDeleteMappingRow={handleDeleteMappingRow}
                                    />
                                );
                            })}
                        </>
                    </Render>
                </Grid>
            </Grid>
        </>
    );
};
