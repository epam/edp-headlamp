import { CI_TOOLS } from '../../../constants/ciTools';
import { RESOURCES_ICON_MAPPING } from '../../icon-mappings';
import { APPLICATION_MAPPING } from '../application';
import { CODEBASE_COMMON_LANGUAGES } from '../index';
import { CodebaseInterface } from '../types';

export const AUTOTEST_MAPPING: { [key: string]: CodebaseInterface } = {
    [CODEBASE_COMMON_LANGUAGES['JAVA']]: {
        language: {
            name: 'Java',
            value: CODEBASE_COMMON_LANGUAGES['JAVA'],
            icon: RESOURCES_ICON_MAPPING['java'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            java8: {
                name: 'Java 8',
                value: 'java8',
                icon: RESOURCES_ICON_MAPPING['java'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            java11: {
                name: 'Java 11',
                value: 'java11',
                icon: RESOURCES_ICON_MAPPING['java'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            java17: {
                name: 'Java 17',
                value: 'java17',
                icon: RESOURCES_ICON_MAPPING['java'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            gradle: {
                name: 'Gradle',
                value: 'gradle',
                icon: RESOURCES_ICON_MAPPING['gradle'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            maven: {
                name: 'Maven',
                value: 'maven',
                icon: RESOURCES_ICON_MAPPING['maven'],
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [CODEBASE_COMMON_LANGUAGES['OTHER']]: {
        language: {
            name: 'Other',
            value: CODEBASE_COMMON_LANGUAGES['OTHER'],
            icon: RESOURCES_ICON_MAPPING['other'],
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {},
        buildTools: {},
        autoTestReportFrameworks: {
            allure: {
                name: 'allure',
                value: 'allure',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
};

const mapJavaBasedAgent = (framework: string, buildTool: string): string | undefined => {
    let result = '';
    const mapping = AUTOTEST_MAPPING[CODEBASE_COMMON_LANGUAGES['JAVA']];

    switch (buildTool) {
        case mapping.buildTools.gradle.value:
            result += 'gradle';
            break;
        case mapping.buildTools.maven.value:
            result += 'maven';
            break;
        default:
            return undefined;
    }

    result += '-';

    switch (framework) {
        case mapping.frameworks.java8.value:
            result += 'java8';
            break;
        case mapping.frameworks.java11.value:
            result += 'java11';
            break;
        case mapping.frameworks.java17.value:
            result += 'java17';
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
        case APPLICATION_MAPPING[CODEBASE_COMMON_LANGUAGES['JAVA']].language.value:
            return mapJavaBasedAgent(framework, buildTool);
    }

    return undefined;
};
