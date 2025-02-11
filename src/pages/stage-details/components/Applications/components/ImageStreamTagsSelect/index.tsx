import { Box, Stack } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { createImageStreamTags } from '../../../../../../k8s/groups/EDP/CodebaseImageStream/utils/createImageStreamTags';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { SelectOption } from '../../../../../../types/forms';
import { IMAGE_TAG_POSTFIX } from '../../../../constants';
import { ImageStreamTagsSelectProps } from './types';

export const ImageStreamTagsSelect = ({
  enrichedApplicationWithArgoApplication,
}: ImageStreamTagsSelectProps) => {
  const { applicationImageStream, applicationVerifiedImageStream, application } =
    enrichedApplicationWithArgoApplication;

  const {
    control,
    formState: { errors, defaultValues },
    register,
    watch,
  } = useFormContext();

  const imageStreamTagsOptions: SelectOption[] = React.useMemo(
    () => createImageStreamTags(applicationImageStream, applicationVerifiedImageStream),
    [applicationImageStream, applicationVerifiedImageStream]
  );

  const currentDefaultValue = defaultValues?.[`${application?.metadata.name}${IMAGE_TAG_POSTFIX}`];
  const currentValue = watch(
    `${application.metadata.name}${IMAGE_TAG_POSTFIX}`,
    currentDefaultValue
  );

  const imageTagsLength = imageStreamTagsOptions.length;

  const label = React.useMemo(() => {
    if (currentDefaultValue) {
      return `Running version: ${currentDefaultValue}`;
    }

    if (imageTagsLength) {
      return 'Select image tag';
    }

    return 'No image tags available';
  }, [currentDefaultValue, imageTagsLength]);

  const isSameAsDefaultValue = currentValue?.includes(currentDefaultValue);

  return (
    <Stack direction="row" spacing={1} width="100%">
      <Box
        sx={{
          flexShrink: 0,
          width: '4px',
          backgroundColor: (t) =>
            !imageTagsLength
              ? t.palette.error.main
              : isSameAsDefaultValue
              ? t.palette.action.disabled
              : t.palette.primary.main,
          borderRadius: '1px',
        }}
      />
      <Box flexGrow={1}>
        <FormSelect
          {...register(`${application.metadata.name}${IMAGE_TAG_POSTFIX}`, {
            required: 'Select image tag',
          })}
          label={label}
          control={control}
          errors={errors}
          options={imageStreamTagsOptions}
          disabled={!imageStreamTagsOptions.length}
          helperText={
            imageStreamTagsOptions.length
              ? ''
              : 'Run at least one build pipeline to produce the necessary artifacts.'
          }
        />
      </Box>
    </Stack>
  );
};
