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
    const hasCIDepTrackURL = !!ciDependencyTrackURL;
    const classes = useStyles();
    const [error, setError] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dependencyTrackConfigurationPage = Router.createRouteURL(
        routeEDPDependencyTrackIntegration.path
    );
    const history = useHistory();

    return (
        <NoDataWidgetWrapper
            hasData={!error && !isLoading && hasCIDepTrackURL}
            isLoading={isLoading}
            text={
                <>
                    <Typography variant={'body1'} component={'div'}>
                        No metrics available.
                    </Typography>
                    <Typography variant={'body2'} component={'div'}>
                        <Link
                            onClick={() => history.push(dependencyTrackConfigurationPage)}
                            component={'button'}
                        >
                            <Typography>Set up DependencyTrack configuration</Typography>
                        </Link>{' '}
                        and enable reporting in your pipeline.
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
                                    onLoadStart={() => setIsLoading(true)}
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
