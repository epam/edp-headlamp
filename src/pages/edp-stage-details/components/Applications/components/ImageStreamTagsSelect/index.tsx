import React from 'react';
import { useFormContext } from 'react-hook-form';
import { createImageStreamTags } from '../../../../../../k8s/EDPCodebaseImageStream/utils/createImageStreamTags';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { SelectOption } from '../../../../../../types/forms';
import { ImageStreamTagsSelectProps } from './types';

export const ImageStreamTagsSelect = ({
  enrichedApplicationWithArgoApplication,
  selected,
  handleSelectRowClick,
}: ImageStreamTagsSelectProps) => {
  const { applicationImageStream, applicationVerifiedImageStream, application } =
    enrichedApplicationWithArgoApplication;
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext();

  const imageStreamTagsOptions: SelectOption[] = React.useMemo(
    () => createImageStreamTags(applicationImageStream, applicationVerifiedImageStream),
    [applicationImageStream, applicationVerifiedImageStream]
  );

  return (
    <div style={{ width: '100%' }}>
      <FormSelect
        {...register(`${application.metadata.name}::image-tag`, {
          required: selected.includes(application.metadata.name),
          onChange: event =>
            !selected.includes(application.metadata.name) &&
            handleSelectRowClick(event, enrichedApplicationWithArgoApplication),
        })}
        control={control}
        errors={errors}
        options={imageStreamTagsOptions}
        disabled={!imageStreamTagsOptions.length}
        placeholder={'Image stream version'}
      />
    </div>
  );
};
