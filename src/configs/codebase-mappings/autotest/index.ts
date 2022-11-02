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
        buildTools: {
            maven: { name: 'Maven', value: 'maven' },
        },
        autoTestReportFrameworks: {
            allure: { name: 'allure', value: 'allure' },
        },
    },
};

export const getAutotestRecommendedJenkinsAgent = (
    lang: string,
    framework: string,
    buildTool: string
): string | undefined => {
    if (
        lang === APPLICATION_MAPPING[LANGUAGE_JAVA].language.value &&
        framework === APPLICATION_MAPPING[LANGUAGE_JAVA].frameworks.java8.value &&
        buildTool === APPLICATION_MAPPING[LANGUAGE_JAVA].buildTools.gradle.value
    ) {
        return 'gradle-java8';
    }

    if (
        (lang === APPLICATION_MAPPING[LANGUAGE_JAVA].language.value &&
            framework === APPLICATION_MAPPING[LANGUAGE_JAVA].frameworks.java8.value &&
            buildTool === APPLICATION_MAPPING[LANGUAGE_JAVA].buildTools.maven.value) ||
        lang === APPLICATION_MAPPING[LANGUAGE_OTHER].language.value
    ) {
        return 'maven-java8';
    }

    if (
        lang === APPLICATION_MAPPING[LANGUAGE_JAVA].language.value &&
        framework === APPLICATION_MAPPING[LANGUAGE_JAVA].frameworks.java11.value &&
        buildTool === APPLICATION_MAPPING[LANGUAGE_JAVA].buildTools.gradle.value
    ) {
        return 'gradle-java11';
    }

    if (
        lang === APPLICATION_MAPPING[LANGUAGE_JAVA].language.value &&
        framework === APPLICATION_MAPPING[LANGUAGE_JAVA].frameworks.java11.value &&
        buildTool === APPLICATION_MAPPING[LANGUAGE_JAVA].buildTools.maven.value
    ) {
        return 'maven-java11';
    }

    return undefined;
};
