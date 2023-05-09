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
import { CodebaseInterface } from '../types';

export const INFRASTRUCTURE_MAPPING: { [key: string]: CodebaseInterface } = {
    [CODEBASE_COMMON_LANGUAGES.TERRAFORM]: {
        language: {
            name: 'Terraform',
            value: CODEBASE_COMMON_LANGUAGES.TERRAFORM,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.TERRAFORM],
            availableCITools: [CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.INFRASPACE]: {
                name: 'Infraspace',
                value: CODEBASE_COMMON_FRAMEWORKS.INFRASPACE,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.INFRASPACE],
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
