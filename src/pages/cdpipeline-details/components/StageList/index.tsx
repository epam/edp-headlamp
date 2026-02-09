import { Icon } from '@iconify/react';
import { Grid, useTheme } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { HorizontalScrollContainer } from '../../../../components/HorizontalScrollContainer';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { ManageStageDialog } from '../../../../widgets/dialogs/ManageStage';
import { usePageFilterContext } from '../../hooks/usePageFilterContext';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { EnvironmentStage } from './components/EnvironmentStage';

export const StageList = () => {
  const theme = useTheme();
  const { CDPipeline, stages, stagesWithApplicationsData } = useDynamicDataContext();

  const { filterFunction } = usePageFilterContext();

  const filteredStages = React.useMemo(() => {
    if (stagesWithApplicationsData.isLoading || !stagesWithApplicationsData.data) {
      return [];
    }

    return stagesWithApplicationsData.data.filter(filterFunction);
  }, [stagesWithApplicationsData, filterFunction]);

  const { setDialog } = useDialogContext();

  const renderPageContent = React.useCallback(() => {
    const isLoading =
      CDPipeline.isLoading || stages.isLoading || stagesWithApplicationsData.isLoading;

    if (filteredStages?.length === 0 && !isLoading) {
      return (
        <EmptyList
          missingItemName="Environments"
          icon={
            <Icon
              icon="majesticons:table-plus-line"
              color="#A2A7B7"
              width={theme.typography.pxToRem(128)}
            />
          }
          linkText={'by adding a new one here.'}
          beforeLinkText="Take the first step towards managing your Environment"
          handleClick={() => {
            setDialog(ManageStageDialog, {
              CDPipelineData: CDPipeline.data!,
              otherStages: stages.data!,
            });
          }}
        />
      );
    }

    return (
      <LoadingWrapper isLoading={isLoading}>
        <HorizontalScrollContainer>
          <Grid container spacing={6} wrap="nowrap" sx={{ pb: theme.typography.pxToRem(50) }}>
            {filteredStages.map((stageWithApplicationsData) => {
              return (
                <Grid item xs={6} flexShrink="0" key={stageWithApplicationsData.stage.spec.name}>
                  <EnvironmentStage stageWithApplicationsData={stageWithApplicationsData} />
                </Grid>
              );
            })}
          </Grid>
        </HorizontalScrollContainer>
      </LoadingWrapper>
    );
  }, [
    CDPipeline.data,
    CDPipeline.isLoading,
    filteredStages,
    setDialog,
    stages.data,
    stages.isLoading,
    stagesWithApplicationsData.isLoading,
    theme.typography,
  ]);

  return renderPageContent();
};
