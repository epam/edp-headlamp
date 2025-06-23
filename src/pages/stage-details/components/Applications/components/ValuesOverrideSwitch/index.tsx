import { Icon } from '@iconify/react';
import { Box, Stack, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { FormSwitch } from '../../../../../../providers/Form/components/FormSwitch';
import {
  ALL_VALUES_OVERRIDE_KEY,
  APPLICATIONS_TABLE_MODE,
  VALUES_OVERRIDE_POSTFIX,
} from '../../../../constants';
import { ValuesOverrideSwitchProps } from './types';

export const ValuesOverrideSwitch = ({
  enrichedApplicationWithArgoApplication,
  mode,
}: ValuesOverrideSwitchProps) => {
  const theme = useTheme();
  const { application, argoApplication } = enrichedApplicationWithArgoApplication;
  const {
    control,
    formState: { errors },
    register,
    setValue,
    getValues,
    watch,
  } = useFormContext();

  const currentResourceValue = argoApplication
    ? Object.hasOwn(argoApplication?.spec, 'sources')
    : false;

  const thisFieldValue = watch(`${application.metadata.name}${VALUES_OVERRIDE_POSTFIX}`) as boolean;

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%' }}>
      <div>
        <FormSwitch
          label={<></>}
          {...register(`${application.metadata.name}${VALUES_OVERRIDE_POSTFIX}`, {
            onChange: () => {
              const hasAtLeastOneFalse = Object.entries(getValues())
                .filter(([key]) => key.includes(VALUES_OVERRIDE_POSTFIX))
                .some(([, value]) => value === false);

              setValue(ALL_VALUES_OVERRIDE_KEY, !hasAtLeastOneFalse);
            },
          })}
          align={'center'}
          control={control}
          errors={errors}
          disabled={mode === APPLICATIONS_TABLE_MODE.PREVIEW}
        />
      </div>
      {mode === APPLICATIONS_TABLE_MODE.CONFIGURATION &&
        thisFieldValue !== currentResourceValue && (
          <Box sx={{ lineHeight: 0 }}>
            <Tooltip title="Warning: This action will mutate override values usage for this application deployment.">
              <Icon icon={ICONS.WARNING} width={20} color={theme.palette.primary.main} />
            </Tooltip>
          </Box>
        )}
    </Stack>
  );
};
