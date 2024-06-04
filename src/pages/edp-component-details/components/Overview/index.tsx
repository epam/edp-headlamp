import { Chip, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { BorderedSection } from '../../../../components/BorderedSection';
import { InfoColumns } from '../../../../components/InfoColumns';
import { STATUS_COLOR } from '../../../../constants/colors';
import { DependencyTrackMetrics } from '../../../../widgets/DeeptrackVulnerabilities';
import { SonarQubeMetrics } from '../../../../widgets/SonarQubeMetrics';
import { useDataContext } from '../../providers/Data/hooks';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { ComponentDetailsRouteParams } from '../../types';
import { useInfoRows } from './hooks/useInfoRows';

const statusMap = {
  OK: 'Passed',
  ERROR: 'Failed',
};
const getStatusLabel = (status: string) => statusMap?.[status] || 'Unknown';

export const Overview = () => {
  const { name } = useParams<ComponentDetailsRouteParams>();

  const { component } = useDynamicDataContext();
  const { sonarData, depTrackData } = useDataContext();
  const infoRows = useInfoRows(component.data);

  return (
    <Stack spacing={3}>
      <BorderedSection title="Component Details">
        <div>
          <InfoColumns infoRows={infoRows} />
        </div>
      </BorderedSection>
      <BorderedSection
        title={
          <Stack spacing={2} alignItems="center" direction="row">
            <Typography fontSize={20} fontWeight={600} color="primary.dark">
              Code Quality
            </Typography>
            <Chip
              sx={{
                backgroundColor:
                  sonarData.data.metrics?.alert_status === 'OK'
                    ? STATUS_COLOR.SUCCESS
                    : sonarData.data.metrics?.alert_status === 'ERROR'
                    ? STATUS_COLOR.ERROR
                    : STATUS_COLOR.UNKNOWN,
                color: '#fff',
              }}
              size="small"
              label={getStatusLabel(sonarData.data.metrics?.alert_status)}
            />
          </Stack>
        }
      >
        <div>
          <Grid container alignItems={'center'}>
            <Grid item>
              <SonarQubeMetrics
                codebaseName={name}
                sonarData={sonarData}
                defaultBranch={component.data?.spec.defaultBranch}
              />
            </Grid>
            <Grid item style={{ marginLeft: 'auto' }}>
              <DependencyTrackMetrics depTrackData={depTrackData} />
            </Grid>
          </Grid>
        </div>
      </BorderedSection>
    </Stack>
  );
};
