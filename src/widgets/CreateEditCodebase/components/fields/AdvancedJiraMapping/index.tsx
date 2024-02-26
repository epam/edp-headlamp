import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { SelectOption } from '../../../../../types/forms';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';
import { AdvancedJiraMappingRow } from './components/AdvancedJiraMappingRow';
import { advancedMappingBase } from './constants';
import { useHandleAddMappingRow } from './hooks/useHandleAddMappingRow';
import { useHandleDeleteMappingRow } from './hooks/useHandleDeleteMappingRow';
import { useOnChangeJiraPattern } from './hooks/useOnChangeJiraPattern';
import { useUpdateJiraMapping } from './hooks/useUpdateJiraMapping';
import { AdvancedMappingItem, AdvancedMappingRow } from './types';
import { getAdvancedMappingOptions } from './utils';

export const AdvancedJiraMapping = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<CreateCodebaseFormValues>();

  const advancedMappingFieldNameValue = watch(CODEBASE_FORM_NAMES.advancedMappingFieldName.name);

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
  });

  const { handleDeleteMappingRow } = useHandleDeleteMappingRow({
    setAdvancedMappingRows,
    setAdvancedMapping,
  });

  const { handleAddMappingRow } = useHandleAddMappingRow({
    setAdvancedMappingRows,
    setAdvancedMapping,
    advancedMapping,
  });

  useUpdateJiraMapping({ setAdvancedMapping, setAdvancedMappingRows });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <FormSelect
              {...register(CODEBASE_FORM_NAMES.advancedMappingFieldName.name)}
              label={'Mapping field name'}
              placeholder={
                advancedMappingFieldNameIsDisabled
                  ? 'No mapping field names remaining'
                  : 'Mapping field name'
              }
              title={
                <div>
                  <p>
                    There are four predefined variables with the respective values that can be
                    specified singly or as a combination: <br />
                  </p>
                  {/* @ts-ignore */}
                  <ul type="square">
                    <li>
                      {' '}
                      <b>QUICK_LINK</b> – returns application-name <br />
                    </li>
                    <li>
                      {' '}
                      <b>EDP_VERSION</b> – returns <b>0.0.0-SNAPSHOT</b> or <b>0.0.0-RC</b> <br />
                    </li>
                    <li>
                      {' '}
                      <b>EDP_SEM_VERSION</b> – returns <b>0.0.0</b> <br />
                    </li>
                    <li>
                      {' '}
                      <b>EDP_GITTAG</b> – returns <b>build/0.0.0-SNAPSHOT.2</b> or{' '}
                      <b>build/0.0.0-RC.2</b> <br />
                    </li>
                  </ul>
                  <em>
                    There are no character restrictions when combining the variables, combination
                    samples:
                    <b>EDP_SEM_VERSION-QUICK_LINK</b> or <b>QUICK_LINK-hello-world/EDP_VERSION</b>,
                    etc.
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
              disabled={!advancedMappingFieldNameValue}
              onClick={handleAddMappingRow}
            >
              add
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          {!!advancedMappingRows.length ? (
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
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};
