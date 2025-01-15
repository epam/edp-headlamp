import { Grid, Typography } from '@mui/material';
import React from 'react';
import { PIPELINE_TYPES } from '../../../../../../../../constants/pipelineTypes';
import { FilterContextProvider } from '../../../../../../../../providers/Filter/provider';
import { ResourceActionListContextProvider } from '../../../../../../../../providers/ResourceActionList/provider';
import { getDefaultNamespace } from '../../../../../../../../utils/getDefaultNamespace';
import { rem } from '../../../../../../../../utils/styling/rem';
import { PipelineRunList } from '../../../../../../../../widgets/PipelineRunList';
import {
  matchFunctions,
  pipelineRunFilterControlNames,
} from '../../../../../../../../widgets/PipelineRunList/constants';
import { useTypedPermissions } from '../../../../../../hooks/useTypedPermissions';
import { DetailsProps } from './types';

export const Details = ({ pipelineRuns, error }: DetailsProps) => {
  const permissions = useTypedPermissions();

  return (
    <Grid container spacing={4} style={{ marginTop: rem(20) }}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems={'flex-end'}>
          <Grid item>
            <Typography variant={'h6'}>Pipeline Runs</Typography>
          </Grid>
          <Grid item xs={12}>
            <ResourceActionListContextProvider>
              <FilterContextProvider
                entityID={`PIPELINE_RUN_LIST_BRANCH_DETAILS::${getDefaultNamespace()}`}
                matchFunctions={matchFunctions}
                saveToLocalStorage
              >
                <PipelineRunList
                  pipelineRuns={pipelineRuns.all}
                  isLoading={pipelineRuns.all === null && !error}
                  permissions={permissions}
                  pipelineRunTypes={[
                    PIPELINE_TYPES.ALL,
                    PIPELINE_TYPES.REVIEW,
                    PIPELINE_TYPES.BUILD,
                  ]}
                  filterControls={[
                    pipelineRunFilterControlNames.PIPELINE_TYPE,
                    pipelineRunFilterControlNames.STATUS,
                  ]}
                />
              </FilterContextProvider>
            </ResourceActionListContextProvider>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
