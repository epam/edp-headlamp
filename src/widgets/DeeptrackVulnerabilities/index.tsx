import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Box, CircularProgress, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NoDataWidgetWrapper } from '../../components/NoDataWidgetWrapper';
import { routeDependencyTrack } from '../../pages/configuration/pages/dependency-track/route';
import { LinkCreationService } from '../../services/link-creation';
import { DeeptrackVulnerabilitiesProps } from './types';

const MetricsCell = ({
  color,
  textColor,
  value,
}: {
  color?: string;
  textColor?: string;
  value: number | string | React.ReactNode;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{
        backgroundColor: (t) => color ?? t.palette.secondary.dark,
        px: (t) => t.typography.pxToRem(9),
        py: (t) => t.typography.pxToRem(5),
      }}
    >
      {typeof value === 'string' || typeof value === 'number' ? (
        <Typography
          fontSize={10}
          fontWeight={500}
          color={(t) => textColor ?? t.palette.common.white}
        >
          {value}
        </Typography>
      ) : (
        value
      )}
    </Box>
  );
};

export const DependencyTrackMetrics = ({ depTrackData }: DeeptrackVulnerabilitiesProps) => {
  const history = useHistory();

  const dependencyTrackConfigurationPage = Router.createRouteURL(routeDependencyTrack.path);

  return (
    <NoDataWidgetWrapper
      hasData={!!depTrackData.data.metrics}
      isLoading={depTrackData.isLoading}
      text={
        <Typography variant={'body1'} color="secondary.dark" component={'div'}>
          No metrics available.{' '}
          <Link onClick={() => history.push(dependencyTrackConfigurationPage)} component={'button'}>
            <Typography>Set up DependencyTrack configuration</Typography>
          </Link>{' '}
          and enable reporting in your pipeline.
        </Typography>
      }
    >
      <Link
        href={LinkCreationService.depTrack.createDashboardLink(
          depTrackData.data.baseUrl,
          depTrackData.data.projectID
        )}
        target={'_blank'}
        color="inherit"
        underline="none"
      >
        <Stack direction="row" sx={{ borderRadius: '2px', overflow: 'hidden' }}>
          <MetricsCell value="dependencies" />
          {!!depTrackData.data.metrics && !depTrackData.isLoading ? (
            <>
              <MetricsCell value={depTrackData.data.metrics?.critical} color="#FD4C4D" />
              <MetricsCell value={depTrackData.data.metrics?.high} color="#FF8832" />
              <MetricsCell value={depTrackData.data.metrics?.medium} color="#FFC754" />
              <MetricsCell value={depTrackData.data.metrics?.low} color="#18BE94" />
              <MetricsCell
                value={depTrackData.data.metrics?.unassigned}
                color="#E6E6F0"
                textColor="#596D80"
              />
            </>
          ) : (
            <MetricsCell
              value={
                <Box
                  minWidth={(t) => t.typography.pxToRem(120)}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress
                    sx={{
                      width: (t) => `${t.typography.pxToRem(14)} !important`,
                      height: (t) => `${t.typography.pxToRem(14)} !important`,
                    }}
                  />
                </Box>
              }
              color="#E6E6F0"
              textColor="#596D80"
            />
          )}
        </Stack>
      </Link>
    </NoDataWidgetWrapper>
  );
};
