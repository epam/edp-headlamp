import { CI_TOOLS } from '../../../constants/ciTools';
import {
    BUILD_TOOL_ICON_MAPPING,
    FRAMEWORK_ICON_MAPPING,
    LANGUAGE_ICON_MAPPING,
} from '../../icon-mappings';
import {
    CODEBASE_COMMON_BUILD_TOOLS,
    CODEBASE_COMMON_FRAMEWORKS,
    CODEBASE_COMMON_LANGUAGES,
} from '../index';
import { CodebaseInterface, CodebaseMappingKey } from '../types';

export type SystemLanguageKeys = typeof CODEBASE_COMMON_LANGUAGES.HELM;

type SystemMappingKey = Extract<CodebaseMappingKey, SystemLanguageKeys>;

export type SystemMapping = {
    [K in SystemMappingKey]: CodebaseInterface;
};

export const SYSTEM_MAPPING: SystemMapping = {
    [CODEBASE_COMMON_LANGUAGES.HELM]: {
        language: {
            name: 'Helm',
            value: CODEBASE_COMMON_LANGUAGES.HELM,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.HELM],
            availableCITools: [CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.GIT_OPS]: {
                name: 'GitOps',
                value: CODEBASE_COMMON_FRAMEWORKS.GIT_OPS,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.GIT_OPS],
                availableCITools: [CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.HELM]: {
                name: 'Helm',
                value: CODEBASE_COMMON_BUILD_TOOLS.HELM,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.HELM],
                availableCITools: [CI_TOOLS.TEKTON],
            },
        },
    },
};
