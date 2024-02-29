import { Icon } from '@iconify/react';
import { Button, ButtonGroup, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TableColumn } from '../../../../../components/Table/types';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';
import { EnrichedApplicationWithArgoApplication } from '../../../types';
import { ButtonsMap } from '../types';

export const useUpperColumns = ({
  selected,
  buttonsEnabledMap,
  onDeployClick,
  onUninstallClick,
  onLatestClick,
  onStableClick,
}: {
  selected: string[];
  buttonsEnabledMap: ButtonsMap;
  onDeployClick: () => void;
  onUninstallClick: () => void;
  onLatestClick: () => void;
  onStableClick: () => void;
}): TableColumn<EnrichedApplicationWithArgoApplication>[] => {
  const numSelected = React.useMemo(() => selected.length, [selected]);
  const { reset } = useFormContext();
  const {
    stage: { data: stage },
  } = useDynamicDataContext();

  return React.useMemo(
    () => [
      {
        id: 'selected',
        label: '',
        render: () => {
          return numSelected > 0 ? (
            <Typography variant={'body1'}>{numSelected} item(s) selected</Typography>
          ) : null;
        },
        colSpan: 4,
      },
      {
        id: 'deployUpdateUninstall',
        label: '',
        render: () => {
          return (
            <Grid container alignItems={'center'} spacing={2}>
              <Grid item>
                <Tooltip title={'Deploy selected applications with selected image stream version'}>
                  <div>
                    <IconButton
                      onClick={onDeployClick}
                      disabled={!numSelected || !buttonsEnabledMap.deploy}
                      size="medium"
                    >
                      <Icon icon={'solar:upload-linear'} />
                    </IconButton>
                  </div>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={'Uninstall selected applications'}>
                  <div>
                    <IconButton
                      onClick={onUninstallClick}
                      disabled={!numSelected || !buttonsEnabledMap.uninstall}
                      size="medium"
                    >
                      <Icon icon={ICONS.BUCKET} />
                    </IconButton>
                  </div>
                </Tooltip>
              </Grid>
            </Grid>
          );
        },
      },
      {
        id: 'valuesOverride',
        label: '',
        render: () => null,
      },
      {
        id: 'latestStableReset',
        label: '',
        render: () => {
          return (
            <Grid container alignItems={'center'} spacing={2}>
              <Grid item>
                <ButtonGroup>
                  <Tooltip title={'Set selected applications latest image stream version'}>
                    <Button
                      onClick={onLatestClick}
                      variant={'outlined'}
                      color={'primary'}
                      size="small"
                      fullWidth
                      disabled={!numSelected}
                    >
                      latest
                    </Button>
                  </Tooltip>
                  <Tooltip title={'Set selected applications stable image stream version'}>
                    <Button
                      onClick={onStableClick}
                      variant={'outlined'}
                      color={'primary'}
                      size="small"
                      fullWidth
                      disabled={!numSelected}
                    >
                      stable
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              </Grid>
              <Grid item>
                <Tooltip title={'Reset selected image stream versions'}>
                  <Button
                    onClick={() => reset()}
                    variant={'outlined'}
                    color={'primary'}
                    size="small"
                    startIcon={<Icon icon={'system-uicons:reset'} />}
                    fullWidth
                    disabled={!selected || !selected.length}
                  >
                    reset
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          );
        },
      },
      ...(stage?.spec.clusterName === 'in-cluster'
        ? ([
            {
              id: 'pods',
              label: 'Pods',
              render: () => null,
            },
          ] as TableColumn<EnrichedApplicationWithArgoApplication>[])
        : []),
      {
        id: 'ingress',
        label: '',
        render: () => null,
      },
    ],
    [
      buttonsEnabledMap,
      numSelected,
      onDeployClick,
      onLatestClick,
      onStableClick,
      onUninstallClick,
      reset,
      selected,
      stage,
    ]
  );
};
