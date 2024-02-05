import { Icon } from '@iconify/react';
import { Autocomplete } from '@mui/lab';
import { Button, Grid, TextField, Tooltip } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { APPLICATION_HEALTH_STATUS } from '../../../../k8s/Application/constants';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { FormControlLabelWithTooltip } from '../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FormSelect } from '../../../../providers/Form/components/FormSelect';
import { FieldEvent, FORM_MODES } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../widgets/CreateEditStage/constants';
import { CreateEditStageDialogForwardedProps } from '../../../../widgets/CreateEditStage/types';
import { FILTER_CONTROLS } from '../../constants';
import { usePageFilterContext } from '../../hooks/usePageFilterContext';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { PageFilterExtraControls } from '../../types';

export const StageListFilter = () => {
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

  const { setFilterItem } = usePageFilterContext();

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

  const {
    register,
    control,
    formState: { errors },
  } = useForm();

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

  return (
    <Grid container spacing={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
      <Grid item flexGrow={1}>
        <Filter<PageFilterExtraControls>
          controls={{
            [FILTER_CONTROLS.APPLICATION]: {
              gridXs: 3,
              component: (
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <FormControlLabelWithTooltip label={'Application'} />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={applicationsOptions}
                      freeSolo
                      getOptionLabel={(option) => option}
                      onChange={handleApplicationChange}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select applications" />
                      )}
                    />
                  </Grid>
                </Grid>
              ),
            },
            [FILTER_CONTROLS.STAGES]: {
              gridXs: 3,
              component: (
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <FormControlLabelWithTooltip label={'Stages'} />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={stageSelectOptions}
                      freeSolo
                      getOptionLabel={(option) => option}
                      onChange={handleStagesChange}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select stages" />
                      )}
                    />
                  </Grid>
                </Grid>
              ),
            },
            [FILTER_CONTROLS.HEALTH]: {
              gridXs: 2,
              component: (
                <FormSelect
                  {...register('health', {
                    onChange: handleHealthChange,
                  })}
                  control={control}
                  errors={errors}
                  name={'health'}
                  label={'Health'}
                  placeholder="Select health"
                  options={[
                    { label: 'All', value: 'All' },
                    ...Object.values(APPLICATION_HEALTH_STATUS).map((status) => ({
                      label: capitalizeFirstLetter(status),
                      value: status,
                    })),
                  ]}
                />
              ),
            },
          }}
        />
      </Grid>
      <Grid item>
        <Tooltip title={'Create stage'}>
          <Button
            startIcon={<Icon icon={ICONS.PLUS} />}
            color={'primary'}
            variant={'contained'}
            onClick={() => {
              setDialog({
                modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
                forwardedProps,
              });
            }}
          >
            create
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
