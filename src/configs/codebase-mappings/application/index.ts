import { CodebaseInterface } from '../types';

const LANGUAGE_JAVA = 'Java';
const LANGUAGE_JAVASCRIPT = 'JavaScript';
const LANGUAGE_DOTNET = 'DotNet';
const LANGUAGE_PYTHON = 'Python';
const LANGUAGE_GO = 'Go';
const LANGUAGE_OTHER = 'other';

export const APPLICATION_MAPPING: CodebaseInterface = {
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
            gradle: {
                name: 'Gradle',
                value: 'gradle',
            },
            maven: {
                name: 'Maven',
                value: 'maven',
            },
        },
    },
    [LANGUAGE_JAVASCRIPT]: {
        language: {
            name: 'JavaScript',
            value: 'JavaScript',
            icon: 'javascript-logo.png',
        },
        frameworks: {
            react: {
                name: 'React',
                value: 'React',
                icon: 'react-logo.png',
            },
        },
        buildTools: {
            npm: { name: 'NPM', value: 'npm' },
        },
    },
    [LANGUAGE_DOTNET]: {
        language: {
            name: 'DotNet',
            value: 'DotNet',
            icon: 'dotnet-logo.png',
        },
        frameworks: {
            'dotnet-2.1': { name: 'Dotnet 2.1', value: 'dotnet-2.1', icon: 'dotnet-core-logo.png' },
            'dotnet-3.1': { name: 'Dotnet 3.1', value: 'dotnet-3.1', icon: 'dotnet-core-logo.png' },
        },
        buildTools: {
            dotnet: { name: 'dotnet', value: 'dotnet' },
        },
    },
    [LANGUAGE_PYTHON]: {
        language: {
            name: 'Python',
            value: 'Python',
            icon: 'python-logo.png',
        },
        frameworks: {
            'python-3.8': { name: 'Python 3.8', value: 'python-3.8', icon: 'python-logo.png' },
        },
        buildTools: {
            python: { name: 'Python', value: 'python' },
        },
    },
    [LANGUAGE_GO]: {
        language: {
            name: 'Go',
            value: 'Go',
            icon: 'go-logo.png',
        },
        frameworks: {
            beego: { name: 'Beego', value: 'beego', icon: 'beego-logo.png' },
            'operator-sdk': {
                name: 'Operator SDK',
                value: 'operator-sdk',
                icon: 'operator-sdk-logo.png',
            },
        },
        buildTools: {
            go: { name: 'Go', value: 'go' },
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
    },
};

export const getApplicationRecommendedJenkinsAgent = (
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

    if (lang === APPLICATION_MAPPING[LANGUAGE_JAVASCRIPT].language.value) {
        return 'npm';
    }

    if (
        lang === APPLICATION_MAPPING[LANGUAGE_DOTNET].language.value &&
        framework === APPLICATION_MAPPING[LANGUAGE_DOTNET].frameworks['dotnet-2.1'].value
    ) {
        return 'dotnet-dotnet-2.1';
    }

    if (
        lang === APPLICATION_MAPPING[LANGUAGE_DOTNET].language.value &&
        framework === APPLICATION_MAPPING[LANGUAGE_DOTNET].frameworks['dotnet-3.1'].value
    ) {
        return 'dotnet-dotnet-3.1';
    }

    if (lang === APPLICATION_MAPPING[LANGUAGE_PYTHON].language.value) {
        return 'python-3.8';
    }

    if (lang === APPLICATION_MAPPING[LANGUAGE_GO].language.value) {
        return 'go';
    }

    return undefined;
};
