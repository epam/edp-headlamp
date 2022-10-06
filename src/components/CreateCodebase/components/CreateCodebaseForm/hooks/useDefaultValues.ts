import { CI_TOOLS } from '../../../../../constants/ciTools';
import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../constants/codebaseVersioningTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { DEPLOYMENT_SCRIPTS } from '../../../../../constants/deploymentScripts';
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { JOB_PROVISIONERS } from '../../../../../constants/jobProvisioners';
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
                [names.ciTool.name]: CI_TOOLS['JENKINS'],
                [names.emptyProject.name]: false,
                [names.jobProvisioning.name]: JOB_PROVISIONERS['DEFAULT'],
                [names.versioningType.name]: CODEBASE_VERSIONING_TYPES['DEFAULT'],
                [names.deploymentScript.name]: DEPLOYMENT_SCRIPTS['HELM_CHART'],
            };
        }

        if (type === CODEBASE_TYPES['LIBRARY']) {
            return {
                [names.strategy.name]: CODEBASE_CREATION_STRATEGIES['CREATE'],
                [names.gitServer.name]: GIT_SERVERS['GERRIT'],
                [names.ciTool.name]: CI_TOOLS['JENKINS'],
                [names.emptyProject.name]: false,
                [names.jobProvisioning.name]: JOB_PROVISIONERS['DEFAULT'],
                [names.versioningType.name]: CODEBASE_VERSIONING_TYPES['DEFAULT'],
                [names.deploymentScript.name]: DEPLOYMENT_SCRIPTS['HELM_CHART'],
            };
        }

        if (type === CODEBASE_TYPES['AUTOTEST']) {
            return {
                [names.strategy.name]: CODEBASE_CREATION_STRATEGIES['CLONE'],
                [names.gitServer.name]: GIT_SERVERS['GERRIT'],
                [names.ciTool.name]: CI_TOOLS['JENKINS'],
                [names.emptyProject.name]: false,
                [names.jobProvisioning.name]: JOB_PROVISIONERS['DEFAULT'],
                [names.versioningType.name]: CODEBASE_VERSIONING_TYPES['DEFAULT'],
            };
        }
    }, [names, type]);

    return { baseDefaultValues };
};
