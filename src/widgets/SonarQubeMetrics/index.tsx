import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { PercentageCircle } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { NoDataWidgetWrapper } from '../../components/NoDataWidgetWrapper';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { routeEDPSonarIntegration } from '../../pages/edp-configuration/pages/edp-sonar-integration/route';
import { LinkCreationService } from '../../services/link-creation';
import { MetricsItem } from './components/MetricsItem';
import { Rating } from './components/Rating';
import { Value } from './components/Value';
import { useSonarQubeMetrics } from './hooks/useSonarQubeMetrics';
import { DuplicationRating, SonarQubeMetricsProps } from './types';

const defaultDuplicationRatings: DuplicationRating[] = [
    { greaterThan: 0, rating: '1.0' },
    { greaterThan: 3, rating: '2.0' },
    { greaterThan: 5, rating: '3.0' },
    { greaterThan: 10, rating: '4.0' },
    { greaterThan: 20, rating: '5.0' },
];

const total = 100;
const size = 55;

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

export const SonarQubeMetrics = ({
    codebaseBranchMetadataName,
    namespace,
}: SonarQubeMetricsProps) => {
    const projectID = codebaseBranchMetadataName;

    const { data: metrics, isLoading } = useSonarQubeMetrics(codebaseBranchMetadataName);
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);
    const sonarQubeBaseURL = EDPComponentsURLS?.sonar;

    const sonarConfigurationPage = Router.createRouteURL(routeEDPSonarIntegration.path);
    const history = useHistory();

    return (
        <NoDataWidgetWrapper
            hasData={!!metrics}
            isLoading={isLoading}
            text={
                <>
                    <Typography variant={'body1'} component={'div'}>
                        No metrics available.
                    </Typography>
                    <Typography variant={'body2'} component={'div'}>
                        Please, ensure that{' '}
                        <Link
                            onClick={() => history.push(sonarConfigurationPage)}
                            component={'button'}
                        >
                            <Typography>SonarQube is configured</Typography>
                        </Link>{' '}
                        and PipelineRun has SonarQube reporting.
                    </Typography>
                </>
            }
        >
            <LoadingWrapper isLoading={isLoading}>
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item>
                        <MetricsItem
                            titleIcon={<Icon icon={'mdi:bug'} />}
                            title="Bugs"
                            link={LinkCreationService.sonar.createLinkByIssueType(
                                sonarQubeBaseURL,
                                'BUG',
                                projectID
                            )}
                            leftSlot={<Value value={metrics?.bugs} />}
                            rightSlot={<Rating rating={metrics?.reliability_rating} />}
                        />
                    </Grid>
                    <Grid item>
                        <MetricsItem
                            titleIcon={
                                metrics?.vulnerabilities === '0' ? (
                                    <Icon icon={'material-symbols:lock-outline'} />
                                ) : (
                                    <Icon icon={'material-symbols:lock-open-outline'} />
                                )
                            }
                            title="Vulnerabilities"
                            link={LinkCreationService.sonar.createLinkByIssueType(
                                sonarQubeBaseURL,
                                'VULNERABILITY',
                                projectID
                            )}
                            leftSlot={<Value value={metrics?.vulnerabilities} />}
                            rightSlot={<Rating rating={metrics?.security_rating} />}
                        />
                    </Grid>
                    <Grid item>
                        <MetricsItem
                            titleIcon={
                                metrics?.code_smells === '0' ? (
                                    <Icon icon={'material-symbols:sentiment-satisfied-outline'} />
                                ) : (
                                    <Icon
                                        icon={'material-symbols:sentiment-dissatisfied-outline'}
                                    />
                                )
                            }
                            title="Code Smells"
                            link={LinkCreationService.sonar.createLinkByIssueType(
                                sonarQubeBaseURL,
                                'CODE_SMELL',
                                projectID
                            )}
                            leftSlot={<Value value={metrics?.code_smells} />}
                            rightSlot={<Rating rating={metrics?.sqale_rating} />}
                        />
                    </Grid>
                    {metrics?.security_review_rating && (
                        <Grid item>
                            <MetricsItem
                                titleIcon={<Icon icon={'material-symbols:security-rounded'} />}
                                title="Hotspots Reviewed"
                                link={null}
                                leftSlot={
                                    <Value
                                        value={
                                            metrics?.security_hotspots_reviewed
                                                ? `${metrics?.security_hotspots_reviewed}%`
                                                : '—'
                                        }
                                    />
                                }
                                rightSlot={<Rating rating={metrics?.security_review_rating} />}
                            />
                        </Grid>
                    )}
                    <Grid item>
                        <MetricsItem
                            link={LinkCreationService.sonar.createLinkByMetricName(
                                sonarQubeBaseURL,
                                'Coverage',
                                projectID
                            )}
                            title="Coverage"
                            leftSlot={
                                <PercentageCircle
                                    data={[
                                        {
                                            name: 'Covered',
                                            value: +metrics?.coverage,
                                            fill: '#1DB954',
                                        },
                                        {
                                            name: 'Not covered',
                                            value: total - +metrics?.coverage,
                                            fill: '#757575',
                                        },
                                    ]}
                                    total={total}
                                    size={size}
                                    thickness={5}
                                />
                            }
                            rightSlot={
                                <Value
                                    value={
                                        metrics?.coverage !== undefined
                                            ? `${metrics?.coverage}%`
                                            : '—'
                                    }
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <MetricsItem
                            title="Duplications"
                            link={LinkCreationService.sonar.createLinkByMetricName(
                                sonarQubeBaseURL,
                                'Duplications',
                                projectID
                            )}
                            leftSlot={<Rating rating={getDuplicationRating(metrics)} hideValue />}
                            rightSlot={<Value value={`${metrics?.duplicated_lines_density}%`} />}
                        />
                    </Grid>
                </Grid>
            </LoadingWrapper>
        </NoDataWidgetWrapper>
    );
};
