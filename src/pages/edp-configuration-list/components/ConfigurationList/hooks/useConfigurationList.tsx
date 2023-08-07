import React from 'react';
import { URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVER_ADD } from '../../../../../constants/urls';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { routeEDPClusterList } from '../../../../edp-cluster-list/route';
import { routeEDPGitServerList } from '../../../../edp-gitserver-list/route';
import { routeEDPNexusIntegration } from '../../../../edp-nexus-integration/route';
import { routeEDPRegistryList } from '../../../../edp-registry-list/route';
import { routeEDPSonarIntegration } from '../../../../edp-sonar-integration/route';
import { ConfigurationItem } from '../../../types';

export const useConfigurationList = () =>
    React.useMemo((): ConfigurationItem[] => {
        return [
            {
                icon: ICONS.REPOSITORY,
                label: 'Git Servers',
                description: 'Integrate platform with Version Control Systems.',
                routePath: routeEDPGitServerList.path,
                docLink: URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVER_ADD,
            },
            {
                icon: ICONS.CLUSTERS,
                label: 'Clusters',
                description: 'Scale workloads across multiple Kubernetes clusters.',
                routePath: routeEDPClusterList.path,
            },
            {
                icon: ICONS.REGISTRY,
                label: 'Registry',
                description: 'Establish platform integration with the Container Registry.',
                routePath: routeEDPRegistryList.path,
            },
            {
                icon: ICONS.SONAR,
                label: 'SonarQube Integration',
                description: 'Enable automated code review mechanisms powered by SonarQube.',
                routePath: routeEDPSonarIntegration.path,
            },
            {
                icon: ICONS.REPOSITORY,
                label: 'Nexus Integration',
                description: 'Store and manage your application artifacts in Nexus.',
                routePath: routeEDPNexusIntegration.path,
            },
        ];
    }, []);
