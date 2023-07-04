import React from 'react';
import { ICONS } from '../../../../../constants/icons';
import { routeEDPClusterList } from '../../../../edp-cluster-list/route';
import { routeEDPGitServerList } from '../../../../edp-gitserver-list/route';
import { ConfigurationItem } from '../../../types';

export const useConfigurationList = () =>
    React.useMemo((): ConfigurationItem[] => {
        return [
            {
                icon: ICONS.REPOSITORY,
                label: 'Git Servers',
                description: 'Integrate platform with Version Control Systems',
                routePath: routeEDPGitServerList.path,
            },
            {
                icon: ICONS.CLUSTERS,
                label: 'Clusters',
                description: 'Scale workloads across multiple Kubernetes clusters.',
                routePath: routeEDPClusterList.path,
            },
        ];
    }, []);
