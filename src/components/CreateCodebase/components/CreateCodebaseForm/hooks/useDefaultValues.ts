import { creationStrategies } from '../../../../../configs/creationStrategies';
import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../../../../../constants/codebaseTypes';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface useDefaultValuesProps {
    names: { [key: string]: FormNameObject };
    type: string;
}

export const useDefaultValues = ({
    names,
    type,
}: useDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        if (type === CODEBASE_TYPE_APPLICATION) {
            return {
                [names.strategy.name]: creationStrategies.create.value,
                [names.gitServer.name]: 'gerrit',
                [names.ciTool.name]: 'jenkins',
                [names.emptyProject.name]: false,
                [names.jobProvisioning.name]: 'default',
                [names.versioningType.name]: 'default',
                [names.deploymentScript.name]: 'helm-chart',
            };
        }

        if (type === CODEBASE_TYPE_LIBRARY) {
            return {
                [names.strategy.name]: creationStrategies.create.value,
                [names.gitServer.name]: 'gerrit',
                [names.ciTool.name]: 'jenkins',
                [names.emptyProject.name]: false,
                [names.jobProvisioning.name]: 'default',
                [names.versioningType.name]: 'default',
                [names.deploymentScript.name]: 'helm-chart',
            };
        }

        if (type === CODEBASE_TYPE_AUTOTEST) {
            return {
                [names.strategy.name]: creationStrategies.clone.value,
                [names.gitServer.name]: 'gerrit',
                [names.ciTool.name]: 'jenkins',
                [names.emptyProject.name]: false,
                [names.jobProvisioning.name]: 'default',
                [names.versioningType.name]: 'default',
            };
        }
    }, [names, type]);

    return { baseDefaultValues };
};
