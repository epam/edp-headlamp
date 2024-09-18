import { Icon } from '@iconify/react';
import { Box, Button, ButtonGroup, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { ButtonWithPermission } from '../../../../../components/ButtonWithPermission';
import { ConditionalWrapper } from '../../../../../components/ConditionalWrapper';
import { TableColumn } from '../../../../../components/Table/types';
import { DEFAULT_CLUSTER } from '../../../../../constants/clusters';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { FormSwitch } from '../../../../../providers/Form/components/FormSwitch';
import { PermissionsConfig } from '../../../../../providers/Permissions/types';
import {
  ALL_VALUES_OVERRIDE_KEY,
  APPLICATIONS_TABLE_MODE,
  IMAGE_TAG_POSTFIX,
  permissionsToCheckConfig,
  VALUES_OVERRIDE_POSTFIX,
} from '../../../constants';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';
import { EnrichedApplicationWithArgoApplication } from '../../../types';
import { ApplicationsTableMode, ButtonsMap } from '../types';

export const useUpperColumns = ({
  selected,
  buttonsEnabledMap,
  handleClickUninstall,
  handleClickLatest,
  handleClickStable,
  handleClickOverrideValuesAll,
  permissions,
  mode,
  values,
}: {
  selected: string[];
  buttonsEnabledMap: ButtonsMap;
  handleClickUninstall: () => void;
  handleClickLatest: () => void;
  handleClickStable: () => void;
  handleClickOverrideValuesAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  permissions: PermissionsConfig<typeof permissionsToCheckConfig>;
  mode: ApplicationsTableMode;
  values: FieldValues;
}): TableColumn<EnrichedApplicationWithArgoApplication>[] => {
  const theme = useTheme();
  const numSelected = React.useMemo(() => selected.length, [selected]);
  const {
    stage: { data: stage },
  } = useDynamicDataContext();

  const isDefaultCluster = stage?.spec.clusterName === DEFAULT_CLUSTER;

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const buttonsHighlighted = React.useMemo(() => {
    const valuesArray = Object.entries(values);
    const imageTagsValues = valuesArray.filter(([key]) => key && key.includes(IMAGE_TAG_POSTFIX));
    const valuesOverrides = valuesArray.filter(
      ([key]) => key && key.includes(VALUES_OVERRIDE_POSTFIX)
    );

    if (!imageTagsValues.length) {
      return {
        latest: false,
        stable: false,
      };
    }

    const allVersionsAreLatest = imageTagsValues.every(([, value]) => value?.includes('latest::'));
    const allVersionsAreStable = imageTagsValues.every(([, value]) => value?.includes('stable::'));
    const allAppsHasValuesOverride = valuesOverrides.every(([, value]) => value === true);

    return {
      latest: allVersionsAreLatest,
      stable: allVersionsAreStable,
      valuesOverride: allAppsHasValuesOverride,
    };
  }, [values]);

  return React.useMemo(
    () =>
      mode === APPLICATIONS_TABLE_MODE.PREVIEW
        ? [
            {
              id: 'selected',
              label: '',
              render: () => (
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ minWidth: theme.typography.pxToRem(150) }}>
                    <Typography variant={'body1'}>{numSelected} item(s) selected</Typography>
                  </Box>
                </Stack>
              ),
              colSpan: 7,
            },
            {
              id: 'aboveIngressColumn',
              label: '',
              render: () => (
                <ConditionalWrapper
                  condition={permissions.delete.Application.allowed}
                  wrapper={(children) => (
                    <Tooltip title="Uninstall selected applications">
                      <div>{children}</div>
                    </Tooltip>
                  )}
                >
                  <ButtonWithPermission
                    ButtonProps={{
                      size: 'medium',
                      startIcon: <Icon icon={ICONS.BUCKET} />,
                      onClick: handleClickUninstall,
                      disabled: !numSelected || !buttonsEnabledMap.uninstall,
                      sx: { color: theme.palette.secondary.dark },
                    }}
                    disabled={!permissions.delete.Application.allowed}
                    reason={permissions.delete.Application.reason}
                  >
                    delete
                  </ButtonWithPermission>
                </ConditionalWrapper>
              ),
              textAlign: 'right',
            },
          ]
        : [
            {
              id: 'empty',
              label: '',
              render: () => <Box sx={{ width: '48px' }} />,
              width: '64',
            },
            {
              id: 'aboveHealthColumn',
              label: '',
              render: () => null,
            },
            {
              id: 'aboveSyncColumn',
              label: '',
              render: () => null,
            },
            {
              id: 'aboveApplicationColumn',
              label: '',
              render: () => null,
            },
            {
              id: 'aboveDeployedVersionColumn',
              label: '',
              render: () => (
                <ButtonGroup>
                  <Tooltip title={'Set selected applications latest image stream version'}>
                    <Button
                      onClick={handleClickLatest}
                      variant={buttonsHighlighted.latest ? 'contained' : 'outlined'}
                      color={'primary'}
                      size="small"
                      fullWidth
                    >
                      latest
                    </Button>
                  </Tooltip>
                  <Tooltip title={'Set selected applications stable image stream version'}>
                    <Button
                      onClick={handleClickStable}
                      variant={buttonsHighlighted.stable ? 'contained' : 'outlined'}
                      color={'primary'}
                      size="small"
                      fullWidth
                    >
                      stable
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              ),
            },
            {
              id: 'aboveValuesOverrideColumn',
              label: '',
              render: () => (
                <FormSwitch
                  label={undefined}
                  {...register(ALL_VALUES_OVERRIDE_KEY, {
                    onChange: handleClickOverrideValuesAll,
                  })}
                  align={'flex-start'}
                  control={control}
                  errors={errors}
                  defaultValue={buttonsHighlighted.valuesOverride}
                />
              ),
            },
            ...(isDefaultCluster
              ? ([
                  {
                    id: 'abovePodsColumn',
                    label: '',
                    render: () => null,
                  },
                ] as TableColumn<EnrichedApplicationWithArgoApplication>[])
              : []),
            {
              id: 'aboveIngressColumn',
              label: '',
              render: () => null,
            },
          ],
    [
      mode,
      isDefaultCluster,
      theme.typography,
      theme.palette.secondary.dark,
      numSelected,
      permissions.delete.Application.allowed,
      permissions.delete.Application.reason,
      handleClickUninstall,
      buttonsEnabledMap.uninstall,
      handleClickLatest,
      buttonsHighlighted.latest,
      buttonsHighlighted.stable,
      buttonsHighlighted.valuesOverride,
      handleClickStable,
      register,
      handleClickOverrideValuesAll,
      control,
      errors,
    ]
  );
};
