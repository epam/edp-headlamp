import { Icon } from '@iconify/react';
import { CircularProgress, Grid, useTheme } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { HorizontalScrollContainer } from '../../../../components/HorizontalScrollContainer';
import { useQuickLinksQuery } from '../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksQuery';
import { useQuickLinksURLsQuery } from '../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksURLQuery';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../widgets/CreateEditStage/constants';
import { CreateEditStageDialogForwardedProps } from '../../../../widgets/CreateEditStage/types';
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
            setDialog({
              modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
              forwardedProps,
            });
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
