import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PIPELINE_TYPES } from '../../../../../../../../constants/pipelineTypes';
import { PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE } from '../../../../../../../../k8s/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../k8s/PipelineRun/types';
import { FormSelect } from '../../../../../../../../providers/Form/components/FormSelect';
import { ResourceActionListContextProvider } from '../../../../../../../../providers/ResourceActionList';
import { capitalizeFirstLetter } from '../../../../../../../../utils/format/capitalizeFirstLetter';
import { rem } from '../../../../../../../../utils/styling/rem';
import { PipelineRunList } from '../../../../../../../../widgets/PipelineRunList';
import { usePermissionsContext } from '../../../../../../providers/Permissions/hooks';
import { DetailsProps } from './types';

const pipelineRunTypes = Object.entries(PIPELINE_TYPES).filter(
  ([, value]) => value !== PIPELINE_TYPES.DEPLOY && value !== PIPELINE_TYPES.AUTOTEST_RUNNER
);
const pipelineRunTypeSelectOptions = pipelineRunTypes.map(([, value]) => ({
  label: capitalizeFirstLetter(value),
  value: value,
}));

const filterPipelineRunsByType = (
  pipelineRunType: PIPELINE_TYPES,
  pipelineRuns: PipelineRunKubeObjectInterface[]
) =>
  pipelineRunType === PIPELINE_TYPES.ALL
    ? pipelineRuns
    : pipelineRuns.filter(
        ({ metadata: { labels } }) =>
          labels[PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE] === pipelineRunType
      );

export const Details = ({ pipelineRuns }: DetailsProps) => {
  const [pipelineRunType, setPipelineRunType] = React.useState<PIPELINE_TYPES>(PIPELINE_TYPES.ALL);
  const filteredPipelineRunsByType = React.useMemo(
    () => filterPipelineRunsByType(pipelineRunType, pipelineRuns.all),
    [pipelineRunType, pipelineRuns.all]
  );

  const {
    register,
    control,
    formState: { errors },
  } = useForm();

  const { pipelineRun: pipelineRunPermissions } = usePermissionsContext();

  return (
    <Grid container spacing={4} style={{ marginTop: rem(20) }}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems={'flex-end'}>
          <Grid item>
            <Typography variant={'h6'}>Pipeline Runs</Typography>
          </Grid>
          {!!pipelineRuns?.all?.length ? (
            <Grid item style={{ minWidth: rem(300), marginLeft: 'auto' }}>
              <FormSelect
                {...register('type', {
                  onChange: ({ target: { value } }) => setPipelineRunType(value),
                })}
                control={control}
                errors={errors}
                name={'type'}
                label={'Type'}
                options={pipelineRunTypeSelectOptions}
                defaultValue={PIPELINE_TYPES.ALL}
              />
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <ResourceActionListContextProvider>
              <PipelineRunList
                pipelineRuns={filteredPipelineRunsByType}
                isLoading={pipelineRuns.all === null}
                filterFunction={null}
                permissions={pipelineRunPermissions}
              />
            </ResourceActionListContextProvider>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
