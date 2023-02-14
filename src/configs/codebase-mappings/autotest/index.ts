import { CI_TOOLS } from '../../../constants/ciTools';
import { APPLICATION_MAPPING } from '../application';
import { CodebaseInterface } from '../types';

export enum AUTOTEST_LANGUAGES {
    JAVA = 'java',
    OTHER = 'other',
}

export const AUTOTEST_MAPPING: { [key: string]: CodebaseInterface } = {
    [AUTOTEST_LANGUAGES['JAVA']]: {
        language: {
            name: 'Java',
            value: AUTOTEST_LANGUAGES['JAVA'],
            icon: 'java',
            availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
        },
        frameworks: {
            java8: {
                name: 'Java 8',
                value: 'java8',
                icon: 'java',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            java11: {
                name: 'Java 11',
                value: 'java11',
                icon: 'java',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
        buildTools: {
            gradle: {
                name: 'Gradle',
                value: 'gradle',
                icon: 'gradle',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
            maven: {
                name: 'Maven',
                value: 'maven',
                icon: 'maven',
                availableCITools: [CI_TOOLS['JENKINS'], CI_TOOLS['TEKTON']],
            },
        },
    },
    [AUTOTEST_LANGUAGES['OTHER']]: {
        language: {
            name: 'Other',
            value: AUTOTEST_LANGUAGES['OTHER'],
            icon: 'otherapps',
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
    const mapping = AUTOTEST_MAPPING[AUTOTEST_LANGUAGES['JAVA']];

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
        case APPLICATION_MAPPING[AUTOTEST_LANGUAGES['JAVA']].language.value:
            return mapJavaBasedAgent(framework, buildTool);
    }

    return undefined;
};
