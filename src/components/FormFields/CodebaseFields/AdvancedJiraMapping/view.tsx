import { useFormContext } from 'react-hook-form';
import { MuiCore, React } from '../../../../plugin.globals';
import { SelectOption } from '../../../../types/forms';
import { FormSelect } from '../../../FormComponents';
import { Render } from '../../../Render';
import { AdvancedJiraMappingRow } from './components/AdvancedJiraMappingRow';
import { advancedMappingBase } from './constants';
import { useHandleAddMappingRow } from './hooks/useHandleAddMappingRow';
import { useHandleDeleteMappingRow } from './hooks/useHandleDeleteMappingRow';
import { useOnChangeJiraPattern } from './hooks/useOnChangeJiraPattern';
import { useUpdateJiraMapping } from './hooks/useUpdateJiraMapping';
import { AdvancedJiraMappingProps, AdvancedMappingItem, AdvancedMappingRow } from './types';
import { getAdvancedMappingOptions } from './utils';

const { Grid, Button } = MuiCore;

export const AdvancedJiraMapping = ({ names, handleFormFieldChange }: AdvancedJiraMappingProps) => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const advancedMappingFieldNameValue = watch(names.advancedMappingFieldName.name);

    const [advancedMapping, setAdvancedMapping] =
        React.useState<AdvancedMappingItem[]>(advancedMappingBase);

    const [advancedMappingRows, setAdvancedMappingRows] = React.useState<AdvancedMappingRow[]>([]);

    const advancedMappingOptions: SelectOption[] = React.useMemo(
        () => getAdvancedMappingOptions(advancedMapping),
        [advancedMapping]
    );

    const advancedMappingFieldNameIsDisabled: boolean = React.useMemo(() => {
        return !advancedMapping.filter(({ isUsed }) => isUsed === false).length;
    }, [advancedMapping]);

    const { onChangeJiraPattern } = useOnChangeJiraPattern({
        setAdvancedMappingRows,
        names,
        handleFormFieldChange,
    });

    const { handleDeleteMappingRow } = useHandleDeleteMappingRow({
        setAdvancedMappingRows,
        setAdvancedMapping,
        names,
        handleFormFieldChange,
    });

    const { handleAddMappingRow } = useHandleAddMappingRow({
        setAdvancedMappingRows,
        setAdvancedMapping,
        names,
        advancedMapping,
    });

    useUpdateJiraMapping({ names, setAdvancedMapping, setAdvancedMappingRows });

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
                            title={
                                <div>
                                    <p>
                                        There are four predefined variables with the respective
                                        values that can be specified singly or as a combination:{' '}
                                        <br />
                                    </p>
                                    {/* @ts-ignore */}
                                    <ul type="square">
                                        <li>
                                            {' '}
                                            <b>EDP_COMPONENT</b> – returns application-name <br />
                                        </li>
                                        <li>
                                            {' '}
                                            <b>EDP_VERSION</b> – returns <b>0.0.0-SNAPSHOT</b> or{' '}
                                            <b>0.0.0-RC</b> <br />
                                        </li>
                                        <li>
                                            {' '}
                                            <b>EDP_SEM_VERSION</b> – returns <b>0.0.0</b> <br />
                                        </li>
                                        <li>
                                            {' '}
                                            <b>EDP_GITTAG</b> – returns{' '}
                                            <b>build/0.0.0-SNAPSHOT.2</b> or <b>build/0.0.0-RC.2</b>{' '}
                                            <br />
                                        </li>
                                    </ul>
                                    <em>
                                        There are no character restrictions when combining the
                                        variables, combination samples:
                                        <b>EDP_SEM_VERSION-EDP_COMPONENT</b> or{' '}
                                        <b>EDP_COMPONENT-hello-world/EDP_VERSION</b>, etc.
                                    </em>
                                </div>
                            }
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
                            add
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Render condition={!!advancedMappingRows.length}>
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
