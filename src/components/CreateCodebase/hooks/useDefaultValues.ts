import { CI_TOOLS } from '../../../constants/ciTools';
import { CODEBASE_VERSIONING_TYPES } from '../../../constants/codebaseVersioningTypes';
import { GIT_SERVERS } from '../../../constants/gitServers';
import { React } from '../../../plugin.globals';
import { FormNameObject } from '../../../types/forms';

interface UseDefaultValuesProps {
    names: { [key: string]: FormNameObject };
}

export const useDefaultValues = ({ names }: UseDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        return {
            [names.gitServer.name]: GIT_SERVERS.GERRIT,
            [names.defaultBranch.name]: 'main',
            [names.emptyProject.name]: false,
            [names.versioningType.name]: CODEBASE_VERSIONING_TYPES.DEFAULT,
            [names.ciTool.name]: CI_TOOLS.TEKTON,
        };
    }, [names]);

    return { baseDefaultValues };
};
