import { Icon } from '@iconify/react';
import { Button, FormControl, Grid, TextField, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { FormTextField } from '../../../../../../../../providers/Form/components/FormTextField';
import { createAdvancedMappingRowName } from '../../constants';
import { AdvancedJiraMappingRowProps } from './types';

export const AdvancedJiraMappingRow = ({
  label,
  value,
  handleDeleteMappingRow,
  onChangeJiraPattern,
}: AdvancedJiraMappingRowProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const theme: DefaultTheme = useTheme();

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextField disabled value={label} fullWidth />
        </Grid>
        <Grid item xs={5}>
          <FormControl fullWidth>
            <FormTextField
              {...register(createAdvancedMappingRowName(value), {
                required: 'Add at least one variable.',
                onBlur: (event) => onChangeJiraPattern(event, value),
              })}
              placeholder={`Enter Jira pattern`}
              control={control}
              errors={errors}
            />
          </FormControl>
        </Grid>
        <Grid
          item
          xs={2}
          direction={'column'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          style={{ display: 'flex' }}
        >
          <Button
            type={'button'}
            size={'small'}
            component={'button'}
            style={{ minWidth: 0 }}
            onClick={() => handleDeleteMappingRow(value)}
          >
            <Icon icon={ICONS.BUCKET} width={20} color={theme.palette.grey['500']} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
