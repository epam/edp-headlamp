import { Icon } from '@iconify/react';
import { Autocomplete } from '@mui/lab';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../../components/ButtonWithPermission';
import { APPLICATION_HEALTH_STATUS } from '../../../../k8s/Application/constants';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectConfig } from '../../../../k8s/EDPCDPipelineStage/config';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { FieldEvent, FORM_MODES } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../widgets/CreateEditStage/constants';
import { CreateEditStageDialogForwardedProps } from '../../../../widgets/CreateEditStage/types';
import { FILTER_CONTROLS } from '../../constants';
import { usePageFilterContext } from '../../hooks/usePageFilterContext';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { PageFilterExtraControls } from '../../types';

export const StageListFilter = () => {
  const theme = useTheme();
  const { CDPipeline, stages, stagesWithApplicationsData } = useDynamicDataContext();

  const isLoading = React.useMemo(
    () => CDPipeline.isLoading || stages.isLoading,
    [CDPipeline.isLoading, stages.isLoading]
  );

  const { setDialog } = useDialogContext<CreateEditStageDialogForwardedProps>();

  const forwardedProps: CreateEditStageDialogForwardedProps = React.useMemo(() => {
    if (isLoading) {
      return {
        CDPipelineData: null,
        otherStages: [],
        mode: FORM_MODES.CREATE,
      };
    }
    return {
      CDPipelineData: CDPipeline.data,
      otherStages: stages.data,
      mode: FORM_MODES.CREATE,
    };
  }, [CDPipeline, isLoading, stages]);

  const { filter, setFilterItem } = usePageFilterContext();

  const stageSelectOptions = React.useMemo(() => {
    if (stages.isLoading) return [];

    return stages.data.map((stage) => stage.spec.name);
  }, [stages]);

  const applicationsOptions = React.useMemo(() => {
    if (stagesWithApplicationsData.isLoading) {
      return [];
    }
    return stagesWithApplicationsData.data?.[0].applications.map(
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

  return (
    <Grid container spacing={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
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
        <ButtonWithPermission
          ButtonProps={{
            startIcon: <Icon icon={'heroicons:view-columns-solid'} />,
            color: 'primary',
            variant: 'contained',
            onClick: () => {
              setDialog({
                modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
                forwardedProps,
              });
            },
          }}
          actionCheckName={'create'}
          item={
            new EDPCDPipelineStageKubeObject({
              kind: EDPCDPipelineStageKubeObjectConfig.kind,
              apiVersion: `${EDPCDPipelineStageKubeObjectConfig.group}/${EDPCDPipelineStageKubeObjectConfig.version}`,
              // @ts-ignore
              metadata: {
                namespace: getDefaultNamespace(),
              },
            })
          }
        >
          create stage
        </ButtonWithPermission>
      </Grid>
    </Grid>
  );
};
