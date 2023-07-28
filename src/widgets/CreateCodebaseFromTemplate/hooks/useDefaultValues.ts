import React from 'react';
import { CODEBASE_VERSIONING_TYPES } from '../../../constants/codebaseVersioningTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../constants/creationStrategies';
import { GIT_SERVERS } from '../../../constants/gitServers';
import { useDialogContext } from '../../../providers/Dialog/hooks';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from '../constants';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../names';
import { CreateCodebaseFromTemplateDialogForwardedProps } from '../types';

const defaultEDPVersioningValue = '0.1.0-SNAPSHOT';
const defaultBranchName = 'main';
const [defaultEDPVersioningVersion, defaultEDPVersioningVersionPostfix] =
    defaultEDPVersioningValue.split('-');

export const useDefaultValues = () => {
    const { dialogProviderState } =
        useDialogContext<CreateCodebaseFromTemplateDialogForwardedProps>();
    const template =
        dialogProviderState?.[CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME]?.forwardedProps?.template;

    return React.useMemo(() => {
        return {
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.lang.name]: template?.spec.language,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.framework.name]: template?.spec.framework,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.buildTool.name]: template?.spec.buildTool,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.type.name]: template?.spec.type,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.repositoryUrl.name]: template?.spec.source,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.strategy.name]: CODEBASE_CREATION_STRATEGIES.CLONE,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.defaultBranch.name]: defaultBranchName,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningType.name]: CODEBASE_VERSIONING_TYPES.EDP,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.emptyProject.name]: false,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitServer.name]: GIT_SERVERS.GERRIT,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFrom.name]: defaultEDPVersioningValue,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromVersion.name]:
                defaultEDPVersioningVersion,
            [CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromPostfix.name]:
                defaultEDPVersioningVersionPostfix,
        };
    }, [template]);
};
