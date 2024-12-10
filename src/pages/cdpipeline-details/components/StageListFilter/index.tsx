import { Icon } from '@iconify/react';
import { Autocomplete } from '@mui/lab';
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../../components/ButtonWithPermission';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { APPLICATION_HEALTH_STATUS } from '../../../../k8s/groups/ArgoCD/Application/constants';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { useViewModeContext } from '../../../../providers/ViewMode/hooks';
import { VIEW_MODES } from '../../../../providers/ViewMode/types';
import { FieldEvent } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { ManageStageDialog } from '../../../../widgets/dialogs/ManageStage';
import { FILTER_CONTROLS } from '../../constants';
import { usePageFilterContext } from '../../hooks/usePageFilterContext';
import { useTypedPermissions } from '../../hooks/useTypedPermissions';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { PageFilterExtraControls } from '../../types';

export const StageListFilter = () => {
  const theme = useTheme();
  const { CDPipeline, stages, stagesWithApplicationsData } = useDynamicDataContext();

  const isLoading = React.useMemo(
    () => CDPipeline.isLoading || stages.isLoading,
    [CDPipeline.isLoading, stages.isLoading]
  );

  const { setDialog } = useDialogContext();

  const { filter, setFilterItem } = usePageFilterContext();

  const stageSelectOptions = React.useMemo(() => {
    if (stages.isLoading) return [];

    return stages.data.map((stage) => stage.spec.name);
  }, [stages]);

  const applicationsOptions = React.useMemo(() => {
    if (
      stagesWithApplicationsData.isLoading ||
      !stagesWithApplicationsData.data ||
      !stagesWithApplicationsData.data.length
    ) {
      return [];
    }

    return stagesWithApplicationsData.data?.[0]?.applications.map(
      (app) => app.application.metadata.name
    );
  }, [stagesWithApplicationsData]);

  const handleStagesChange = React.useCallback(
    (event: React.SyntheticEvent<Element, Event>, values: string[]) => {
      setFilterItem(FILTER_CONTROLS.STAGES, values);
    },
    [setFilterItem]
  );

  const handleApplicationChange = React.useCallback(
    (event: React.SyntheticEvent<Element, Event>, values: string[]) => {
      setFilterItem(FILTER_CONTROLS.APPLICATION, values);
    },
    [setFilterItem]
  );

  const handleHealthChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      setFilterItem(FILTER_CONTROLS.HEALTH, value);
    },
    [setFilterItem]
  );

  const healthOptions = Object.values(APPLICATION_HEALTH_STATUS).map((status) => ({
    label: capitalizeFirstLetter(status),
    value: status,
  }));

  const permissions = useTypedPermissions();
  const { viewMode, handleChangeViewMode } = useViewModeContext();

  return (
    <Grid container spacing={2} alignItems={'center'} justifyContent={'flex-end'}>
      <Grid item flexGrow={1}>
        <Filter<PageFilterExtraControls>
          controls={{
            [FILTER_CONTROLS.APPLICATION]: {
              gridXs: 3,
              component: (
                <Autocomplete
                  multiple
                  options={applicationsOptions}
                  getOptionLabel={(option) => option}
                  onChange={handleApplicationChange}
                  value={(filter.values.application as string[]) || []}
                  renderInput={(params) => <TextField {...params} label="Applications" />}
                  ChipProps={{
                    size: 'small',
                    color: 'primary',
                  }}
                />
              ),
            },
            [FILTER_CONTROLS.STAGES]: {
              gridXs: 3,
              component: (
                <Autocomplete
                  multiple
                  options={stageSelectOptions}
                  getOptionLabel={(option) => option}
                  onChange={handleStagesChange}
                  value={(filter.values.stages as string[]) || []}
                  renderInput={(params) => (
                    <TextField {...params} label="Stages" placeholder="Stages" />
                  )}
                  ChipProps={{
                    size: 'small',
                    color: 'primary',
                  }}
                />
              ),
            },
            [FILTER_CONTROLS.HEALTH]: {
              gridXs: 2,
              component: (
                <FormControl fullWidth>
                  <InputLabel>Health</InputLabel>
                  <Select
                    fullWidth
                    value={filter.values.health || ''}
                    displayEmpty
                    onChange={handleHealthChange}
                    sx={{
                      color: filter.values.health
                        ? theme.palette.text.secondary
                        : theme.palette.text.disabled,
                    }}
                  >
                    <MenuItem value="" disabled>
                      Health
                    </MenuItem>
                    {healthOptions.map(({ label, value }, idx) => {
                      const key = `${label}::${idx}`;

                      return (
                        <MenuItem value={value} key={key}>
                          {label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              ),
            },
          }}
        />
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={0} justifyContent={'flex-end'}>
          <Tooltip title={'View Less Details'}>
            <IconButton onClick={() => handleChangeViewMode(VIEW_MODES.COMPACT)} size="large">
              <Icon
                icon={ICONS.VIEW_DETAILS_LESS}
                color={viewMode === VIEW_MODES.COMPACT ? theme.palette.primary.main : 'inherit'}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={'View More Details'}>
            <IconButton onClick={() => handleChangeViewMode(VIEW_MODES.DETAILED)} size="large">
              <Icon
                icon={ICONS.VIEW_DETAILS_MORE}
                color={viewMode === VIEW_MODES.DETAILED ? theme.palette.primary.main : 'inherit'}
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
      <Grid item>
        <ButtonWithPermission
          ButtonProps={{
            startIcon: <Icon icon={'heroicons:view-columns-solid'} />,
            color: 'primary',
            variant: 'contained',
            onClick: () => {
              setDialog(
                ManageStageDialog,
                isLoading
                  ? {
                      CDPipelineData: null,
                      otherStages: [],
                    }
                  : { CDPipelineData: CDPipeline.data, otherStages: stages.data }
              );
            },
          }}
          disabled={!permissions?.create?.Stage.allowed}
          reason={permissions?.create?.Stage.reason}
        >
          create environment
        </ButtonWithPermission>
      </Grid>
    </Grid>
  );
};
