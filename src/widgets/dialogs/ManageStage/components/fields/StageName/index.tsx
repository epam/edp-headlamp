import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../types/forms';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { STAGE_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';
import { StageNameProps } from './types';

const nameRequirementLabel = `Name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, and cannot have whitespaces`;

export const StageName = ({ otherStagesNames }: StageNameProps) => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useTypedFormContext();

  const {
    props: { CDPipelineData },
  } = useCurrentDialog();

  const namespace = CDPipelineData.metadata.namespace || getDefaultNamespace();
  const CDPipelineName = CDPipelineData.metadata.name;

  return (
    <FormTextField
      {...register(STAGE_FORM_NAMES.name.name, {
        required: `Enter an Environment name. `,
        pattern: {
          value: /^[a-z](?!.*--[^-])[a-z0-9-]*[a-z0-9]$/,
          message: nameRequirementLabel,
        },
        onChange: ({ target: { value } }: FieldEvent) => {
          setValue(
            STAGE_FORM_NAMES.deployNamespace.name,
            `${namespace}-${CDPipelineName}-${value}`
          );
        },
        validate: (name) => {
          if (otherStagesNames.includes(name)) {
            return `"${name}" has been already added to the Environments that will be created`;
          }
        },
      })}
      label={'Environment name'}
      title={
        'Specify an environment name. This name identifies the specific environment within your Deployment Flow.'
      }
      placeholder={'Enter an Environment name'}
      control={control}
      errors={errors}
    />
  );
};
