import { Router } from '@kinvolk/headlamp-plugin/lib';
import { CircularProgress, Link, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NoDataWidgetWrapper } from '../../components/NoDataWidgetWrapper';
import { routeEDPDependencyTrackIntegration } from '../../pages/edp-configuration/pages/edp-dependency-track-integration/route';
import { NoDataSvg } from './components/NoDataSvg';
import { useStyles } from './styles';
import { DeeptrackVulnerabilitiesProps } from './types';

export const DependencyTrackMetrics = ({
    ciDependencyTrackURL,
    codebaseName,
    codebaseBranchName,
}: DeeptrackVulnerabilitiesProps) => {
    const classes = useStyles();
    const [error, setError] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const dependencyTrackConfigurationPage = Router.createRouteURL(
        routeEDPDependencyTrackIntegration.path
    );
    const history = useHistory();

    return (
        <NoDataWidgetWrapper
            hasData={!error && !isLoading}
            isLoading={isLoading}
            text={
                <>
                    <Typography variant={'body1'} component={'div'}>
                        No metrics available.
                    </Typography>
                    <Typography variant={'body2'} component={'div'}>
                        Please, ensure that{' '}
                        <Link
                            onClick={() => history.push(dependencyTrackConfigurationPage)}
                            component={'button'}
                        >
                            <Typography>DependencyTrack is configured</Typography>
                        </Link>{' '}
                        and PipelineRun has DependencyTrack reporting.
                    </Typography>
                </>
            }
        >
            {isLoading && <CircularProgress />}
            <div className={classes.wrapper}>
                {error ? (
                    <NoDataSvg className={classes.img} />
                ) : (
                    <>
                        {!!ciDependencyTrackURL && (
                            <Link href={ciDependencyTrackURL} target={'_blank'}>
                                <img
                                    src={`${ciDependencyTrackURL}/api/v1/badge/vulns/project/${window.encodeURIComponent(
                                        codebaseName
                                    )}/${window.encodeURIComponent(codebaseBranchName)}`}
                                    alt=""
                                    className={classes.img}
                                    onError={() => {
                                        setError(true);
                                        setIsLoading(false);
                                    }}
                                    onLoad={() => setIsLoading(false)}
                                />
                            </Link>
                        )}
                    </>
                )}
            </div>
        </NoDataWidgetWrapper>
    );
};
