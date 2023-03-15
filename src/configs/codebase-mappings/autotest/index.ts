import { CI_TOOLS } from '../../../constants/ciTools';
import {
    BUILD_TOOL_ICON_MAPPING,
    FRAMEWORK_ICON_MAPPING,
    LANGUAGE_ICON_MAPPING,
} from '../../icon-mappings';
import { APPLICATION_MAPPING } from '../application';
import {
    CODEBASE_COMMON_BUILD_TOOLS,
    CODEBASE_COMMON_FRAMEWORKS,
    CODEBASE_COMMON_LANGUAGES,
} from '../index';
import { CodebaseInterface } from '../types';

export const AUTOTEST_MAPPING: { [key: string]: CodebaseInterface } = {
    [CODEBASE_COMMON_LANGUAGES.JAVA]: {
        language: {
            name: 'Java',
            value: CODEBASE_COMMON_LANGUAGES.JAVA,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVA],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {
            [CODEBASE_COMMON_FRAMEWORKS.JAVA8]: {
                name: 'Java 8',
                value: CODEBASE_COMMON_FRAMEWORKS.JAVA8,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.JAVA8],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
            [CODEBASE_COMMON_FRAMEWORKS.JAVA11]: {
                name: 'Java 11',
                value: CODEBASE_COMMON_FRAMEWORKS.JAVA11,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.JAVA11],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
            [CODEBASE_COMMON_FRAMEWORKS.JAVA17]: {
                name: 'Java 17',
                value: CODEBASE_COMMON_FRAMEWORKS.JAVA17,
                icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.JAVA17],
                availableCITools: [CI_TOOLS.TEKTON],
            },
        },
        buildTools: {
            [CODEBASE_COMMON_BUILD_TOOLS.GRADLE]: {
                name: 'Gradle',
                value: CODEBASE_COMMON_BUILD_TOOLS.GRADLE,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.GRADLE],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
            [CODEBASE_COMMON_BUILD_TOOLS.MAVEN]: {
                name: 'Maven',
                value: CODEBASE_COMMON_BUILD_TOOLS.MAVEN,
                icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.MAVEN],
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES.OTHER]: {
        language: {
            name: 'Other',
            value: CODEBASE_COMMON_LANGUAGES.OTHER,
            icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.OTHER],
            availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
        },
        frameworks: {},
        buildTools: {},
        autoTestReportFrameworks: {
            allure: {
                name: 'allure',
                value: 'allure',
                availableCITools: [CI_TOOLS.JENKINS, CI_TOOLS.TEKTON],
            },
        },
    },
};

const mapJavaBasedAgent = (framework: string, buildTool: string): string | undefined => {
    let result = '';
    const mapping = AUTOTEST_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVA];

    switch (buildTool) {
        case mapping.buildTools[CODEBASE_COMMON_BUILD_TOOLS.GRADLE].value:
            result += CODEBASE_COMMON_BUILD_TOOLS.GRADLE;
            break;
        case mapping.buildTools[CODEBASE_COMMON_BUILD_TOOLS.MAVEN].value:
            result += CODEBASE_COMMON_BUILD_TOOLS.MAVEN;
            break;
        default:
            return undefined;
    }

    result += '-';

    switch (framework) {
        case mapping.frameworks[CODEBASE_COMMON_FRAMEWORKS.JAVA8].value:
            result += CODEBASE_COMMON_FRAMEWORKS.JAVA8;
            break;
        case mapping.frameworks[CODEBASE_COMMON_FRAMEWORKS.JAVA11].value:
            result += CODEBASE_COMMON_FRAMEWORKS.JAVA11;
            break;
        case mapping.frameworks[CODEBASE_COMMON_FRAMEWORKS.JAVA17].value:
            result += CODEBASE_COMMON_FRAMEWORKS.JAVA17;
            break;
        default:
            return undefined;
    }

    return result;
};

export const getAutotestRecommendedJenkinsAgent = (
    lang: string,
    framework?: string,
    buildTool?: string
): string | undefined => {
    switch (lang) {
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVA].language.value:
            return mapJavaBasedAgent(framework, buildTool);
    }

    return undefined;
};
