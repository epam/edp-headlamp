import { Icon } from '@iconify/react';
import { PercentageCircle } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Grid } from '@material-ui/core';
import React from 'react';
import { GENERATE_URL_SERVICE } from '../../services/url';
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

export const SonarQubeMetrics = ({
    metrics,
    projectID,
    sonarQubeBaseURL,
}: SonarQubeMetricsProps) => {
    const duplicationRating = React.useMemo(() => {
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
    }, [metrics]);

    return (
        <Grid container spacing={2} alignItems={'center'}>
            <Grid item>
                <MetricsItem
                    titleIcon={<Icon icon={'mdi:bug'} />}
                    title="Bugs"
                    link={GENERATE_URL_SERVICE.createSonarQubeLinkByIssueType(
                        sonarQubeBaseURL,
                        'BUG',
                        projectID
                    )}
                    leftSlot={<Value value={metrics.bugs} />}
                    rightSlot={<Rating rating={metrics.reliability_rating} />}
                />
            </Grid>
            <Grid item>
                <MetricsItem
                    titleIcon={
                        metrics.vulnerabilities === '0' ? (
                            <Icon icon={'material-symbols:lock-outline'} />
                        ) : (
                            <Icon icon={'material-symbols:lock-open-outline'} />
                        )
                    }
                    title="Vulnerabilities"
                    link={GENERATE_URL_SERVICE.createSonarQubeLinkByIssueType(
                        sonarQubeBaseURL,
                        'VULNERABILITY',
                        projectID
                    )}
                    leftSlot={<Value value={metrics.vulnerabilities} />}
                    rightSlot={<Rating rating={metrics.security_rating} />}
                />
            </Grid>
            <Grid item>
                <MetricsItem
                    titleIcon={
                        metrics.code_smells === '0' ? (
                            <Icon icon={'material-symbols:sentiment-satisfied-outline'} />
                        ) : (
                            <Icon icon={'material-symbols:sentiment-dissatisfied-outline'} />
                        )
                    }
                    title="Code Smells"
                    link={GENERATE_URL_SERVICE.createSonarQubeLinkByIssueType(
                        sonarQubeBaseURL,
                        'CODE_SMELL',
                        projectID
                    )}
                    leftSlot={<Value value={metrics.code_smells} />}
                    rightSlot={<Rating rating={metrics.sqale_rating} />}
                />
            </Grid>
            {metrics.security_review_rating && (
                <Grid item>
                    <MetricsItem
                        titleIcon={<Icon icon={'material-symbols:security-rounded'} />}
                        title="Hotspots Reviewed"
                        link={null}
                        leftSlot={
                            <Value
                                value={
                                    metrics.security_hotspots_reviewed
                                        ? `${metrics.security_hotspots_reviewed}%`
                                        : '—'
                                }
                            />
                        }
                        rightSlot={<Rating rating={metrics.security_review_rating} />}
                    />
                </Grid>
            )}
            <Grid item>
                <MetricsItem
                    link={GENERATE_URL_SERVICE.createSonarQubeLinkByMetricName(
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
                                    value: +metrics.coverage,
                                    fill: '#1DB954',
                                },
                                {
                                    name: 'Not covered',
                                    value: 100 - +metrics.coverage,
                                    fill: '#757575',
                                },
                            ]}
                            total={100}
                            size={60}
                            thickness={5}
                        />
                    }
                    rightSlot={
                        <Value
                            value={metrics.coverage !== undefined ? `${metrics.coverage}%` : '—'}
                        />
                    }
                />
            </Grid>
            <Grid item>
                <MetricsItem
                    title="Duplications"
                    link={GENERATE_URL_SERVICE.createSonarQubeLinkByMetricName(
                        sonarQubeBaseURL,
                        'Duplications',
                        projectID
                    )}
                    leftSlot={<Rating rating={duplicationRating} hideValue />}
                    rightSlot={<Value value={`${metrics.duplicated_lines_density}%`} />}
                />
            </Grid>
        </Grid>
    );
};
