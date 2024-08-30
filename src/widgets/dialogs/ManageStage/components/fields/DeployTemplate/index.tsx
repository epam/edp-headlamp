import { Icon } from '@iconify/react';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../../../components/ConditionalWrapper';
import { LoadingWrapper } from '../../../../../../components/LoadingWrapper';
import { FORM_CONTROL_LABEL_HEIGHT } from '../../../../../../constants/ui';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { usePipelineByNameQuery } from '../../../../../../k8s/groups/Tekton/Pipeline/hooks/usePipelineByNameQuery';
import { useDeployTriggerTemplateListQuery } from '../../../../../../k8s/groups/Tekton/TriggerTemplate/hooks/useDeployTriggerTemplateListQuery';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { PipelineGraphDialog } from '../../../../PipelineGraph';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { STAGE_FORM_NAMES } from '../../../names';

export const DeployTemplate = () => {
  const { setDialog } = useDialogContext();
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useTypedFormContext();

  const { data, isLoading } = useDeployTriggerTemplateListQuery({});

  const options = React.useMemo(() => {
    if (isLoading || !data) {
      return [];
    }
    return data?.items.map(({ metadata: { name } }) => ({
      label: name,
      value: name,
    }));
  }, [data, isLoading]);

  const fieldValue = watch(STAGE_FORM_NAMES.triggerTemplate.name);

  const templateByName = data?.items.find((item) => item.metadata.name === fieldValue);

  const { data: pipeline, isLoading: pipelineIsLoading } = usePipelineByNameQuery({
    props: {
      name: templateByName?.spec?.resourcetemplates?.[0]?.spec?.pipelineRef?.name,
    },
    options: {
      enabled: !!templateByName,
    },
  });

  const _pipelineIsLoading = fieldValue && pipelineIsLoading;

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <Box flexGrow={1}>
        <FormSelect
          {...register(STAGE_FORM_NAMES.triggerTemplate.name, {
            required: 'Select Deploy Pipeline template',
          })}
          label={'Deploy Pipeline template'}
          title="Choose a predefined blueprint outlining the deployment process for your application(s)."
          control={control}
          errors={errors}
          options={options}
        />
      </Box>

      <Box sx={{ pt: (t) => t.typography.pxToRem(FORM_CONTROL_LABEL_HEIGHT) }}>
        <LoadingWrapper isLoading={_pipelineIsLoading} size={20}>
          <ConditionalWrapper
            condition={!_pipelineIsLoading && !pipeline}
            wrapper={(children) => (
              <Tooltip
                title={
                  fieldValue
                    ? 'The selected template refers to a non-existent pipeline.'
                    : 'Select pipeline template.'
                }
              >
                {children}
              </Tooltip>
            )}
          >
            <div>
              <IconButton
                onClick={() => {
                  setDialog(PipelineGraphDialog, {
                    pipeline,
                  });
                }}
                disabled={!fieldValue || !pipeline}
                size={'small'}
              >
                <Icon icon={ICONS.DIAGRAM} width={20} />
              </IconButton>
            </div>
          </ConditionalWrapper>
        </LoadingWrapper>
      </Box>
    </Stack>
  );
};
