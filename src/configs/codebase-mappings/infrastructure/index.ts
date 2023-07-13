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

export type InfrastructureLanguageKeys = typeof CODEBASE_COMMON_LANGUAGES.HCL;

type InfrastructureMappingKey = Extract<CodebaseMappingKey, InfrastructureLanguageKeys>;

export type InfrastructureMapping = {
    [K in InfrastructureMappingKey]: CodebaseInterface;
};

export const INFRASTRUCTURE_MAPPING: InfrastructureMapping = {
    [CODEBASE_COMMON_LANGUAGES.HCL]: {
        language: {
            name: 'HCL',
            value: CODEBASE_COMMON_LANGUAGES.HCL,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.HCL],
            availableCITools: [CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.AWS]: {
                name: 'AWS',
                value: CODEBASE_COMMON_FRAMEWORKS.AWS,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.AWS],
                availableCITools: [CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.TERRAFORM]: {
                name: 'Terraform',
                value: CODEBASE_COMMON_BUILD_TOOLS.TERRAFORM,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.TERRAFORM],
                availableCITools: [CI_TOOLS.TEKTON],
            },
        },
    },
};
