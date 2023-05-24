import { CI_TOOLS } from '../../../constants/ciTools';
import { CODEBASE_VERSIONING_TYPES } from '../../../constants/codebaseVersioningTypes';
import { GIT_SERVERS } from '../../../constants/gitServers';
import { useAvailableCIToolsQuery } from '../../../k8s/EDPComponent/hooks/useAvailableCIToolsQuery';
import { React } from '../../../plugin.globals';
import { CODEBASE_NAMES } from '../names';

export const useDefaultValues = (): { [key: string]: any } => {
    const { data: availableCITools } = useAvailableCIToolsQuery();

    const defaultCITool = React.useMemo(() => {
        if (!availableCITools || !availableCITools.length) {
            return undefined;
        }

        if (availableCITools.includes(CI_TOOLS.TEKTON)) {
            return CI_TOOLS.TEKTON;
        }

        if (availableCITools.includes(CI_TOOLS.JENKINS)) {
            return CI_TOOLS.JENKINS;
        }
    }, [availableCITools]);

    const baseDefaultValues = React.useMemo(() => {
        return {
            [CODEBASE_NAMES.gitServer.name]: GIT_SERVERS.GERRIT,
            [CODEBASE_NAMES.defaultBranch.name]: 'main',
            [CODEBASE_NAMES.emptyProject.name]: false,
            [CODEBASE_NAMES.versioningType.name]: CODEBASE_VERSIONING_TYPES.DEFAULT,
            [CODEBASE_NAMES.ciTool.name]: defaultCITool,
        };
    }, [defaultCITool]);

    return { baseDefaultValues };
};
