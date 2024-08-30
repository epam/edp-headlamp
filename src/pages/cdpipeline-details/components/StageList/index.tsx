import { Icon } from '@iconify/react';
import { CircularProgress, Grid, useTheme } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { HorizontalScrollContainer } from '../../../../components/HorizontalScrollContainer';
import { useQuickLinksQuery } from '../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksQuery';
import { useQuickLinksURLsQuery } from '../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksURLQuery';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
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

  return (
    <HorizontalScrollContainer>
      {isLoading ? (
        <CircularProgress />
      ) : filteredStages.length === 0 ? (
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
      ) : (
        <Grid container spacing={6} wrap="nowrap" sx={{ pb: theme.typography.pxToRem(50) }}>
          {filteredStages.map((stageWithApplicationsData) => {
            return (
              <Grid
                item
                xs={12}
                lg={6}
                xl={4}
                flexShrink="0"
                key={stageWithApplicationsData.stage.spec.name}
              >
                <EnvironmentStage
                  CDPipeline={CDPipeline.data}
                  stageWithApplicationsData={stageWithApplicationsData}
                  QuickLinksURLS={QuickLinksURLS}
                  QuickLinks={QuickLinks.items}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </HorizontalScrollContainer>
  );
};
