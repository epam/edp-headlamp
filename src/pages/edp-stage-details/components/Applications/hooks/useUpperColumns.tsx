import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TableColumn } from '../../../../../components/Table/types';
import { DEFAULT_CLUSTER } from '../../../../../constants/clusters';
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
  onValuesOverrideAllClick,
  isDeployLoading,
}: {
  selected: string[];
  buttonsEnabledMap: ButtonsMap;
  onDeployClick: () => void;
  onUninstallClick: () => void;
  onLatestClick: () => void;
  onStableClick: () => void;
  onValuesOverrideAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDeployLoading: boolean;
}): TableColumn<EnrichedApplicationWithArgoApplication>[] => {
  const theme = useTheme();
  const numSelected = React.useMemo(() => selected.length, [selected]);
  const { reset } = useFormContext();
  const {
    stage: { data: stage },
  } = useDynamicDataContext();
  const timer = React.useRef<number | null>(null);
  const [deployBtnDisabled, setDeployBtnDisabled] = React.useState(false);

  return React.useMemo(
    () => [
      {
        id: 'selected',
        label: '',
        render: () => {
          return (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ minWidth: theme.typography.pxToRem(150) }}>
                {numSelected > 0 ? (
                  <Typography variant={'body1'}>{numSelected} item(s) selected</Typography>
                ) : null}
              </Box>
              <Tooltip title={'Deploy selected applications with selected image stream version'}>
                <div>
                  <Button
                    startIcon={
                      deployBtnDisabled || isDeployLoading ? (
                        <Icon icon={'line-md:loading-loop'} />
                      ) : (
                        <Icon icon={'solar:upload-linear'} />
                      )
                    }
                    onClick={() => {
                      onDeployClick();
                      setDeployBtnDisabled(true);

                      timer.current = window.setTimeout(() => {
                        setDeployBtnDisabled(false);
                      }, 10000);
                    }}
                    disabled={deployBtnDisabled || !numSelected || !buttonsEnabledMap.deploy}
                    sx={{ color: theme.palette.secondary.dark }}
                  >
                    Deploy
                  </Button>
                </div>
              </Tooltip>
              <Tooltip title={'Uninstall selected applications'}>
                <div>
                  <IconButton
                    onClick={onUninstallClick}
                    disabled={!numSelected || !buttonsEnabledMap.uninstall}
                    size="medium"
                    sx={{ color: theme.palette.secondary.dark }}
                  >
                    <Icon icon={ICONS.BUCKET} />
                  </IconButton>
                </div>
              </Tooltip>
            </Stack>
          );
        },
        colSpan: 4,
      },
      {
        id: 'deployUpdateUninstall',
        label: '',
        render: () => null,
      },
      {
        id: 'valuesOverride',
        label: '',
        render: () => {
          const leftOffset = 36 + 8; // icon button + grid padding

          return (
            <Box sx={{ ml: theme.typography.pxToRem(leftOffset) }}>
              <Switch color={'primary'} onChange={onValuesOverrideAllClick} />
            </Box>
          );
        },
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
      ...(stage?.spec.clusterName === DEFAULT_CLUSTER
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
      stage?.spec.clusterName,
      theme.typography,
      theme.palette.secondary.dark,
      numSelected,
      deployBtnDisabled,
      isDeployLoading,
      buttonsEnabledMap,
      onUninstallClick,
      onDeployClick,
      onLatestClick,
      onStableClick,
      selected,
      onValuesOverrideAllClick,
      reset,
    ]
  );
};
