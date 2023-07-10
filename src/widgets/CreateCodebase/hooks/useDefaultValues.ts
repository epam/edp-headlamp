import React from 'react';
import { CODEBASE_VERSIONING_TYPES } from '../../../constants/codebaseVersioningTypes';
import { GIT_SERVERS } from '../../../constants/gitServers';
import { useDefaultCIToolQuery } from '../../../k8s/EDPComponent/hooks/useDefaultCIToolQuery';
import { CODEBASE_NAMES } from '../names';

export const useDefaultValues = (): { [key: string]: any } => {
    const { data: defaultCITool } = useDefaultCIToolQuery();

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
