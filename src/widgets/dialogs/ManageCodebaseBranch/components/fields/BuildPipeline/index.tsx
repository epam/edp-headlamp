import { Icon } from '@iconify/react';
import { Box, IconButton, Stack } from '@mui/material';
import React from 'react';
import { LoadingWrapper } from '../../../../../../components/LoadingWrapper';
import { FORM_CONTROL_LABEL_HEIGHT } from '../../../../../../constants/ui';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { useDialogContext } from '../../../../../../providers/NewDialog/hooks';
import { PipelineGraphDialog } from '../../../../PipelineGraph';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';

export const BuildPipeline = () => {
  const { setDialog } = useDialogContext();

  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useTypedFormContext();

  const {
    props: {
      pipelines: { build: buildPipeline },
    },
    extra: { buildPipelines },
  } = useCurrentDialog();

  const options = buildPipelines.isLoading
    ? [
        {
          label: buildPipeline,
          value: buildPipeline,
        },
      ]
    : (buildPipelines.data?.items || []).map(({ metadata: { name } }) => ({
        label: name,
        value: name,
      }));

  const currentValue = watch(CODEBASE_BRANCH_FORM_NAMES.buildPipeline.name);
  const currentPipeline = buildPipelines.data?.items.find(
    ({ metadata: { name } }) => name === currentValue
  );

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <Box flexGrow={1}>
        <FormSelect
          {...register(CODEBASE_BRANCH_FORM_NAMES.buildPipeline.name, {
            required: 'Select Build pipeline',
          })}
          label={'Build pipeline'}
          control={control}
          errors={errors}
          options={options}
        />
      </Box>
      <Box sx={{ pt: (t) => t.typography.pxToRem(FORM_CONTROL_LABEL_HEIGHT) }}>
        <LoadingWrapper isLoading={buildPipelines.isLoading} size={20}>
          <IconButton
            onClick={() => {
              setDialog(PipelineGraphDialog, {
                pipeline: currentPipeline,
              });
            }}
            size={'small'}
          >
            <Icon icon={ICONS.DIAGRAM} width={20} />
          </IconButton>
        </LoadingWrapper>
      </Box>
    </Stack>
  );
};
