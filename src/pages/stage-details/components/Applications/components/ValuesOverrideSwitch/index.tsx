import { Icon } from '@iconify/react';
import { Box, Stack, Switch, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
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
  const { control, setValue, getValues } = useFormContext();

  const currentResourceValue = argoApplication
    ? Object.hasOwn(argoApplication?.spec, 'sources')
    : false;

  const fieldName = `${application.metadata.name}${VALUES_OVERRIDE_POSTFIX}`;

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%' }}>
          <Switch
            {...field}
            checked={!!field.value}
            onChange={(e) => {
              field.onChange(e.target.checked);

              // Update ALL_VALUES_OVERRIDE_KEY based on all field values
              setTimeout(() => {
                const hasAtLeastOneFalse = Object.entries(getValues())
                  .filter(([key]) => key.includes(VALUES_OVERRIDE_POSTFIX))
                  .some(([, value]) => value === false);

                setValue(ALL_VALUES_OVERRIDE_KEY, !hasAtLeastOneFalse);
              }, 0);
            }}
            color="primary"
            disabled={mode === APPLICATIONS_TABLE_MODE.PREVIEW}
          />
          {mode === APPLICATIONS_TABLE_MODE.CONFIGURATION &&
            field.value !== currentResourceValue && (
              <Box sx={{ lineHeight: 0 }}>
                <Tooltip title="Warning: This action will mutate override values usage for this application deployment.">
                  <Icon icon={ICONS.WARNING} width={20} color={theme.palette.primary.main} />
                </Tooltip>
              </Box>
            )}
        </Stack>
      )}
    />
  );
};
