import { NameValueTable } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { PIPELINE_TYPES } from '../../../../../../../../constants/pipelineTypes';
import { PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE } from '../../../../../../../../k8s/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../k8s/PipelineRun/types';
import { INTEGRATION_SECRET_NAMES } from '../../../../../../../../k8s/Secret/constants';
import { useSecretByNameQuery } from '../../../../../../../../k8s/Secret/hooks/useSecretByName';
import { FormSelect } from '../../../../../../../../providers/Form/components/FormSelect';
import { safeDecode } from '../../../../../../../../utils/decodeEncode';
import { capitalizeFirstLetter } from '../../../../../../../../utils/format/capitalizeFirstLetter';
import { rem } from '../../../../../../../../utils/styling/rem';
import { DependencyTrackMetrics } from '../../../../../../../../widgets/DeeptrackVulnerabilities';
import { PipelineRunList } from '../../../../../../../../widgets/PipelineRunList';
import { SonarQubeMetrics } from '../../../../../../../../widgets/SonarQubeMetrics';
import { QuickLinkDetailsRouteParams } from '../../../../../../types';
import { useMainInfoRows } from './hooks/useMainInfoRows';
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

export const Details = ({ codebaseData, codebaseBranchData, pipelineRuns }: DetailsProps) => {
  const { namespace } = useParams<QuickLinkDetailsRouteParams>();
  const [pipelineRunType, setPipelineRunType] = React.useState<PIPELINE_TYPES>(PIPELINE_TYPES.ALL);
  const filteredPipelineRunsByType = React.useMemo(
    () => filterPipelineRunsByType(pipelineRunType, pipelineRuns.all),
    [pipelineRunType, pipelineRuns.all]
  );

  const { data: ciDependencyTrackURL } = useSecretByNameQuery<string>({
    props: {
      namespace,
      name: INTEGRATION_SECRET_NAMES.DEPENDENCY_TRACK,
    },
    options: {
      select: (data) => {
        return safeDecode(data?.data?.url);
      },
    },
  });

  const {
    register,
    control,
    formState: { errors },
  } = useForm();

  const mainInfoRows = useMainInfoRows(codebaseBranchData);

  return (
    <Grid container spacing={4} style={{ marginTop: rem(20) }}>
      <Grid item xs={12}>
        <Grid container alignItems={'center'}>
          <Grid item>
            <SonarQubeMetrics
              codebaseName={codebaseData.metadata.name}
              branchName={codebaseBranchData.spec.branchName}
              namespace={namespace}
            />
          </Grid>
          <Grid item style={{ marginLeft: 'auto' }}>
            <DependencyTrackMetrics
              ciDependencyTrackURL={ciDependencyTrackURL}
              codebaseBranchName={codebaseBranchData.spec.branchName}
              codebaseName={codebaseData.metadata.name}
            />
          </Grid>
        </Grid>
      </Grid>
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
            <PipelineRunList
              pipelineRuns={filteredPipelineRunsByType}
              isLoading={pipelineRuns.all === null}
              filterFunction={null}
            />
          </Grid>
        </Grid>
      </Grid>
      {!!mainInfoRows?.length ? (
        <Grid item xs={12}>
          <Typography variant={'h6'}>Build Info</Typography>
          <NameValueTable rows={mainInfoRows} />
        </Grid>
      ) : null}
    </Grid>
  );
};
