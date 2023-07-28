import React from 'react';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../constants/codebaseVersioningTypes';
import { useDefaultCIToolQuery } from '../../../../../k8s/EDPComponent/hooks/useDefaultCIToolQuery';
import { useGitServerListQuery } from '../../../../../k8s/EDPGitServer/hooks/useGitServerListQuery';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../types';

export const useDefaultValues = (): Partial<CreateCodebaseFormValues> => {
    const { data: defaultCITool } = useDefaultCIToolQuery();

    const { data: gitServers } = useGitServerListQuery({});
    const gitServersOptions = React.useMemo(
        () => gitServers?.items.map(({ metadata: { name } }) => ({ label: name, value: name })),
        [gitServers?.items]
    );

    return React.useMemo(
        () => ({
            [CODEBASE_FORM_NAMES.defaultBranch.name]: 'main',
            [CODEBASE_FORM_NAMES.emptyProject.name]: false,
            [CODEBASE_FORM_NAMES.versioningType.name]: CODEBASE_VERSIONING_TYPES.DEFAULT,
            [CODEBASE_FORM_NAMES.ciTool.name]: defaultCITool,
            [CODEBASE_FORM_NAMES.gitServer.name]: gitServersOptions?.[0].value,
        }),
        [defaultCITool, gitServersOptions]
    );
};
