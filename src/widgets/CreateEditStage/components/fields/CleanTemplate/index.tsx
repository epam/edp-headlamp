import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCleanTriggerTemplateListQuery } from '../../../../../k8s/groups/Tekton/TriggerTemplate/hooks/useCleanTriggerTemplateListQuery';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageFormValues } from '../../../types';

export const CleanTemplate = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateEditStageFormValues>();

  const { data, isLoading } = useCleanTriggerTemplateListQuery({});

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
      {...register(STAGE_FORM_NAMES.cleanTemplate.name, {
        required: 'Select Clean Pipeline template',
      })}
      label={'Clean Pipeline template'}
      title="Choose a predefined blueprint outlining the cleaning process for your environment."
      control={control}
      errors={errors}
      options={options}
    />
  );
};
