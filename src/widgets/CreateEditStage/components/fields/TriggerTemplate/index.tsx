import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeployTriggerTemplateListQuery } from '../../../../../k8s/groups/Tekton/TriggerTemplate/hooks/useDeployTriggerTemplateListQuery';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';

export const TriggerTemplate = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateEditStageFormValues>();

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

  return (
    <FormSelect
      {...register(STAGE_FORM_NAMES.triggerTemplate.name, {
        required: 'Select Pipeline template',
      })}
      label={'Pipeline template'}
      title="Choose a predefined blueprint outlining the deployment process for your application(s)."
      control={control}
      errors={errors}
      options={options}
    />
  );
};
