import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../constants/codebaseVersioningTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { DEPLOYMENT_SCRIPTS } from '../../../../../constants/deploymentScripts';
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface UseDefaultValuesProps {
    names: { [key: string]: FormNameObject };
    type: string;
}

export const useDefaultValues = ({
    names,
    type,
}: UseDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        if (type === CODEBASE_TYPES['APPLICATION']) {
            return {
                [names.strategy.name]: CODEBASE_CREATION_STRATEGIES['CREATE'],
                [names.gitServer.name]: GIT_SERVERS['GERRIT'],
                [names.emptyProject.name]: false,
                [names.versioningType.name]: CODEBASE_VERSIONING_TYPES['DEFAULT'],
                [names.deploymentScript.name]: DEPLOYMENT_SCRIPTS['HELM_CHART'],
            };
        }

        if (type === CODEBASE_TYPES['LIBRARY']) {
            return {
                [names.strategy.name]: CODEBASE_CREATION_STRATEGIES['CREATE'],
                [names.gitServer.name]: GIT_SERVERS['GERRIT'],
                [names.emptyProject.name]: false,
                [names.versioningType.name]: CODEBASE_VERSIONING_TYPES['DEFAULT'],
                [names.deploymentScript.name]: DEPLOYMENT_SCRIPTS['HELM_CHART'],
            };
        }

        if (type === CODEBASE_TYPES['AUTOTEST']) {
            return {
                [names.strategy.name]: CODEBASE_CREATION_STRATEGIES['CLONE'],
                [names.gitServer.name]: GIT_SERVERS['GERRIT'],
                [names.emptyProject.name]: false,
                [names.versioningType.name]: CODEBASE_VERSIONING_TYPES['DEFAULT'],
            };
        }
    }, [names, type]);

    return { baseDefaultValues };
};
