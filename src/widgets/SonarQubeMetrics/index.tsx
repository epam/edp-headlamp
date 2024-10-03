import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { NoDataWidgetWrapper } from '../../components/NoDataWidgetWrapper';
import { routeSonar } from '../../pages/configuration/pages/sonar/route';
import { LinkCreationService } from '../../services/link-creation';
import { MetricsItem } from './components/MetricsItem';
import { Rating } from './components/Rating';
import { Value } from './components/Value';
import { DuplicationRating, SonarQubeMetricsProps } from './types';

const defaultDuplicationRatings: DuplicationRating[] = [
  { greaterThan: 0, rating: '1.0' },
  { greaterThan: 3, rating: '2.0' },
  { greaterThan: 5, rating: '3.0' },
  { greaterThan: 10, rating: '4.0' },
  { greaterThan: 20, rating: '5.0' },
];

const IconProps = {
  width: 14,
  height: 14,
  color: '#002446',
};

const getDuplicationRating = (metrics: any) => {
  if (!metrics) {
    return '';
  }

  if (!metrics.duplicated_lines_density) {
    return '';
  }

  let rating = '';

  for (const r of defaultDuplicationRatings) {
    if (+metrics.duplicated_lines_density >= r.greaterThan) {
      rating = r.rating;
    }
  }

  return rating;
};

const getCoverageRating = (metrics: any) => {
  if (!metrics) {
    return '';
  }

  if (!metrics?.coverage) {
    return '';
  }

  const number = +metrics.coverage;

  if (number >= 80) {
    return '1.0';
  }

  if (number >= 50) {
    return '3.0';
  }

  return '5.0';
};

const getIconVulnerability = (value: string) =>
  value === '0' ? (
    <Icon icon={'mdi:lock'} {...IconProps} />
  ) : (
    <Icon icon={'mdi:lock-open'} {...IconProps} />
  );

const getIconCodeSmells = (value: string) =>
  value === '0' ? (
    <Icon icon={'material-symbols:sentiment-satisfied'} {...IconProps} />
  ) : (
    <Icon icon={'material-symbols:sentiment-dissatisfied'} {...IconProps} />
  );

export const SonarQubeMetrics = ({ codebaseName, sonarData }: SonarQubeMetricsProps) => {
  const projectID = codebaseName;

  const sonarConfigurationPage = Router.createRouteURL(routeSonar.path);
  const history = useHistory();

  return (
    <NoDataWidgetWrapper
      hasData={!!sonarData.data.metrics}
      isLoading={sonarData.isLoading}
      text={
        <Typography variant={'body1'} color="secondary.dark" component={'div'}>
          No metrics available.{' '}
          <Link onClick={() => history.push(sonarConfigurationPage)} component={'button'}>
            <Typography>Set up SonarQube configuration</Typography>
          </Link>{' '}
          and enable reporting in your pipeline.
        </Typography>
      }
    >
      <LoadingWrapper isLoading={sonarData.isLoading}>
        <Stack spacing={3} alignItems={'center'} direction="row">
          <MetricsItem
            titleIcon={<Icon icon={'mdi:bug'} {...IconProps} />}
            title="Bugs"
            link={LinkCreationService.sonar.createLinkByIssueType({
              baseURL: sonarData.data.baseUrl,
              codebaseName: projectID,
              issueType: 'BUG',
            })}
            rightSlot={<Value value={sonarData.data.metrics?.bugs} />}
            leftSlot={<Rating rating={sonarData.data.metrics?.reliability_rating} />}
          />
          <MetricsItem
            titleIcon={getIconVulnerability(sonarData.data.metrics?.vulnerabilities)}
            title="Vulnerabilities"
            link={LinkCreationService.sonar.createLinkByIssueType({
              baseURL: sonarData.data.baseUrl,
              codebaseName: projectID,
              issueType: 'VULNERABILITY',
            })}
            rightSlot={<Value value={sonarData.data.metrics?.vulnerabilities} />}
            leftSlot={<Rating rating={sonarData.data.metrics?.security_rating} />}
          />
          <MetricsItem
            titleIcon={getIconCodeSmells(sonarData.data.metrics?.code_smells)}
            title="Code Smells"
            link={LinkCreationService.sonar.createLinkByIssueType({
              baseURL: sonarData.data.baseUrl,
              codebaseName: projectID,
              issueType: 'CODE_SMELL',
            })}
            rightSlot={<Value value={sonarData.data.metrics?.code_smells} />}
            leftSlot={<Rating rating={sonarData.data.metrics?.sqale_rating} />}
          />
          {sonarData.data.metrics?.security_review_rating && (
            <MetricsItem
              titleIcon={<Icon icon={'material-symbols:security-rounded'} />}
              title="Hotspots Reviewed"
              link={null}
              rightSlot={
                <Value
                  value={
                    sonarData.data.metrics?.security_hotspots_reviewed
                      ? `${sonarData.data.metrics?.security_hotspots_reviewed}%`
                      : '—'
                  }
                />
              }
              leftSlot={<Rating rating={sonarData.data.metrics?.security_review_rating} />}
            />
          )}
          <MetricsItem
            titleIcon={<Icon icon="zondicons:network" {...IconProps} />}
            link={LinkCreationService.sonar.createLinkByMetricName({
              baseURL: sonarData.data.baseUrl,
              codebaseName: projectID,
              metricName: 'Coverage',
            })}
            title="Coverage"
            leftSlot={<Rating rating={getCoverageRating(sonarData.data.metrics)} hideValue />}
            rightSlot={
              <Value
                value={
                  sonarData.data.metrics?.coverage !== undefined
                    ? `${sonarData.data.metrics?.coverage}%`
                    : '—'
                }
              />
            }
          />
          <MetricsItem
            titleIcon={<Icon icon="bxs:copy" {...IconProps} />}
            title="Duplications"
            link={LinkCreationService.sonar.createLinkByMetricName({
              baseURL: sonarData.data.baseUrl,
              codebaseName: projectID,
              metricName: 'Duplications',
            })}
            leftSlot={<Rating rating={getDuplicationRating(sonarData.data.metrics)} hideValue />}
            rightSlot={<Value value={`${sonarData.data.metrics?.duplicated_lines_density}%`} />}
          />
        </Stack>
      </LoadingWrapper>
    </NoDataWidgetWrapper>
  );
};
