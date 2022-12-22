import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../constants/codebaseVersioningTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface UseDefaultValuesProps {
    names: { [key: string]: FormNameObject };
    hasGerritGitServer: boolean;
}

export const useDefaultValues = ({
    names,
    hasGerritGitServer,
}: UseDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        return {
            [names.type.name]: CODEBASE_TYPES['APPLICATION'],
            [names.strategy.name]: hasGerritGitServer
                ? CODEBASE_CREATION_STRATEGIES['CREATE']
                : CODEBASE_CREATION_STRATEGIES['IMPORT'],
            [names.gitServer.name]: GIT_SERVERS['GERRIT'],
            [names.emptyProject.name]: false,
            [names.versioningType.name]: CODEBASE_VERSIONING_TYPES['DEFAULT'],
        };
    }, [hasGerritGitServer, names]);

    return { baseDefaultValues };
};
