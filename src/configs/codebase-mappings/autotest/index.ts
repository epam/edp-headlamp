import { APPLICATION_MAPPING } from '../application';
import { CodebaseInterface } from '../types';

const LANGUAGE_JAVA = 'Java';
const LANGUAGE_OTHER = 'other';

export const AUTOTEST_MAPPING: { [key: string]: CodebaseInterface } = {
    [LANGUAGE_JAVA]: {
        language: {
            name: 'Java',
            value: 'Java',
            icon: 'java',
        },
        frameworks: {
            java8: { name: 'Java 8', value: 'java8', icon: 'java' },
            java11: { name: 'Java 11', value: 'java11', icon: 'java' },
        },
        buildTools: {
            gradle: { name: 'Gradle', value: 'gradle' },
            maven: { name: 'Maven', value: 'maven' },
        },
    },
    [LANGUAGE_OTHER]: {
        language: {
            name: 'Other',
            value: 'other',
            icon: 'otherapps',
        },
        frameworks: {},
        buildTools: {},
        autoTestReportFrameworks: {
            allure: { name: 'allure', value: 'allure' },
        },
    },
};

const mapJavaBasedAgent = (framework: string, buildTool: string): string | undefined => {
    let result = '';
    const mapping = AUTOTEST_MAPPING[LANGUAGE_JAVA];

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
        case APPLICATION_MAPPING[LANGUAGE_JAVA].language.value:
            return mapJavaBasedAgent(framework, buildTool);
    }

    return undefined;
};
