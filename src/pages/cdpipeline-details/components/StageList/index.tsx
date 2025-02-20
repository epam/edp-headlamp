import { Icon } from '@iconify/react';
import { Grid, useTheme } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { HorizontalScrollContainer } from '../../../../components/HorizontalScrollContainer';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { useQuickLinksQuery } from '../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksQuery';
import { useQuickLinksURLsQuery } from '../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksURLQuery';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { useViewModeContext } from '../../../../providers/ViewMode/hooks';
import { ManageStageDialog } from '../../../../widgets/dialogs/ManageStage';
import { usePageFilterContext } from '../../hooks/usePageFilterContext';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { EnvironmentStage } from './components/EnvironmentStage';

export const StageList = () => {
  const theme = useTheme();
  const { CDPipeline, stages, stagesWithApplicationsData } = useDynamicDataContext();
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery();
  const { data: QuickLinks, isLoading: isQuickLinksLoading } = useQuickLinksQuery({
    props: {
      namespace: CDPipeline.data?.metadata.namespace,
    },
  });
  const isLoading = React.useMemo(() => {
    return (
      CDPipeline.isLoading ||
      stages.isLoading ||
      stagesWithApplicationsData.isLoading ||
      isQuickLinksLoading
    );
  }, [
    CDPipeline.isLoading,
    isQuickLinksLoading,
    stages.isLoading,
    stagesWithApplicationsData.isLoading,
  ]);

  const { filterFunction } = usePageFilterContext();

  const filteredStages = React.useMemo(() => {
    if (stagesWithApplicationsData.isLoading && !!filterFunction) return [];

    return stagesWithApplicationsData.data.filter(filterFunction);
  }, [stagesWithApplicationsData, filterFunction]);

  const { setDialog } = useDialogContext();

  const { viewMode } = useViewModeContext();

  const renderPageContent = React.useCallback(() => {
    if (!isLoading && filteredStages?.length === 0) {
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
            setDialog(
              ManageStageDialog,
              isLoading
                ? { CDPipelineData: null, otherStages: [] }
                : { CDPipelineData: CDPipeline.data, otherStages: stages.data }
            );
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
                  <EnvironmentStage
                    CDPipeline={CDPipeline.data}
                    stageWithApplicationsData={stageWithApplicationsData}
                    QuickLinksURLS={QuickLinksURLS}
                    QuickLinks={QuickLinks?.items}
                    viewMode={viewMode}
                  />
                </Grid>
              );
            })}
          </Grid>
        </HorizontalScrollContainer>
      </LoadingWrapper>
    );
  }, [
    CDPipeline.data,
    QuickLinks?.items,
    QuickLinksURLS,
    filteredStages,
    isLoading,
    setDialog,
    stages.data,
    theme.typography,
    viewMode,
  ]);

  return renderPageContent();
};
