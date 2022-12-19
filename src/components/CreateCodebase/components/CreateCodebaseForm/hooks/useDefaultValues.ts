import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../constants/codebaseVersioningTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { DEPLOYMENT_SCRIPTS } from '../../../../../constants/deploymentScripts';
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { EDPGitServerKubeObjectInterface } from '../../../../../k8s/EDPGitServer/types';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface UseDefaultValuesProps {
    names: { [key: string]: FormNameObject };
    type: string;
    gitServers: EDPGitServerKubeObjectInterface[];
}

export const useDefaultValues = ({
    names,
    type,
    gitServers,
}: UseDefaultValuesProps): { [key: string]: any } => {
    const hasGerritGitServer = React.useMemo(() => {
        if (!gitServers) {
            return true;
        }

        return !!gitServers.find(el => el.spec.gitProvider === GIT_SERVERS['GERRIT']);
    }, [gitServers]);

    const baseDefaultValues = React.useMemo(() => {
        if (type === CODEBASE_TYPES['APPLICATION']) {
            return {
                [names.strategy.name]: hasGerritGitServer
                    ? CODEBASE_CREATION_STRATEGIES['CREATE']
                    : CODEBASE_CREATION_STRATEGIES['IMPORT'],
                [names.gitServer.name]: GIT_SERVERS['GERRIT'],
                [names.emptyProject.name]: false,
                [names.versioningType.name]: CODEBASE_VERSIONING_TYPES['DEFAULT'],
                [names.deploymentScript.name]: DEPLOYMENT_SCRIPTS['HELM_CHART'],
            };
        }

        if (type === CODEBASE_TYPES['LIBRARY']) {
            return {
                [names.strategy.name]: hasGerritGitServer
                    ? CODEBASE_CREATION_STRATEGIES['CREATE']
                    : CODEBASE_CREATION_STRATEGIES['IMPORT'],
                [names.gitServer.name]: GIT_SERVERS['GERRIT'],
                [names.emptyProject.name]: false,
                [names.versioningType.name]: CODEBASE_VERSIONING_TYPES['DEFAULT'],
                [names.deploymentScript.name]: DEPLOYMENT_SCRIPTS['HELM_CHART'],
            };
        }

        if (type === CODEBASE_TYPES['AUTOTEST']) {
            return {
                [names.strategy.name]: hasGerritGitServer
                    ? CODEBASE_CREATION_STRATEGIES['CLONE']
                    : CODEBASE_CREATION_STRATEGIES['IMPORT'],
                [names.gitServer.name]: GIT_SERVERS['GERRIT'],
                [names.emptyProject.name]: false,
                [names.versioningType.name]: CODEBASE_VERSIONING_TYPES['DEFAULT'],
            };
        }
    }, [hasGerritGitServer, names, type]);

    return { baseDefaultValues };
};
