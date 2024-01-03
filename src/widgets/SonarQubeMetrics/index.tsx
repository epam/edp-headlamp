import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { PercentageCircle } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Chip, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { NoDataWidgetWrapper } from '../../components/NoDataWidgetWrapper';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { routeEDPSonarIntegration } from '../../pages/edp-configuration/pages/edp-sonar-integration/route';
import { LinkCreationService } from '../../services/link-creation';
import { rem } from '../../utils/styling/rem';
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

const useStyles = makeStyles(() => ({
    labelChip: {
        height: rem(20),
        lineHeight: 1,
        paddingTop: rem(2),
        backgroundColor: '#5b5b5b',
        color: '#fff',
    },
    labelChipGreen: {
        backgroundColor: '#1DB954',
    },
    labelChipRed: {
        backgroundColor: '#ff2222',
    },
}));

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

const statusMap = {
    OK: 'Passed',
    ERROR: 'Failed',
};

const getStatusLabel = (status: string) => statusMap?.[status] || 'Unknown';

const getIconVulnerability = (value: string) =>
    value === '0' ? (
        <Icon icon={'material-symbols:lock-outline'} />
    ) : (
        <Icon icon={'material-symbols:lock-open-outline'} />
    );

const getIconCodeSmells = (value: string) =>
    value === '0' ? (
        <Icon icon={'material-symbols:sentiment-satisfied-outline'} />
    ) : (
        <Icon icon={'material-symbols:sentiment-dissatisfied-outline'} />
    );

export const SonarQubeMetrics = ({
    codebaseBranchMetadataName,
    namespace,
}: SonarQubeMetricsProps) => {
    const classes = useStyles();
    const projectID = codebaseBranchMetadataName;

    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);
    const sonarQubeBaseURL = EDPComponentsURLS?.sonar;

    const { data: metrics, isLoading } = useSonarQubeMetrics(
        sonarQubeBaseURL,
        codebaseBranchMetadataName
    );
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
                        <Link
                            onClick={() => history.push(sonarConfigurationPage)}
                            component={'button'}
                        >
                            <Typography>Set up SonarQube configuration</Typography>
                        </Link>{' '}
                        and enable reporting in your pipeline.
                    </Typography>
                </>
            }
        >
            <LoadingWrapper isLoading={isLoading}>
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems={'center'}>
                            <Grid item>
                                <Typography variant={'h6'}>Code Quality</Typography>
                            </Grid>
                            <Grid item>
                                <Chip
                                    label={getStatusLabel(metrics?.alert_status)}
                                    className={clsx([
                                        classes.labelChip,
                                        {
                                            [classes.labelChipGreen]:
                                                metrics?.alert_status === 'OK',
                                            [classes.labelChipRed]:
                                                metrics?.alert_status === 'ERROR',
                                        },
                                    ])}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
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
                            titleIcon={getIconVulnerability(metrics?.vulnerabilities)}
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
                            titleIcon={getIconCodeSmells(metrics?.code_smells)}
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
