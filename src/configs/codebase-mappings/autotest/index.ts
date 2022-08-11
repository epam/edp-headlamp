import { CodebaseInterface } from '../types';

const LANGUAGE_JAVA = 'Java';
const LANGUAGE_OTHER = 'other';

export const AUTOTEST_MAPPING: CodebaseInterface = {
    [LANGUAGE_JAVA]: {
        language: {
            name: 'Java',
            value: 'Java',
            icon: 'java-logo.png',
        },
        frameworks: {
            java8: { name: 'Java 8', value: 'java8', icon: 'java-logo.png' },
            java11: { name: 'Java 11', value: 'java11', icon: 'java-logo.png' },
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
            icon: 'other-logo.png',
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
